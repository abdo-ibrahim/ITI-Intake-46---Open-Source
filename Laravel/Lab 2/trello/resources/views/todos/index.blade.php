@extends('layouts.app')

@section('title', 'Tasks List')
@section('page_title', 'My Tasks')

@section('content')
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50/50 border-b border-slate-200">
                        <th class="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Task Info</th>
                        <th class="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Owner</th>
                        <th class="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Priority</th>
                        <th class="px-6 py-4 text-xs font-semibold uppercase text-slate-500">Status</th>
                        <th class="px-6 py-4 text-xs font-semibold uppercase text-slate-500 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @foreach ($todos as $todo)
                        <tr class="hover:bg-slate-50 transition-colors group">
                            <!-- Task Title & Project -->
                            <td class="px-6 py-5">
                                <div class="flex items-center">
                                    <span
                                        class="text-sm font-bold text-slate-400 mr-4">{{ sprintf('%02d', $loop->iteration) }}</span>
                                    <div>
                                        <h3 class="font-semibold text-slate-800 group-hover:text-indigo-600 transition">
                                            {{ $todo->title }}</h3>
                                        <p class="text-xs text-slate-400">Created At:
                                            {{ \Carbon\Carbon::parse($todo->created_at)->format('Y-m-d') }}</p>
                                    </div>
                                </div>
                            </td>

                            <!-- Creator -->
                            <td class="px-6 py-5">
                                <div class="flex items-center space-x-2">
                                    @php
                                        $creatorName = $todo->creator ? $todo->creator->name : 'Unknown';
                                    @endphp
                                    <div
                                        class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                                        {{ strtoupper(substr($creatorName, 0, 2)) }}
                                    </div>
                                    <span class="text-sm text-slate-600">{{ $creatorName }}</span>
                                </div>
                            </td>

                            <!-- Priority -->
                            <td class="px-6 py-5">
                                @php
                                    $priorityColors = [
                                        'high' => 'bg-red-50 text-red-600 border-red-100',
                                        'medium' => 'bg-amber-50 text-amber-600 border-amber-100',
                                        'low' => 'bg-blue-50 text-blue-600 border-blue-100',
                                    ];
                                    $pColor =
                                        $priorityColors[strtolower($todo->priority)] ?? 'bg-slate-50 text-slate-600';
                                @endphp
                                <span
                                    class="px-3 py-1 rounded-full text-[10px] font-bold uppercase border {{ $pColor }}">
                                    {{ $todo->priority }}
                                </span>
                            </td>

                            <!-- Status (Dynamic Check) -->
                            <td class="px-6 py-5">
                                @if ($todo->completed)
                                    <div class="flex items-center text-emerald-600 text-sm font-medium">
                                        <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        Completed
                                    </div>
                                @else
                                    <div class="flex items-center text-slate-400 text-sm font-medium">
                                        <div class="w-2 h-2 rounded-full bg-slate-300 mr-2"></div>
                                        Pending
                                    </div>
                                @endif
                            </td>

                            <!-- Actions -->
                            <td class="px-6 py-5 text-right">
                                <div class="flex justify-end space-x-2">
                                    <a href="{{ route('todos.show', $todo->id) }}"
                                        class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                            </path>
                                        </svg>
                                    </a>
                                    <a href="{{ route('todos.edit', $todo->id) }}"
                                        class="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                            </path>
                                        </svg>
                                    </a>
                                    <button type="button"
                                        onclick="openDeleteModal('{{ route('todos.destroy', $todo->id) }}', '{{ $todo->title }}')"
                                        class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Pagination Links -->
        <div class="px-6 py-4 border-t border-slate-200">
            {{ $todos->links() }}
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div id="deleteModal" class="hidden fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
            <!-- Overlay -->
            <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>

            <!-- Modal Content -->
            <div class="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 transform transition-all">
                <div class="text-center">
                    <div
                        class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">Delete Task?</h3>
                    <p class="text-slate-500 text-sm mb-8">Are you sure you want to delete <span id="deleteTaskTitle"
                            class="font-semibold text-slate-700"></span>? This action cannot be undone.</p>

                    <div class="flex space-x-3">
                        <button type="button" onclick="closeDeleteModal()"
                            class="flex-1 px-4 py-3 bg-slate-100 text-slate-600 text-sm font-bold rounded-2xl hover:bg-slate-200 transition">
                            Cancel
                        </button>
                        <form id="deleteForm" method="POST" class="flex-1">
                            @csrf
                            @method('DELETE')
                            <button type="submit"
                                class="w-full px-4 py-3 bg-red-500 text-white text-sm font-bold rounded-2xl hover:bg-red-600 shadow-lg shadow-red-200 transition">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function openDeleteModal(actionUrl, taskTitle) {
            document.getElementById('deleteForm').action = actionUrl;
            document.getElementById('deleteTaskTitle').textContent = taskTitle;
            document.getElementById('deleteModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Close on escape key
        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeDeleteModal();
        });
    </script>
@endsection
