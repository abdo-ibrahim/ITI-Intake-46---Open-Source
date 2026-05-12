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
                    <label class="block text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Email
                        Address</label>
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
                        <label
                            class="block text-[10px] font-black uppercase tracking-widest text-indigo-500">Password</label>
                        @if (Route::has('password.request'))
                            <a href="{{ route('password.request') }}"
                                class="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 transition uppercase tracking-tighter">
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
                        <span
                            class="ms-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">{{ __('Remember me') }}</span>
                    </label>
                </div>

                <div class="pt-2">
                    <button type="submit"
                        class="w-full py-4 bg-indigo-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em]">
                        Log In
                    </button>
                </div>

                <div class="relative py-4">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-slate-100"></div>
                    </div>
                    <div class="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                        <span class="bg-white px-4 text-slate-400">Or continue with</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <a href="{{ url('auth/github/redirect') }}"
                        class="flex items-center justify-center py-3 px-4 bg-slate-800 text-white rounded-2xl hover:bg-slate-900 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-100">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clip-rule="evenodd" />
                        </svg>
                        GitHub
                    </a>
                    <a href="{{ url('auth/google/redirect') }}"
                        class="flex items-center justify-center py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-widest shadow-sm">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path fill="#EA4335"
                                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                            <path fill="#FBBC05"
                                d="M16.04 18.013c-1.09.603-2.346.956-3.733.956-3.52 0-6.524-2.39-7.584-5.632l-4.045 3.125C2.69 20.44 7.152 24 12 24c3.27 0 6.132-1.21 8.358-3.235l-4.318-2.752Z" />
                            <path fill="#4285F4"
                                d="M19.835 12.015c0-.796-.063-1.567-.18-2.315H12v4.382h4.4c-.19 1.018-.763 1.882-1.624 2.458l4.318 2.752c2.53-2.31 3.99-5.71 3.99-9.277Z" />
                            <path fill="#34A853"
                                d="M4.723 13.337c-.247-.733-.387-1.516-.387-2.337 0-.793.132-1.554.364-2.261L.674 5.626C.243 6.556 0 7.576 0 8.65c0 1.048.232 2.052.65 2.964l4.073-2.277Z" />
                        </svg>
                        Google
                    </a>
                </div>

                <p class="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Don't have an account?
                    <a href="{{ route('register') }}" class="text-indigo-600 hover:underline">Register</a>
                </p>
            </form>
        </div>
    </div>
@endsection
