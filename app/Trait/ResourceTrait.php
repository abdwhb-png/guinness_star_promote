<?php

namespace App\Trait;

trait ResourceTrait
{
    protected $datesFitlers = [
        "dates.created_at",
        "dates.updated_at",
        "dates.created",
        "dates.updated",
    ];


    protected function parseDates($resource): array
    {
        if (!$resource) {
            return [];
        }

        return [
            'created' => $resource->created_at->diffForHumans(),
            'updated' => $resource->updated_at->diffForHumans(),
            'created_at' => $resource->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $resource->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
