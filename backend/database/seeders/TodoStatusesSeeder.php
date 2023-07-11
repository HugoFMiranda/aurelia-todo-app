<?php

namespace Database\Seeders;

use App\Models\TodoStatuses;
use Illuminate\Database\Seeder;

class TodoStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'todo'],
            ['name' => 'doing'],
            ['name' => 'done'],
        ];

        foreach ($statuses as $status) {
            TodoStatuses::create($status);
        }
    }
}
