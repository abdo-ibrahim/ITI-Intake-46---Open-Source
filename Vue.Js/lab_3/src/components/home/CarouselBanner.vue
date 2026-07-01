<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const slides = ref([
  {
    id: 1,
    title: "Amazing Summer Finds",
    subtitle: "Refresh your look with light, bold, and effortless picks.",
    image: "https://picsum.photos/id/1012/1920/1080",
  },
  {
    id: 2,
    title: "Amazing Daily Essentials",
    subtitle: "Reliable gear and accessories built for every day.",
    image: "https://picsum.photos/id/1025/1920/1080",
  },
  {
    id: 3,
    title: "Amazing Travel Ready",
    subtitle: "Pack smart with pieces that work everywhere you go.",
    image: "https://picsum.photos/id/1043/1920/1080",
  },
]);

const active = ref(0);

const prev = () => {
  active.value = (active.value - 1 + slides.value.length) % slides.value.length;
};

const next = () => {
  active.value = (active.value + 1) % slides.value.length;
};

onMounted(() => {
  console.log("CarouselBanner mounted");
});

onUnmounted(() => {
  console.log("CarouselBanner unmounted");
});
</script>

<template>
  <section class="relative w-full overflow-hidden">
    <div class="relative h-[88vh] w-full overflow-hidden">
      <transition name="slide-fade" mode="out-in">
        <img :key="active" :src="slides[active].image" :alt="slides[active].title" class="absolute inset-0 h-full w-full object-cover" />
      </transition>

      <div class="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/50 to-transparent">
        <div class="text-white max-w-xl">
          <h2 class="text-3xl font-bold">{{ slides[active].title }}</h2>
          <p class="mt-2 text-lg">{{ slides[active].subtitle }}</p>
        </div>
      </div>

      <button @click="prev" aria-label="Previous" class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white">&#8592;</button>
      <button @click="next" aria-label="Next" class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white">&#8594;</button>
    </div>
  </section>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(12px) scale(1.01);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-12px) scale(0.995);
}

.slide-fade-enter-active,
.slide-fade-leave-active,
.slide-fade-enter-from,
.slide-fade-enter-to,
.slide-fade-leave-from,
.slide-fade-leave-to {
  will-change: transform, opacity;
}
</style>
