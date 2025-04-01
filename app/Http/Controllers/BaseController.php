<?php

namespace App\Http\Controllers;

use App\Trait\ResourceTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;

class BaseController extends Controller
{
    use ResourceTrait;

    public function __construct(public Request $request) {}

    protected function paginate($items, $perPage = 20, $page = null, $options = [])
    {
        $options = count($options) ? $options : ['path' => $this->request->fullUrl()];

        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);

        $items = $items instanceof Collection ? $items : Collection::make($items);

        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }


    protected function limit(int $default = 100)
    {
        return $this->request->input('limit', $default);
    }

    protected function perPage(int $default = 15)
    {
        return $this->request->input('per_page', $default);
    }

    protected function currentPage(int $default = 1)
    {
        return $this->request->input('page', $default);
    }
}
