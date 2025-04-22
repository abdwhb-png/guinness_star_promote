<?php

namespace App\Http\Resources;

use App\Models\Membership;
use App\Enums\StatusesEnum;
use Illuminate\Support\Arr;
use App\Trait\ResourceTrait;
use Illuminate\Http\Request;
use App\Helpers\ConfigHelper;
use App\Models\CustomerService;
use Illuminate\Http\Resources\Json\JsonResource;

class SiteSettingResource extends JsonResource
{
    use ResourceTrait;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'appEnv' => config('app.env'),
            'appName' => config('app.name'),
            'app' =>  Arr::only(config('app'), ['env', 'name', 'url']),
            'settings' => parent::toArray($request),
            'enableVip' => ConfigHelper::ENABLE_VIP,
            'csLinks' => CustomerService::whereNotNull('url')->get(),
            'memberships' => Membership::all(),
            'translatable' => config('vars.translatable_locales'),

            'statuses' => [
                'all' => ConfigHelper::getStatuses(),
                'transaction' => ConfigHelper::getStatuses('transaction'),
                'deal' => ConfigHelper::getStatuses('deal'),
                'user_deal' => ConfigHelper::getStatuses('user_deal'),
                'notification' => ["readed", "unread"],
            ],

            'salariesImg' => asset('app/assets/images/salaries-chart.png'),

            'dataTypes' => [
                'transaction' => ConfigHelper::getTransactionTypes(),
                'deal' => ConfigHelper::getDealCategories(),
                'profit' => ConfigHelper::getProfitTypes(),
            ],

            'globalFilterFields' => [
                'user' => array_merge([
                    'id',
                    'verbose.username',
                    'detail.email',
                    'detail.invited_by',
                    'detail.phone_number',
                    'detail.gender',
                ], $this->datesFitlers),
                'transaction' => array_merge([
                    'id',
                    "ref_id",
                    "detail.user",
                    "detail.amount",
                    "detail.method",
                ], $this->datesFitlers),
                'deal' => array_merge([
                    'id',
                    "category",
                    "detail.name",
                    "detail.address",
                    "detail.price",
                    'has_users',
                    'users',
                ], $this->datesFitlers),
                'user_deal' => array_merge([
                    'id',
                    "category",
                    "name",
                    "pivot.price",
                    "pivot.profit",
                    "pivot.negative_balance",
                ], $this->datesFitlers),
                'notifications' => array_merge(
                    ['title', 'body'],
                    $this->datesFitlers
                )
            ],

            'pusher' => [
                'notification' => [
                    'event' => 'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
                    'channel' => 'private-App.Models.User'
                ],
                'user_info' => [
                    'event' => 'UserInfoEvent',
                    'channel' => 'private-App.Models.User.Info'
                ],
                'user_account' => [
                    'event' => 'UserAccountEvent',
                    'channel' => 'private-App.Models.User.Account'
                ],
                'transaction' => [
                    'event' => 'TransactionEvent',
                    'channel' => 'private-App.Models.Transaction'
                ],
                'deal' => [
                    'event' => 'DealEvent',
                    'channel' => 'private-App.Models.Deal'
                ],
                'all_transactions' => [
                    'event' => 'TransactionEvent',
                    'channel' => 'private-transactions'
                ],
                'all_orders' => [
                    'event' => 'DealEvent',
                    'channel' => 'private-deals'
                ],
                'all_users' => [
                    'event' => 'UserEvent',
                    'channel' => 'private-users'
                ],
            ],
        ];
    }
}
