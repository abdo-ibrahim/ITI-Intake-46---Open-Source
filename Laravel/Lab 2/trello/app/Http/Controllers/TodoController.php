<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;

class TodoController extends Controller
{

    public function index()
    {
        $todos = Todo::with(['creator', 'project'])->paginate(6);
        return view('todos.index', ['todos' => $todos]);
    }

    public function show($id)
    {
        $todo = Todo::with(['creator', 'project', 'assignee'])->findOrFail($id);
        return view('todos.show', ['todo' => $todo]);
    }
    public function create()
    {
        $users = User::all();
        $projects = Project::all();
        return view('todos.create', compact('users', 'projects'));
    }
    public function store(Request $request)
    {

        Todo::create($request->all());
        return redirect()->route('todos.index');
    }

    public function edit($id)
    {
        $todo = Todo::findOrFail($id);
        $users = User::all();
        $projects = Project::all();
        return view('todos.edit', compact('todo', 'users', 'projects'));
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $updateData = $request->all();
        if ($request->has('completed')) {
            $updateData['completed'] = $request->boolean('completed');
        }
        $todo->update($updateData);
        return redirect()->route('todos.index');
    }
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return redirect()->route('todos.index');
    }
}
