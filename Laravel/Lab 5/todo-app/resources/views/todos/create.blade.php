@extends('layouts.app')

@section('title', 'Create New Task')
@section('page_title', 'Create New Task')

@section('content')
    @if ($errors->any())
        <div class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            <ul class="list-disc list-inside">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="max-w-3xl mx-auto">
        <form action="{{ route('todos.store') }}" method="POST" enctype="multipart/form-data"
            class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            @csrf


            <!-- Form Header Area -->
            <div class="p-8 border-b border-slate-50">
                <div class="grid grid-cols-1 gap-8">
                    <!-- Task Title -->
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500">Task
                                Title</label>

                            <!-- Color Picker -->
                            <div class="flex gap-1.5" x-data="{ selectedColor: '#6366f1' }">
                                @foreach (['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9'] as $color)
                                    <label class="cursor-pointer">
                                        <input type="radio" name="color" value="{{ $color }}" class="peer hidden"
                                            {{ $loop->first ? 'checked' : '' }}>
                                        <div class="w-5 h-5 rounded-md border-2 border-white ring-1 ring-slate-100 peer-checked:ring-2 peer-checked:ring-indigo-400 peer-checked:scale-110 transition shadow-sm"
                                            style="background-color: {{ $color }}"></div>
                                    </label>
                                @endforeach
                            </div>
                        </div>
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

                <!-- Assigned To Selector -->
                <div class="p-8 border-b md:border-b-0 md:border-r border-slate-50">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Assigned
                        To</label>
                    <select name="assigned_to_id"
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
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label
                            class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Tags</label>
                        <div id="tags-container" class="flex flex-wrap gap-2 items-center">
                            <!-- Dynamic tags will appear here -->
                            <input type="text" id="tag-input" placeholder="Add tag and press enter..."
                                class="text-xs border-none focus:ring-0 p-0 text-slate-800 w-48 bg-transparent">
                        </div>
                        <div id="tags-hidden-inputs"></div>
                    </div>

                    <!-- Images Upload -->
                    <div>
                        <label
                            class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Images</label>
                        <input type="file" name="images[]" id="images-input" multiple
                            class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition">
                        <p class="mt-2 text-[10px] text-slate-400">Multiple images allowed (Max 2MB each)</p>

                        <!-- Images Preview Grid -->
                        <div id="images-preview" class="mt-4 flex flex-wrap gap-2"></div>
                    </div>
                </div>
            </div>

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const imagesInput = document.getElementById('images-input');
                    const imagesPreview = document.getElementById('images-preview');

                    imagesInput.addEventListener('change', function() {
                        imagesPreview.innerHTML = ''; // Clear previous previews
                        const files = Array.from(this.files);

                        files.forEach(file => {
                            if (file.type.startsWith('image/')) {
                                const reader = new FileReader();
                                reader.onload = function(e) {
                                    const previewItem = document.createElement('div');
                                    previewItem.className = 'relative group';
                                    previewItem.innerHTML = `
                                        <img src="${e.target.result}" class="w-16 h-16 object-cover rounded-lg border border-slate-100 shadow-sm">
                                    `;
                                    imagesPreview.appendChild(previewItem);
                                }
                                reader.readAsDataURL(file);
                            }
                        });
                    });

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
