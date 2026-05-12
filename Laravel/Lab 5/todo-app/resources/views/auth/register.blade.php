@extends('layouts.app')

@section('title', 'Join Us')
@section('page_title', 'Create Account')

@section('content')
<div class="max-w-md mx-auto">
    <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        <div class="p-8 border-b border-slate-50 text-center">
            <h1 class="text-2xl font-black text-slate-800 tracking-tight">Get Started</h1>
            <p class="text-slate-400 text-sm mt-2">Join our community today</p>
        </div>

        <form method="POST" action="{{ route('register') }}" class="p-8 space-y-5">
            @csrf

            <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Full Name</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">👤</span>
                    <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition shadow-sm placeholder:text-slate-300"
                        placeholder="John Doe">
                </div>
                @if ($errors->has('name'))
                    <p class="mt-2 text-xs text-red-500 font-medium">{{ $errors->first('name') }}</p>
                @endif
            </div>

            <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Email Address</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">✉️</span>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition shadow-sm placeholder:text-slate-300"
                        placeholder="email@example.com">
                </div>
                @if ($errors->has('email'))
                    <p class="mt-2 text-xs text-red-500 font-medium">{{ $errors->first('email') }}</p>
                @endif
            </div>

            <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Password</label>
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

            <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Confirm Password</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">🛡️</span>
                    <input id="password_confirmation" type="password" name="password_confirmation" required
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition shadow-sm placeholder:text-slate-300"
                        placeholder="••••••••">
                </div>
            </div>

            <div class="pt-4">
                <button type="submit"
                    class="w-full py-4 bg-indigo-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em]">
                    Create Account
                </button>
            </div>

            <div class="text-center pt-2">
                <a href="{{ route('login') }}" class="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition uppercase tracking-widest">
                    Already registered? <span class="text-indigo-600">Log in</span>
                </a>
            </div>
        </form>
    </div>
</div>
@endsection