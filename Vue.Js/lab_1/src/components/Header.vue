<script setup lang="ts"></script>
<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex w-[min(1100px,92vw)] flex-wrap items-center justify-between gap-3 py-3 md:py-4">
      <a href="#" class="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">My Store</a>

      <nav aria-label="Main navigation" class="order-3 w-full md:order-2 md:w-auto">
        <ul class="flex w-full items-center gap-2 overflow-x-auto pb-1 text-sm text-slate-600 md:w-auto md:justify-center md:gap-6 md:overflow-visible md:pb-0 md:text-base">
          <li><a href="#" class="inline-flex rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">Home</a></li>
          <li><a href="#" class="inline-flex rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">Products</a></li>
          <li><a href="#" class="inline-flex rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">Categories</a></li>
          <li><a href="#" class="inline-flex rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">Contact</a></li>
        </ul>
      </nav>

      <button class="order-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 md:order-3">Sign In</button>
    </div>
  </header>
</template>
