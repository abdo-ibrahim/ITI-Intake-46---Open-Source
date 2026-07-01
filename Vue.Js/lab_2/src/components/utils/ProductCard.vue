<script setup lang="ts">
import { computed } from "vue";
import type { productProps } from "../../types/types";

const props = defineProps<{
  product: productProps;
}>();

const discountedPrice = computed(() => {
  return props.product.price - (props.product.price * props.product.discount) / 100;
});

const getDiscountClass = computed(() => {
  return props.product.discount > 0 ? "line-through" : "";
});
const getCTAClass = computed(() => {
  return props.product.stock > 0 ? "btn-primary" : "btn-error";
});

const getCTABadge = computed(() => {
  if (props.product.stock > 0) {
    return props.product.badge;
  } else {
    return "Out of Stock";
  }
});

const emit = defineEmits<{
  (event: "buy", productId: number): void;
}>();

const handleBuy = () => {
  emit("buy", props.product.id);
};
</script>
<template>
  <article class="flex flex-col gap-3 p-4 border border-slate-200 rounded-xl bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition duration-200">
    <RouterLink :to="`/products/${props.product.id}`" class="block">
      <div class="relative">
        <img :src="props.product.image" :alt="props.product.name" class="w-full h-44 object-cover rounded-lg" />
        <span v-show="props.product.badge !== ''" class="absolute left-2 top-2 inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">{{ getCTABadge }}</span>
      </div>
      <h3 class="m-0 mt-3 text-lg text-slate-900 font-semibold">{{ props.product.name }}</h3>
    </RouterLink>

    <p class="m-0 text-slate-600 leading-6">{{ props.product.description }}</p>
    <div class="space-y-1 flex items-center gap-2">
      <p :class="getDiscountClass">${{ props.product.price.toFixed(2) }}</p>
      <p v-if="props.product.discount > 0" class="text-slate-900 font-semibold">${{ discountedPrice.toFixed(2) }}</p>
    </div>

    <ul class="list-none m-0 p-0 flex flex-wrap gap-2">
      <li v-for="tag in props.product.tags" :key="tag" class="px-2 py-1 text-xs text-slate-700 border border-slate-300 rounded-full">
        {{ tag }}
      </li>
    </ul>

    <button :disabled="props.product.stock <= 0" :class="getCTAClass" class="mt-1" @click="handleBuy">Buy Now</button>
  </article>
</template>
