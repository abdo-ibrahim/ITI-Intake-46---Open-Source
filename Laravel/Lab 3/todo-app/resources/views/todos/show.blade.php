@extends('layouts.app')

@section('title', 'Task Details')
@section('page_title', 'Task View')

@section('content')
    <div class="max-w-4xl mx-auto">
        <!-- Header Section: Title & Actions -->
        <div class="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
                <nav class="flex text-xs text-slate-400 mb-2 space-x-2">
                    <span>Tasks</span>
                    <span>/</span>
                    <span
                        class="text-indigo-500 font-medium italic">{{ $todo->project ? $todo->project->name : 'Project #' . $todo->project_id }}</span>
                </nav>
                <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">{{ $todo->title }}</h1>

                <!-- Applied Task Color -->
                <div class="mt-2 flex items-center">
                    <div class="w-12 h-1.5 rounded-full" style="background-color: {{ $todo->color ?? '#6366f1' }}"></div>
                    <span class="ml-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Theme Color</span>
                </div>

                <div class="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                    <div class="flex items-center"><span class="mr-2">📅</span> Created At:
                        {{ \Carbon\Carbon::parse($todo->created_at)->format('l, F j, Y') }}</div>
                    <div class="flex items-center"><span class="mr-2">ðŸ‘¤</span> Assigned to: <span
                            class="font-semibold text-slate-700 ml-1">{{ $todo->assignedTo ? $todo->assignedTo->name : 'Unassigned' }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-2 italic">Priority:</span>
                        <span class="font-bold uppercase tracking-wider text-indigo-600">{{ $todo->priority }}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-3">
                @php
                    $statusConfig = [
                        'to_do' => [
                            'bg' => 'bg-slate-100',
                            'text' => 'text-slate-600',
                            'border' => 'border-slate-200',
                            'label' => 'To Do',
                        ],
                        'in_progress' => [
                            'bg' => 'bg-amber-50',
                            'text' => 'text-amber-700',
                            'border' => 'border-amber-200',
                            'label' => 'In Progress',
                        ],
                        'completed' => [
                            'bg' => 'bg-emerald-50',
                            'text' => 'text-emerald-700',
                            'border' => 'border-emerald-200',
                            'label' => 'Completed',
                        ],
                    ];
                    $currentStatus = $statusConfig[$todo->status] ?? $statusConfig['to_do'];
                @endphp

                <span
                    class="flex items-center px-4 py-1.5 {{ $currentStatus['bg'] }} {{ $currentStatus['text'] }} rounded-full text-xs font-bold uppercase tracking-widest border {{ $currentStatus['border'] }}">
                    @if ($todo->status == 'completed')
                        <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                    @elseif($todo->status == 'in_progress')
                        <div class="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse"></div>
                    @else
                        <div class="w-2 h-2 rounded-full bg-slate-400 mr-2"></div>
                    @endif
                    {{ $currentStatus['label'] }}
                </span>
                <button class="p-2 hover:bg-slate-100 rounded-full transition">•••</button>
            </div>
        </div>

        <!-- Quick Info Tags -->
        <div class="flex flex-wrap gap-3 mb-10 pb-6 border-b border-slate-100">
            <span class="text-xs font-medium text-slate-400 self-center">Column: <b
                    class="text-slate-600 ml-1">{{ $todo->board_column }}</b></span>
            @if (is_array($todo->labels) || is_object($todo->labels))
                @foreach ($todo->labels as $label)
                    <span
                        class="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded uppercase tracking-tighter">{{ $label }}</span>
                @endforeach
            @endif
            @if (is_array($todo->tags) || is_object($todo->tags))
                @foreach ($todo->tags as $tag)
                    <span class="text-xs text-slate-400">#{{ $tag }}</span>
                @endforeach
            @endif
        </div>

        <!-- Main Grid Layout -->
        <div class="grid grid-cols-1 gap-10">

            <!-- Description Section -->
            <section>
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-slate-800 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h7"></path>
                        </svg>
                        Description
                    </h3>
                    <a href="{{ route('todos.edit', $todo->id) }}"
                        class="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded transition border border-indigo-100">Edit</a>
                </div>
                <p class="text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    {{ $todo->description }}
                </p>
            </section>

            <!-- Metadata Section (Creator & Project) -->
            <section class="grid grid-cols-2 gap-4">
                <div class="p-5 bg-white rounded-2xl border border-slate-100 flex items-center space-x-4">
                    <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">👤
                    </div>
                    <div>
                        <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Created by</p>
                        <p class="text-sm font-bold text-slate-800">{{ $todo->creator ? $todo->creator->name : 'Unknown' }}
                        </p>
                    </div>
                </div>
                <div class="p-5 bg-white rounded-2xl border border-slate-100 flex items-center space-x-4">
                    <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">ðŸ“
                    </div>
                    <div>
                        <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Project</p>
                        <p class="text-sm font-bold text-slate-800 italic">
                            {{ $todo->project ? $todo->project->name : 'Project #' . $todo->project_id }}</p>
                    </div>
                </div>
            </section>

            <!-- Comments Section -->
            <section>
                <h3 class="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Comments</h3>

                <!-- Display Comments -->
                <div class="space-y-4 mb-6">
                    @forelse($todo->comments as $comment)
                        <div class="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-start space-x-3">
                            <div
                                class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-xs font-bold">
                                {{ strtoupper(substr($comment->user ? $comment->user->name : 'A', 0, 1)) }}
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-center mb-1">
                                    <h4 class="text-xs font-bold text-slate-800">
                                        {{ $comment->user ? $comment->user->name : 'Anonymous' }}</h4>
                                    <span
                                        class="text-[10px] text-slate-400 font-medium italic">{{ $comment->created_at->diffForHumans() }}</span>
                                </div>
                                <p class="text-sm text-slate-600 leading-relaxed">{{ $comment->content }}</p>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <p class="text-sm text-slate-400">No comments yet.</p>
                        </div>
                    @endforelse
                </div>

                <!-- Add Comment Form -->
                <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <form action="{{ route('comments.store', $todo->id) }}" method="POST">
                        @csrf <div class="mb-4">
                            <label for="user_id"
                                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Comment
                                as</label>
                            <select name="user_id" id="user_id"
                                class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-100 text-sm"
                                required>
                                <option value="" disabled selected>Select User</option>
                                @foreach ($users as $user)
                                    <option value="{{ $user->id }}">{{ $user->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <textarea name="content" placeholder="Write a comment..."
                            class="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-100 text-sm mb-4" rows="3"
                            required></textarea>
                        <div class="flex justify-between items-center">
                            <div class="flex space-x-4 text-slate-300">
                                <span class="cursor-pointer hover:text-indigo-400 text-lg">📎</span>
                            </div>
                            <button type="submit"
                                class="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition uppercase tracking-widest">
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>
            </section>


        </div>
    </div>
@endsection
