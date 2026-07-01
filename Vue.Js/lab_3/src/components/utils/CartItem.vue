<script setup lang="ts">
import { computed } from "vue";
import type { cartItemProps } from "../../types/types";

const props = defineProps<{
  item: cartItemProps;
}>();

const emit = defineEmits<{
  increase: [id: number];
  decrease: [id: number];
  remove: [id: number];
}>();

const unitPrice = computed(() => {
  return props.item.price - (props.item.price * props.item.discount) / 100;
});

const lineTotal = computed(() => {
  return unitPrice.value * props.item.quantity;
});
</script>

<template>
  <article class="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[92px_1fr_auto] sm:items-center">
    <img :src="props.item.image" :alt="props.item.name" class="h-24 w-24 rounded-lg object-cover" />

    <div class="space-y-1">
      <h3 class="text-lg font-semibold text-slate-900">{{ props.item.name }}</h3>
      <p class="text-sm text-slate-600 line-clamp-2">{{ props.item.description }}</p>
      <p class="text-sm font-medium text-slate-800">${{ unitPrice.toFixed(2) }} each</p>
      <p class="text-sm text-slate-700">Subtotal: ${{ lineTotal.toFixed(2) }}</p>
    </div>

    <div class="flex items-center gap-2 self-start sm:self-center">
      <button class="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700 hover:bg-slate-100" @click="emit('decrease', props.item.id)">-</button>
      <span class="min-w-7 text-center text-sm font-semibold">{{ props.item.quantity }}</span>
      <button class="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-700 hover:bg-slate-100" @click="emit('increase', props.item.id)">+</button>
      <button class="ml-2 rounded-md border border-red-200 px-2 py-1 text-sm text-red-600 hover:bg-red-50" @click="emit('remove', props.item.id)">Remove</button>
    </div>
  </article>
</template>
