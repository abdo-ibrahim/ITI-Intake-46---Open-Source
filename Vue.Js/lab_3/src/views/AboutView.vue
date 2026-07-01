<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("AboutView mounted");
});

onUnmounted(() => {
  console.log("AboutView unmounted");
});
</script>

<template>
  <section class="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
    <header class="space-y-1">
      <h1 class="text-2xl md:text-3xl font-semibold text-slate-900">Abdulrahman</h1>
      <p class="text-slate-600">Vue.js Course - ITI</p>
    </header>

    <p class="text-slate-700 leading-7">Our store brings together practical essentials and curated lifestyle pieces, making it easy to discover products that fit your daily rhythm. Browse confidently, compare quickly, and checkout with clarity.</p>
  </section>
</template>
