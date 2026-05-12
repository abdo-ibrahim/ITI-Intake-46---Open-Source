<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory;

    public function createdTodos()
    {
        return $this->hasMany(Todo::class, 'creator_id');
    }

    public function assignedTodos()
    {
        return $this->hasMany(Todo::class, 'assigned_to_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
