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

                <div class="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                    <div class="flex items-center"><span class="mr-2">📅</span> Created At:
                        {{ \Carbon\Carbon::parse($todo->created_at)->format('l, F j, Y') }}</div>
                    <div class="flex items-center"><span class="mr-2">ðŸ‘¤</span> Assigned to: <span
                            class="font-semibold text-slate-700 ml-1">{{ $todo->assignee ? $todo->assignee->name : 'Unassigned' }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-2 italic">Priority:</span>
                        <span class="font-bold uppercase tracking-wider text-indigo-600">{{ $todo->priority }}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-3">
                @if ($todo->completed)
                    <span
                        class="flex items-center px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-200">
                        <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Completed
                    </span>
                @else
                    <span
                        class="flex items-center px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200">
                        <div class="w-2 h-2 rounded-full bg-slate-400 mr-2"></div>
                        Pending
                    </span>
                @endif
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
        </div>
    </div>
@endsection
