<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Trello')</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet">

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
    </style>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-slate-50 text-slate-900">

    <!-- Header -->
    <header class="bg-white border-b border-slate-200 shadow-sm">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">

            <!-- Logo -->
            <a href="{{ route('todos.index') }}" class="text-xl font-bold text-slate-800 tracking-tight">
                Trello
            </a>

            <!-- Right Side -->
            <div class="flex items-center space-x-4">

                @auth
                    <a href="{{ route('todos.create') }}" class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">
                        + Add Task
                    </a>

                    <span class="text-sm text-slate-600">
                        {{ auth()->user()->name }}
                    </span>

                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="px-3 py-1 bg-red-500 text-white rounded-md text-sm">
                            Logout
                        </button>
                    </form>
                @endauth

                @guest
                    <a href="{{ route('login') }}" class="text-sm">Login</a>
                    <a href="{{ route('register') }}" class="text-sm ml-2">Register</a>
                @endguest

            </div>
        </div>
    </header>

    <!-- Content -->
    <div class="container mx-auto p-8">
        @yield('content')
    </div>

</body>

</html>
