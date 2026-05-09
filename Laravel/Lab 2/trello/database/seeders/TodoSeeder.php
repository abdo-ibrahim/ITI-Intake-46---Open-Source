<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Todo;
use App\Models\Project;
use App\Models\User;

class TodoSeeder extends Seeder
{
    public function run(): void
    {
        $projects = Project::all();
        $users = User::all();

        Todo::factory()->count(200)->create([
            'project_id' => $projects->random()->id,
            'creator_id' => $users->random()->id,
            'assigned_to_id' => $users->random()->id,
        ]);
    }
}
