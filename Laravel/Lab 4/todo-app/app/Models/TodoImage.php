<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TodoImage extends Model
{
    use HasFactory;
    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }
    protected $fillable = [
        'image',
    ];
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => asset('storage/' . $this->image)
        );
    }
}
