<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Helpers\ConfigHelper;
use App\Trait\ValidationRules;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Request as FacadesRequest;

class DealsController extends BaseController
{
    use ValidationRules;

    /**
     * Get cached categories or fetch from database
     */
    protected function getCategories()
    {
        return Cache::remember('deal_categories', now()->addMinutes(30), function () {
            return ConfigHelper::getDealCategories();
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(page_dir() . 'Deals', [
            'filters' => FacadesRequest::all('search', 'category', 'sort'),
            'categories' => $this->getCategories(),
            'can' => [
                'create_deal' => auth()->user()->isSuperAdmin(),
                'edit_deal' => auth()->user()->isSuperAdmin(),
                'delete_deal' => auth()->user()->isSuperAdmin(),
            ],
            'deals' => Deal::filter(FacadesRequest::only('search', 'category', 'sort'))
                ->orderBy('popularity', 'desc')
                ->latest()
                ->paginate($this->perPage(30))
                ->withQueryString()
                ->through(fn($item) => [
                    ...Arr::except($item->toArray(), ['images', 'tags']),
                    'details' => [
                        'popularity' => $item->popularity,
                        'spotify_url' => $item->spotify_url,
                        'metadata' => $item->metadata,
                        'display_price' => $item->display_price,
                        'description' => $item->description,
                    ],
                    'with_users' => !empty($item->getUsers()) ? 'has' : 'hasnot',
                    'users' => $item->getUsers(),
                ]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate($this->dealRules('delete'));

        $query = Deal::doesntHave('accounts')
            ->whereDate('created_at', '>=', $request->start_date)
            ->whereDate('created_at', '<=', $request->end_date);

        $count = $query->count();
        $query->delete();

        return back(303)->with('status', $count . ' deals that were not assigned to any user deleted successfully from ' . $request->start_date . ' to ' . $request->end_date);
    }
}
