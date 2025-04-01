<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;

class Deal extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    protected $appends = ['image', 'average_rating'];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'tags' => 'array',
            'metadata' => 'array',
        ];
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->img_path ? (config('app.env') == 'local' ? url('storage/' . $this->img_path) : Storage::url($this->img_path)) : $this->img_url,
        );
    }

    protected function averageRating(): Attribute
    {
        return Attribute::make(
            get: fn() => number_format($this->reviews()->avg('rating'), 2),
        );
    }

    public function accounts(): BelongsToMany
    {
        return $this->belongsToMany(UserAccount::class)->withPivot('status', 'price', 'profit', 'frozen')->withTimestamps();
    }

    public function likers(): BelongsToMany
    {
        return $this->belongsToMany(UserAccount::class, 'favorite_deals')->withTimestamps();
    }

    public function reviews(): BelongsToMany
    {
        return $this->belongsToMany(Review::class)->withTimestamps();
    }

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->when($filters['category'] ?? null, function ($query, $category) {
            $query->where('category', $category);
        })->when($filters['sort'] ?? null, function ($query, $sort) {
            $query->orderBy($sort['field'], $sort['order']);
        });
    }

    public function getUsers(): array
    {
        return $this->accounts()->whereHas('user')->get()->map(function ($item) {
            return $item->user->call_name;
        })->toArray();
    }

    public function getPrice($amount = null): float
    {
        try {
            if ($this->price !== null && $this->price > 0) {
                return $this->price;
            }

            $prices = explode('-', $this->price_range);

            if (count($prices) === 1) {
                return (float) $prices[0];
            }

            $min = (float) trim($prices[0]);
            $max = (float) trim($prices[1]);

            if ($min > $max) {
                return $min;
                // throw new \InvalidArgumentException('Invalid price range: minimum is greater than maximum.');
            }

            // Génère un nombre aléatoire flottant entre $min et $max
            return $min + mt_rand() / mt_getrandmax() * ($max - $min);
        } catch (\Throwable $th) {
            return rand(100, 1000) / 100;
        }
    }
}
