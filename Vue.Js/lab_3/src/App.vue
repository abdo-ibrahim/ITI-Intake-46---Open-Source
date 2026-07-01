<script setup lang="ts">
import NavBar from "./components/utils/NavBar.vue";
import Footer from "./components/utils/Footer.vue";
</script>
<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden">
    <NavBar />
    <main class="w-[min(1100px,92vw)] mx-auto my-6 md:my-8 grid gap-5 md:gap-8">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
