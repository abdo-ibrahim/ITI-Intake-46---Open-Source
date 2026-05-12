<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Todo;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, $todo_id)
    {
        $todo = Todo::findOrFail($todo_id);
        $todo->comments()->create([
            'content' => $request->input('content'),
            'user_id' => $request->input('user_id'),
        ]);

        return redirect()->back()->with('success', 'Comment added successfully');
    }
}
