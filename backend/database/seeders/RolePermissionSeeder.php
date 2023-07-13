<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                'name' => 'create-todo',
            ],
            [
                'name' => 'read-todo',
            ],
            [
                'name' => 'update-todo',
            ],
            [
                'name' => 'delete-todo',
            ],
            [
                'name' => 'create-user',
            ],
            [
                'name' => 'read-user',
            ],
            [
                'name' => 'update-user',
            ],
            [
                'name' => 'delete-user',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'user']);
        $role->givePermissionTo(['read-todo', 'create-todo', 'update-todo', 'delete-todo']);

        $user = User::find(1);
        $user->assignRole('admin');

        $user = User::find(2);
        $user->assignRole('user');

        $user = User::find(3);
        $user->assignRole('user');
    }
}
