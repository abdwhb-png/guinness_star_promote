<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Models\User;
use Inertia\Inertia;
use App\Models\CoLog;
use App\Enums\RolesEnum;
use App\Models\Membership;
use App\Models\SiteSetting;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;
use App\Trait\ValidationRules;
use App\Models\CustomerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as FacadesRequest;

class AdminController extends BaseController
{
    use ValidationRules;

    public function index()
    {
        $pMethods = payment_methods();
        $setting = site_setting();
        $cServices = CustomerService::where('status', true)->get();
        $memberships = Membership::all();

        $limit = request()->get('limit', 10);
        $page = request()->get('page', 1);
        $search = request()->get('search');
        $getData = request()->get('getData', false);

        $coLogs = CoLog::latest()
            ->when($search, function ($query) use ($search) {
                $query->search($search);
            })
            ->limit($limit * $page)
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), [
                    'username' => $item->user ? $item->user->username : 'unknown',
                    'text' => 'has logged in with ip ' . $item->ip_address,
                    'date' => $item->created_at ? $item->created_at->diffForHumans() : 'unknown_date',
                ]);
            });

        $data = [
            'canEdit' => request()->user()->isSuperAdmin(),
            'setting' => $setting,
            'cServices' => $cServices,
            'pMethods' => $pMethods,
            'memberships' => $memberships,
            'coLogs' => $coLogs,
        ];

        return $getData ? $data : Inertia::render(page_dir() . 'Dashboard', $data);
    }

    public function notifications()
    {
        return Inertia::render(page_dir() . 'Notifications', [
            'filters' => FacadesRequest::all('search', 'status', 'sort'),
            'statuses' => ["read" => true, "unread" => false],
            'notifications' => request()->user()->notifications()
                ->orderBy('read_at', 'desc')
                ->latest()
                ->when(FacadesRequest::get('status') !== null, function ($query, $status) {
                    return $status ? $query->whereNotNull('read_at') : $query->whereNull('read_at');
                })
                ->when(FacadesRequest::get('search'), function ($query, $search) {
                    // Ajoute une condition pour ne rechercher que dans les notifications de l'utilisateur
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where('data->title', 'like', "%$search%")
                            ->orWhere('data->body', 'like', "%$search%");
                    });
                })
                ->when(FacadesRequest::get('sort'), function ($query, $sort) {
                    $query->orderBy('created_at', $sort);
                })
                ->paginate($this->perPage(30))
                ->withQueryString(),
        ]);
    }

    public function pmethodUpdate(PaymentMethod $item, Request $request)
    {
        $validated = $request->validate($this->pMethodRules('update', $item->id));

        $item->update($validated);

        return back(303)->with('status', 'payment method updated');
    }

    public function cServiceUpdate(CustomerService $item, Request $request)
    {
        $validated = $request->validate($this->cServiceRules('update', $item->id));

        $item->update($validated);

        return back(303)->with('status', 'Customer service updated');
    }


    public function settingUpdate(SiteSetting $item, Request $request)
    {
        $validated = $request->validate($this->settingRules('update'));

        $item->update($request->all());

        return back(303)->with('status', 'Setting has been updated');
    }


    public function membershipUpdate(Membership $item, Request $request)
    {
        $validated = $request->validate($this->membershipRules('update'));

        $item->update($validated);

        return back(303)->with('status', 'Membership ' . $item->levelName . ' has been updated');
    }

    public function getDataTotals()
    {
        $user = request()->input('current_user');

        $results = [
            'users' => User::role(RolesEnum::USER->value)->count(),
            'admins' => User::role(RolesEnum::ADMIN->value)->count(),
            'super_admins' => User::role(RolesEnum::SUPERADMIN->value)->count(),
            'user_deals' => User::find($user) ? User::find($user)->account->deals->count() : 0,
            'deals' => Deal::count(),
            'transactions' => Transaction::count(),
            'notifications' => request()->user()->notifications->count(),
            'memberships' => Membership::count(),
            'payment_methods' => PaymentMethod::count(),
            'customer_services' => CustomerService::count(),
        ];

        $allTotal = 0;

        foreach ($results as $key => $value) {
            $allTotal += $value;
        }

        return array_merge($results, ['all_total' => $allTotal]);
    }

    public function deleteData(string $table, int $id): JsonResponse
    {
        try {
            DB::transaction(function () use ($table, $id) {
                DB::table($table)->where('id', $id)->delete();
            });
            return response()->json(['msg' => 'Data with id ' . $id . ' has been deleted from ' . $table]);
        } catch (\Throwable $th) {
            return response()->json(['msg' => $th->getMessage()]);
        }
    }
}
