<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Enums\PermissionsEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissionsEnum = PermissionsEnum::cases();
        $rolesEnum = RolesEnum::cases();

        collect($permissionsEnum)->each(function ($permission) {
            Permission::create([
                'name' => $permission->value,
            ]);
        });

        collect($rolesEnum)->each(function ($roleEnum) use ($permissionsEnum) {
            Role::create([
                'name' => $roleEnum->value,
            ]);
        });
    }
}
