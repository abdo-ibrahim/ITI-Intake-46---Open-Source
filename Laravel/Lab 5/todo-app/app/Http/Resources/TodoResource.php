<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'board_column' => $this->board_column,
            'order' => $this->order,
            'title' => $this->title,
            'description' => $this->description,
            'completed' => $this->completed,
            'due_date' => $this->due_date,
            'priority' => $this->priority,
            'tags' => $this->tags,
            'status' => $this->status,
            'creator_id' => $this->creator_id,
            'assigned_to_id' => $this->assigned_to_id,
            'labels' => $this->labels,
            'color' => $this->color,
        ];
    }
}
