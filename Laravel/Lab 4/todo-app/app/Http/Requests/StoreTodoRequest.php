<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTodoRequest extends FormRequest
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
            'tags' => [
                'nullable',
                'array'
            ],
            'tags.*' => [
                'string'
            ],
            'color' => [
                'nullable',
                'string',
                'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'
            ],
            'images' => [
                'nullable',
                'array'
            ],
            'images.*' => [
                'image',
                'mimes:jpg,png,jpeg',
                'max:2048'
            ]
        ];
    }
}
