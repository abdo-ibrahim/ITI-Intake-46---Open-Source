<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TodoController extends Controller
{
    private $todos = [
        [
            "id" => 1,
            "project_id" => 1,
            "board_column" => "To Do",
            "order" => 1,
            "title" => "Buy groceries",
            "description" => "Purchase weekly groceries: milk, eggs, bread, fruits",
            "completed" => false,
            "due_date" => "2026-05-05",
            "priority" => "medium",
            "tags" => ["shopping", "home"],
            "status" => "open",
            "creator" => "Mona Ali",
            "assigned_to" => "Mona Ali",
            "labels" => ["errand"],
            "color" => "#FF9800",
            "created_at" => "2026-04-01T09:00:00Z",
            "updated_at" => "2026-04-15T12:30:00Z",
        ],
        [
            "id" => 2,
            "project_id" => 2,
            "board_column" => "In Progress",
            "order" => 2,
            "title" => "Fix Authentication Bug",
            "description" => "Resolve the issue where users cannot reset their password via email link.",
            "completed" => false,
            "due_date" => "2026-05-10",
            "priority" => "high",
            "tags" => ["backend", "security"],
            "status" => "in_progress",
            "creator" => "Ahmed Salama",
            "assigned_to" => "Ahmed Salama",
            "labels" => ["bug", "critical"],
            "color" => "#F44336",
            "created_at" => "2026-05-01T10:00:00Z",
            "updated_at" => "2026-05-03T14:20:00Z",
        ],
        [
            "id" => 3,
            "project_id" => 1,
            "board_column" => "Completed",
            "order" => 3,
            "title" => "Design System UI Kit",
            "description" => "Create a consistent set of components for the main dashboard.",
            "completed" => true,
            "due_date" => "2026-04-20",
            "priority" => "low",
            "tags" => ["design", "frontend"],
            "status" => "closed",
            "creator" => "Sara Hassan",
            "assigned_to" => "Sara Hassan",
            "labels" => ["creative"],
            "color" => "#4CAF50",
            "created_at" => "2026-04-10T08:00:00Z",
            "updated_at" => "2026-04-20T17:00:00Z",
        ],
        [
            "id" => 4,
            "project_id" => 3,
            "board_column" => "To Do",
            "order" => 1,
            "title" => "Prepare Quarterly Report",
            "description" => "Gather sales data and financial metrics for the Q2 presentation.",
            "completed" => false,
            "due_date" => "2026-06-01",
            "priority" => "high",
            "tags" => ["business", "finance"],
            "status" => "open",
            "creator" => "Mona Ali",
            "assigned_to" => "John Doe",
            "labels" => ["report"],
            "color" => "#2196F3",
            "created_at" => "2026-05-05T09:00:00Z",
            "updated_at" => "2026-05-05T09:00:00Z",
        ],
        [
            "id" => 5,
            "project_id" => 2,
            "board_column" => "Review",
            "order" => 4,
            "title" => "Update API Documentation",
            "description" => "Document the new endpoints for the mobile app team using Swagger.",
            "completed" => false,
            "due_date" => "2026-05-15",
            "priority" => "medium",
            "tags" => ["docs", "api"],
            "status" => "review",
            "creator" => "Ahmed Salama",
            "assigned_to" => "Mona Ali",
            "labels" => ["documentation"],
            "color" => "#9C27B0",
            "created_at" => "2026-05-01T11:00:00Z",
            "updated_at" => "2026-05-04T13:45:00Z",
        ],
    ];

    public function index()
    {
        return view('todos.index', ['todos' => $this->todos]);
    }

    public function show($id)
    {
        foreach ($this->todos as $todo) {
            if ($todo['id'] == $id) {
                return view('todos.show', ['todo' => $todo]);
            }
        }
        return "Todo not found";
    }
    public function create()
    {
        return view('todos.create');
    }
    public function store(Request $request)
    {
        $newTodo = [
            "id" => count($this->todos) + 1,
            "project_id" => $request['project_id'] ?? 1,
            "board_column" => $request['board_column'] ?? 'To Do',
            "order" => count($this->todos) + 1,
            "title" => $request['title'],
            "description" => $request['description'],
            "completed" => false,
            "due_date" => $request['due_date'],
            "priority" => $request['priority'],
            "tags" => $request['tags'] ?? [],
            "status" => 'open',
            "creator" => $request['creator'] ?? 'Guest',
            "assigned_to" => $request['assigned_to'] ?? 'Unassigned',
            "labels" => $request['labels'] ? (is_array($request['labels']) ? $request['labels'] : explode(',', $request['labels'])) : [],
            "color" => $request['color'] ?? '#6366f1',
            "created_at" => now(),
            "updated_at" => now(),
        ];

        $this->todos[] = $newTodo;
        return redirect()->route('todos.index');
    }

    public function edit($id)
    {
        foreach ($this->todos as $todo) {
            if ($todo['id'] == $id) {
                return view('todos.edit', ['todo' => $todo]);
            }
        }
        return "Todo not found";
    }

    public function update(Request $request, $id)
    {
        foreach ($this->todos as &$todo) {
            if ($todo['id'] == $id) {
                $todo['title'] = $request['title'];
                $todo['description'] = $request['description'];
                $todo['completed'] = $request->has('completed');
                $todo['due_date'] = $request['due_date'];
                $todo['priority'] = $request['priority'];
                $todo['tags'] = $request['tags'] ?? [];
                $todo['assigned_to'] = $request['assigned_to'] ?? $todo['assigned_to'];
                $todo['labels'] = $request['labels'] ? (is_array($request['labels']) ? $request['labels'] : explode(',', $request['labels'])) : ($todo['labels'] ?? []);
                $todo['color'] = $request['color'] ?? $todo['color'];
                $todo['updated_at'] = now();
                break;
            }
        }
        return redirect()->route('todos.index');
    }
    public function destroy($id)
    {
        return redirect()->route('todos.index');
    }
}
