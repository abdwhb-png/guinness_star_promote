<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Trait\UserTrait;
use App\Events\RoleAssigned;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles as SpatieHasRoles;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use  UserTrait;
    use SpatieHasRoles {
        assignRole as originalAssignRole;
        givePermissionTo as originalGivePermissionTo;
    }

    protected $fillable = [
        'username',
        'email',
        'phone',
        'name',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['call_name', 'profile_photo_url'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    static function booted()
    {
        static::created(function ($user) {
            $user->account()->create();

            $user->info()->create();
        });
    }

    protected function callName(): Attribute
    {
        return Attribute::get(function (): string {
            return $this->name ?? $this->username ?? $this->phone ?? 'unknown';
        });
    }

    protected function profilePhotoUrl(): Attribute
    {
        return Attribute::get(function (): string {
            return $this->profile_photo_path
                ? url('storage/' . $this->profile_photo_path)
                : $this->defaultProfilePhotoUrl();
        });
    }

    protected function defaultProfilePhotoUrl()
    {
        $name = trim(collect(explode(' ', $this->callName))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=7F9CF5&background=EBF4FF';
    }


    public function assignRole(...$roles)
    {
        $this->originalAssignRole(...$roles);

        foreach ($roles as $role) {
            event(new RoleAssigned($this, $role));
        }

        return $this;
    }

    public function givePermissionTo(...$permissions)
    {
        $this->originalGivePermissionTo(...$permissions);

        // foreach ($permissions as $permission) {
        //     event(new PermissionAssigned($this, $permission));
        // }

        return $this;
    }

    public function account(): HasOne
    {
        return $this->hasOne(UserAccount::class);
    }

    public function info(): HasOne
    {
        return $this->hasOne(UserInfo::class);
    }

    public function scopeSearch(Builder $query, $search)
    {
        $query->where('name', 'like', '%' . $search . '%')
            ->orWhere('username', 'like', '%' . $search . '%')
            ->orWhere('email', 'like', '%' . $search . '%')
            ->orWhere('phone', 'like', '%' . $search . '%');
    }

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->search($search);
        })
            ->when($filters['sort'] ?? null, function ($query, $sort) {
                $query->orderBy($sort['field'], $sort['order']);
            })
            ->when($filters['trashed'] ?? null, function ($query, $trashed) {
                if ($trashed === 'with') {
                    $query->withTrashed();
                } elseif ($trashed === 'only') {
                    $query->onlyTrashed();
                }
            });
    }
}
