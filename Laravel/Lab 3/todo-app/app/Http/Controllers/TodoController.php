<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;

class TodoController extends Controller
{

    public function index()
    {
        $todos = Todo::with(['creator', 'project', 'assignedTo'])->paginate(6);
        return view('todos.index', ['todos' => $todos]);
    }
    public function show(Todo $todo)
    {
        $todo->load(['creator', 'project', 'assignedTo', 'comments.user']);
        $users = User::all();
        return view('todos.show', compact('todo', 'users'));
    }
    public function create()
    {
        $users = User::all();
        $projects = Project::all();
        return view('todos.create', compact('users', 'projects'));
    }
    public function store(StoreTodoRequest $request)
    {
        $validated = $request->validated();
        Todo::create($validated);
        return redirect()->route('todos.index')->with('success', 'Task created successfully');
    }

    public function edit(Todo $todo)
    {
        $todo->load(['creator', 'project', 'assignedTo']);
        $users = User::all();
        $projects = Project::all();
        return view('todos.edit', compact('todo', 'users', 'projects'));
    }

    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $validated = $request->validated();
        $todo->update($validated);
        return redirect()->route('todos.index')->with('success', 'Task updated successfully');
    }
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return redirect()->route('todos.index');
    }
}
