@extends('layouts.app')

@section('title', 'Create New Task')
@section('page_title', 'Create New Task')

@section('content')
    <div class="max-w-3xl mx-auto">
        <form action="{{ route('todos.store') }}" method="POST"
            class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            @csrf

            <!-- Form Header Area -->
            <div class="p-8 border-b border-slate-50">
                <div class="grid grid-cols-1 gap-8">
                    <!-- Task Title -->
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Task
                            Title</label>
                        <input type="text" name="title" placeholder="Type Task Title Here, e.g., Build Laravel App"
                            class="w-full text-2xl font-bold text-slate-800 placeholder:text-slate-200 border-none focus:ring-0 p-0">
                    </div>

                    <!-- Description -->
                    <div>
                        <label
                            class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Description</label>
                        <textarea name="description" rows="3" placeholder="What needs to be done? Add context, goals, or notes..."
                            class="w-full text-slate-600 placeholder:text-slate-300 border-none focus:ring-0 p-0 resize-none"></textarea>
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
                        <input type="date" name="due_date"
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
                                    class="peer hidden">
                                <div
                                    class="text-center py-2 text-[10px] font-bold rounded-lg border border-slate-100 text-slate-400 peer-checked:bg-indigo-50 peer-checked:border-indigo-200 peer-checked:text-indigo-600 transition">
                                    {{ $priority }}
                                </div>
                            </label>
                        @endforeach
                    </div>
                </div>

                <!-- Creator Selector -->
                <div class="p-8 border-b md:border-b-0 md:border-r border-slate-50">
                    <label
                        class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Creator</label>
                    <select name="creator_id"
                        class="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition mt-1">
                        @foreach ($users as $user)
                            <option value="{{ $user->id }}">{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Project Selector -->
                <div class="p-8">
                    <label
                        class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Project</label>
                    <select name="project_id"
                        class="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition mt-1">
                        @foreach ($projects as $project)
                            <option value="{{ $project->id }}">{{ $project->name }}</option>
                        @endforeach
                    </select>
                </div>
            </div>

            <!-- Tags -->
            <div class="p-8 border-b border-slate-50">
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Tags</label>
                    <div id="tags-container" class="flex flex-wrap gap-2 items-center">
                        <!-- Dynamic tags will appear here -->
                        <input type="text" id="tag-input" placeholder="Add tag and press enter..."
                            class="text-xs border-none focus:ring-0 p-0 text-slate-800 w-48 bg-transparent">
                    </div>
                    <div id="tags-hidden-inputs"></div>
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
                            <button type="button" onclick="removeTag(${tagId})" class="ml-2 text-indigo-300 hover:text-indigo-600 transition-colors">×</button>
                        </span>
                    `;
                        const inputHtml = `<input type="hidden" name="tags[]" value="${tag}" id="input-tag-${tagId}">`;

                        tagInput.insertAdjacentHTML('beforebegin', tagHtml);
                        tagsHiddenInputs.insertAdjacentHTML('beforeend', inputHtml);
                    }

                    window.removeTag = function(id) {
                        document.getElementById(`tag-${id}`).remove();
                        document.getElementById(`input-tag-${id}`).remove();
                    }
                });
            </script>

            <!-- Footer Actions -->
            <div class="p-6 bg-slate-50/50 flex justify-between items-center">
                <a href="{{ route('todos.index') }}"
                    class="text-sm font-bold text-slate-400 hover:text-slate-600 transition">Cancel</a>

                <div class="flex items-center space-x-6">
                    <button type="submit"
                        class="px-8 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                        Create Task
                    </button>
                </div>
            </div>
        </form>
    </div>
@endsection
