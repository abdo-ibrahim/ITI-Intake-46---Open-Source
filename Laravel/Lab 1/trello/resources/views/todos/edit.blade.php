@extends('layouts.app')

@section('title', 'Edit Task: ' . $todo['title'])
@section('page_title', 'Edit Task')

@section('content')
    <div class="max-w-3xl mx-auto">
        <form action="{{ route('todos.update', $todo['id']) }}" method="POST"
            class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            @csrf
            @method('PUT')

            <!-- Form Header Area -->
            <div class="p-8 border-b border-slate-50">
                <div class="grid grid-cols-1 gap-8">
                    <!-- Task Title -->
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Task
                            Title</label>
                        <input type="text" name="title" value="{{ $todo['title'] }}" placeholder="Task Title..."
                            class="w-full text-2xl font-bold text-slate-800 placeholder:text-slate-200 border-none focus:ring-0 p-0">
                    </div>

                    <!-- Description -->
                    <div>
                        <label
                            class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Description</label>
                        <textarea name="description" rows="3" placeholder="Describe the task..."
                            class="w-full text-slate-600 placeholder:text-slate-300 border-none focus:ring-0 p-0 resize-none">{{ $todo['description'] }}</textarea>
                    </div>
                </div>
            </div>

            <!-- Middle Section: Date & Priority -->
            <div class="grid grid-cols-1 md:grid-cols-2 border-b border-slate-50">
                <!-- Due Date -->
                <div class="p-8 border-b md:border-b-0 md:border-r border-slate-50">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Due
                        Date</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">📅</span>
                        <input type="date" name="due_date" value="{{ $todo['due_date'] }}"
                            class="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition">
                    </div>
                </div>

                <!-- Priority Selector -->
                <div class="p-8 border-b md:border-b-0 md:border-r border-slate-50">
                    <label
                        class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Priority</label>
                    <div class="flex gap-2">
                        @foreach (['Low', 'Medium', 'High', 'Urgent'] as $priority)
                            <label class="flex-1 cursor-pointer">
                                <input type="radio" name="priority" value="{{ strtolower($priority) }}"
                                    class="peer hidden"
                                    {{ strtolower($todo['priority']) == strtolower($priority) ? 'checked' : '' }}>
                                <div
                                    class="text-center py-2 text-[10px] font-bold rounded-lg border border-slate-100 text-slate-400 peer-checked:bg-indigo-50 peer-checked:border-indigo-200 peer-checked:text-indigo-600 transition">
                                    {{ $priority }}
                                </div>
                            </label>
                        @endforeach
                    </div>
                </div>

                <!-- Creator Selector -->
                <div class="p-8">
                    <label
                        class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Creator</label>
                    <select name="creator"
                        class="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition mt-1">
                        @foreach (['abdo ibrahim', 'mona', 'ahmed', 'mahmoud'] as $user)
                            <option value="{{ $user }}"
                                {{ isset($todo['creator']) && strtolower($todo['creator']) == strtolower($user) ? 'selected' : '' }}>
                                {{ $user }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <!-- Tags -->
            <div class="p-8 border-b border-slate-50">
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Tags</label>
                    <div id="tags-container" class="flex flex-wrap gap-2 items-center">
                        @foreach ($todo['tags'] as $tag)
                            <span id="tag-{{ $loop->index }}"
                                class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold flex items-center group">
                                #{{ $tag }}
                                <button type="button" onclick="removeTag('{{ $loop->index }}')"
                                    class="ml-2 text-indigo-300 hover:text-indigo-600 transition-colors">×</button>
                            </span>
                        @endforeach
                        <input type="text" id="tag-input" placeholder="Add tag and press enter..."
                            class="text-xs border-none focus:ring-0 p-0 text-slate-800 w-48 bg-transparent">
                    </div>
                    <div id="tags-hidden-inputs">
                        @foreach ($todo['tags'] as $tag)
                            <input type="hidden" name="tags[]" value="{{ $tag }}"
                                id="input-tag-{{ $loop->index }}">
                        @endforeach
                    </div>
                </div>
            </div>

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const tagInput = document.getElementById('tag-input');
                    const tagsContainer = document.getElementById('tags-container');
                    const tagsHiddenInputs = document.getElementById('tags-hidden-inputs');

                    // Handle Tag Input
                    tagInput.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const tag = this.value.trim();
                            if (tag) {
                                addTag(tag);
                                this.value = '';
                            }
                        }
                    });

                    function addTag(tag) {
                        const tagId = Date.now();
                        const tagHtml = `
                        <span id="tag-${tagId}" class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold flex items-center group">
                            #${tag}
                            <button type="button" onclick="removeTag('${tagId}')" class="ml-2 text-indigo-300 hover:text-indigo-600 transition-colors">×</button>
                        </span>
                    `;
                        const inputHtml = `<input type="hidden" name="tags[]" value="${tag}" id="input-tag-${tagId}">`;

                        tagInput.insertAdjacentHTML('beforebegin', tagHtml);
                        tagsHiddenInputs.insertAdjacentHTML('beforeend', inputHtml);
                    }

                    window.removeTag = function(id) {
                        const tagEl = document.getElementById(`tag-${id}`);
                        const inputEl = document.getElementById(`input-tag-${id}`);
                        if (tagEl) tagEl.remove();
                        if (inputEl) inputEl.remove();
                    }
                });
            </script>
            </script>

            <!-- Footer Actions -->
            <div class="p-6 bg-slate-50/50 flex justify-between items-center">
                <a href="{{ url()->previous() }}"
                    class="text-sm font-bold text-slate-400 hover:text-slate-600 transition">Discard Changes</a>

                <div class="flex items-center space-x-6">
                    <button type="button" class="text-slate-400 hover:text-indigo-600 transition">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                            </path>
                        </svg>
                    </button>
                    <button type="submit"
                        class="px-10 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                        Update Task
                    </button>
                </div>
            </div>
        </form>
    </div>
@endsection
