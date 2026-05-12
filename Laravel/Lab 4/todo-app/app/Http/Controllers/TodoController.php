<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Project;
use App\Models\Todo;
use App\Models\TodoImage;
use App\Models\User;
use App\Traits\HasMediaUpload;

class TodoController extends Controller
{
    use HasMediaUpload;


    public function index()
    {
        $todos = Todo::with([
            'creator',
            'project',
            'assignedTo',
            'images',
        ])->paginate(6);

        return view('todos.index', compact('todos'));
    }

    public function show(Todo $todo)
    {
        $todo->load([
            'creator',
            'project',
            'assignedTo',
            'comments.user',
            'images',
        ]);

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

        $todo = Todo::create($validated);

        $paths = $this->uploadMultipleImages(
            $request,
            'images',
            'todos'
        );

        // images array
        $imagesData = collect($paths)->map(function ($path) {
            return [
                'image' => $path,
            ];
        })->toArray();
        // Save Images
        if (!empty($imagesData)) {
            $todo->images()->createMany($imagesData);
        }

        return redirect()
            ->route('todos.index')
            ->with('success', 'Task created successfully');
    }

    public function edit(Todo $todo)
    {
        $todo->load([
            'creator',
            'project',
            'assignedTo',
            'images',
        ]);

        $users = User::all();
        $projects = Project::all();

        return view('todos.edit', compact(
            'todo',
            'users',
            'projects'
        ));
    }

    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $validated = $request->validated();

        if ($request->has('remove_images')) {

            $imagesToDelete = TodoImage::whereIn(
                'id',
                $request->remove_images
            )->get();

            $this->deleteMultipleFiles(
                $imagesToDelete->pluck('image')->toArray()
            );

            // Delete Records From Database
            TodoImage::whereIn(
                'id',
                $request->remove_images
            )->delete();
        }

        if ($request->hasFile('images')) {
            $paths = $this->uploadMultipleImages(
                $request,
                'images',
                'todos'
            );

            $imagesData = collect($paths)->map(function ($path) {
                return [
                    'image' => $path,
                ];
            })->toArray();

            if (!empty($imagesData)) {
                $todo->images()->createMany($imagesData);
            }
        }
        $todo->update($validated);

        return redirect()
            ->route('todos.index')
            ->with('success', 'Task updated successfully');
    }

    public function destroy(Todo $todo)
    {
        $this->deleteMultipleFiles(
            $todo->images->pluck('image')->toArray()
        );
        $todo->images()->delete();
        $todo->comments()->delete();
        $todo->delete();

        return redirect()
            ->route('todos.index')
            ->with('success', 'Task deleted successfully');
    }
}
