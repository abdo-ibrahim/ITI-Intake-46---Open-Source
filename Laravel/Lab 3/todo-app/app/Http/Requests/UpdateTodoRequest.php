<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'min:3',
                Rule::unique('todos')->ignore($this->todo)
            ],
            'description' => [
                'required',
                'min:10'
            ],
            'due_date' => [
                'required',
                'date',
                'after:today'
            ],
            'priority' => [
                'required',
                'in:low,medium,high,urgent'
            ],
            'status' => [
                'required',
                'in:to_do,in_progress,completed'
            ],
            'creator_id' => [
                'required',
                'exists:users,id'
            ],
            'assigned_to_id' => [
                'required',
                'exists:users,id'
            ],
            'project_id' => [
                'required',
                'exists:projects,id'
            ],
            'color' => [
                'nullable',
                'string',
                'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'
            ],
            'tags' => [
                'nullable',
                'array'
            ],
            'tags.*' => [
                'string'
            ],
        ];
    }
}
