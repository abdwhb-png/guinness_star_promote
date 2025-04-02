<?php

namespace App\Jobs;

use App\Models\Deal;
use App\Models\UserAccount;
use App\Helpers\ConfigHelper;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetDealJob implements ShouldQueue
{
    use Queueable;

    protected $tries = 2;
    public $maxDeals;

    /**
     * Create a new job instance.
     */
    public function __construct(public UserAccount $account, ?int $max_deals = null, public ?bool $reset = true)
    {
        $this->maxDeals = $max_deals ? $max_deals : $account->max_deals;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $categories = collect(ConfigHelper::getDealCategories());

            $limit = $categories->count() > 0 ? intval($this->maxDeals / $categories->count()) : 0;

            if ($limit <= 0) {
                throw new \Exception("No deals to assign due to insufficient categories or max_deals.");
            }

            $existingDeals = $this->account->deals()->pluck('deals.id')->toArray();

            DB::transaction(function () use ($categories, $limit, $existingDeals) {
                $categories->each(function ($category) use ($limit, $existingDeals) {
                    Deal::whereNotIn('id', $existingDeals)
                        ->where('category', $category)
                        ->inRandomOrder()
                        ->limit($limit)
                        ->get()
                        ->each(function ($deal) {
                            $this->account->deals()->attach($deal->id, ['price' => $deal->getPrice()]);
                        });
                });

                if ($this->reset) {
                    $this->account->deals()->detach($existingDeals);
                    $this->account->withoutEvents(fn() => $this->account->increment('deal_reset_count'));
                }
            });

            Log::channel('deals')->info($this->account->detailedDeals()->counts['pending'] . "/" . $this->maxDeals . " Deals granted successfully to -> " . $this->account->user->username);
        } catch (\Exception $e) {
            Log::channel('deals')->error("Granting deals  to -> " . $this->account->user->username . " error: " . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
        }
    }
}
