<?php

namespace Database\Factories;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'board_column' => fake()->randomElement(['To Do', 'In Progress', 'Completed']),
            'order' => fake()->numberBetween(1, 10),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'completed' => fake()->boolean(),
            'due_date' => fake()->dateTimeBetween('-1 week', '+2 week'),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'urgent']),
            'tags' => ['backend', 'ui'],
            'status' => fake()->randomElement(['to_do', 'in_progress', 'completed']),
            'color' => fake()->hexColor(),
        ];
    }
}
