<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  badge: string;
  price: number;
  discount: number;
  tags: string[];
  isAvailable: boolean;
}

const props = defineProps<{
  product: Product;
}>();

import { computed } from "vue";

const discountedPrice = computed(() => {
  return props.product.price - (props.product.price * props.product.discount) / 100;
});

const getDiscountClass = computed(() => {
  return props.product.discount > 0 ? "line-through" : "";
});
const getCTAClass = computed(() => {
  return props.product.isAvailable ? "btn-primary" : "btn-error";
});

const getCTABadge = computed(() => {
  if (props.product.isAvailable) {
    return props.product.badge;
  } else {
    return "Out of Stock";
  }
});
</script>
<template>
  <div class="flex flex-col gap-3 p-4 border border-slate-200 rounded-xl bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition duration-200">
    <img :src="props.product.image" :alt="props.product.name" class="w-full h-44 object-cover rounded-lg" />
    <span v-show="props.product.badge !== ''" class="inline-flex w-fit items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">{{ getCTABadge }}</span>
    <h3 class="m-0 text-lg text-slate-900 font-semibold">{{ props.product.name }}</h3>
    <p class="m-0 text-slate-600 leading-6">{{ props.product.description }}</p>
    <div class="space-y-1">
      <p :class="getDiscountClass">${{ props.product.price.toFixed(2) }}</p>
      <p v-if="props.product.discount > 0" class="text-slate-900 font-semibold">${{ discountedPrice.toFixed(2) }}</p>
    </div>

    <ul class="list-none m-0 p-0 flex flex-wrap gap-2">
      <li v-for="tag in props.product.tags" :key="tag" class="px-2 py-1 text-xs text-slate-700 border border-slate-300 rounded-full">
        {{ tag }}
      </li>
    </ul>
    <button :disabled="!props.product.isAvailable" :class="getCTAClass" class="mt-1">Buy Now</button>
  </div>
</template>
