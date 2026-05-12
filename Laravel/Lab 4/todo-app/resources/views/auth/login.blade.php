@extends('layouts.app')

@section('title', 'Login')
@section('page_title', 'Welcome Back')

@section('content')
<div class="max-w-md mx-auto">
    @if (session('status'))
        <div class="mb-4 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-sm">
            {{ session('status') }}
        </div>
    @endif

    <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div class="p-8 border-b border-slate-50 text-center">
            <h1 class="text-2xl font-black text-slate-800 tracking-tight">Login to Your Account</h1>
            <p class="text-slate-400 text-sm mt-2">Enter your details to continue</p>
        </div>

        <form method="POST" action="{{ route('login') }}" class="p-8 space-y-6">
            @csrf

            <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Email Address</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">✉️</span>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition shadow-sm placeholder:text-slate-300"
                        placeholder="name@example.com">
                </div>
                @if ($errors->has('email'))
                    <p class="mt-2 text-xs text-red-500 font-medium">{{ $errors->first('email') }}</p>
                @endif
            </div>

            <div>
                <div class="flex justify-between items-center mb-2">
                    <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500">Password</label>
                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" class="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 transition uppercase tracking-tighter">
                            Forgot?
                        </a>
                    @endif
                </div>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">🔑</span>
                    <input id="password" type="password" name="password" required
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition shadow-sm placeholder:text-slate-300"
                        placeholder="••••••••">
                </div>
                @if ($errors->has('password'))
                    <p class="mt-2 text-xs text-red-500 font-medium">{{ $errors->first('password') }}</p>
                @endif
            </div>

            <div class="flex items-center">
                <label for="remember_me" class="inline-flex items-center cursor-pointer">
                    <input id="remember_me" type="checkbox" name="remember" 
                        class="rounded-md border-slate-200 text-indigo-600 shadow-sm focus:ring-indigo-100 w-4 h-4 transition">
                    <span class="ms-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">{{ __('Remember me') }}</span>
                </label>
            </div>

            <div class="pt-2">
                <button type="submit"
                    class="w-full py-4 bg-indigo-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em]">
                    Log In
                </button>
            </div>
            
            <p class="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Don't have an account? 
                <a href="{{ route('register') }}" class="text-indigo-600 hover:underline">Register</a>
            </p>
        </form>
    </div>
</div>
@endsection