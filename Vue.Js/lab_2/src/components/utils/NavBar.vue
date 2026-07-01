<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import type { productProps } from "../../types/types";

const props = defineProps<{
  products: productProps[];
}>();

const totalStock = computed(() => {
  return props.products.reduce((total, product) => total + product.stock, 0);
});

onMounted(() => {
  console.log("NavBar mounted");
});

onUnmounted(() => {
  console.log("NavBar unmounted");
});
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex w-[min(1100px,92vw)] flex-wrap items-center justify-between gap-3 py-3 md:py-4">
      <RouterLink to="/" class="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">My Store</RouterLink>

      <nav aria-label="Main navigation" class="order-3 w-full md:order-2 md:w-auto">
        <ul class="flex w-full items-center gap-2 overflow-x-auto pb-1 text-sm text-slate-600 md:w-auto md:justify-center md:gap-6 md:overflow-visible md:pb-0 md:text-base">
          <li>
            <RouterLink to="/" class="inline-flex rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/products" class="inline-flex rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">Products</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="inline-flex rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900">About</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="order-2 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 md:order-3">
        <span class="font-semibold text-slate-900">Stock</span>
        <span class="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">{{ totalStock }}</span>
      </div>
    </div>
  </header>
</template>
