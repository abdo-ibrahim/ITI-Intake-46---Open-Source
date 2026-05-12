@extends('layouts.app')

@section('title', 'Forgot Password')
@section('page_title', 'Reset Access')

@section('content')
    <div class="max-w-md mx-auto">
        <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

            <div class="p-8 border-b border-slate-50">
                <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">
                    🤔
                </div>
                <h1 class="text-xl font-black text-slate-800 tracking-tight text-center">Forgot Password?</h1>
                <p class="text-slate-400 text-xs mt-3 leading-relaxed text-center font-medium">
                    {{ __('No problem. Just let us know your email address and we will email you a password reset link.') }}
                </p>
            </div>

            @if (session('status'))
                <div
                    class="mx-8 mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-[10px] font-bold uppercase tracking-widest text-center">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('password.email') }}" class="p-8 space-y-6">
                @csrf

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Email
                        Address</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">✉️</span>
                        <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition shadow-sm placeholder:text-slate-300"
                            placeholder="Enter your registered email">
                    </div>
                    @if ($errors->has('email'))
                        <p class="mt-2 text-xs text-red-500 font-medium">{{ $errors->first('email') }}</p>
                    @endif
                </div>

                <div class="pt-2">
                    <button type="submit"
                        class="w-full py-4 bg-indigo-600 text-white text-[10px] font-black rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em]">
                        {{ __('Send Reset Link') }}
                    </button>
                </div>

                <div class="text-center pt-2">
                    <a href="{{ route('login') }}"
                        class="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition uppercase tracking-widest">
                        Back to <span class="text-indigo-600">Login</span>
                    </a>
                </div>
            </form>
        </div>
    </div>
@endsection
