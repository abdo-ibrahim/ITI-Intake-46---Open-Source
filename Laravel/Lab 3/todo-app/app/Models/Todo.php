<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'board_column',
        'order',
        'title',
        'description',
        'completed',
        'due_date',
        'priority',
        'tags',
        'status',
        'creator_id',
        'assigned_to_id',
        'labels',
        'color',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'tags' => 'array',
        'labels' => 'array',
        'due_date' => 'date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

    public function assignee()
    {
        return $this->assignedTo();
    }
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
