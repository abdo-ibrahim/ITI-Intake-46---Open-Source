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

const emit = defineEmits(["buy"]);

const buyClickHandler = (id: number) => {
  console.log("Buying from the button clicked, product id: ", id);
  emit("buy", id);
};
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center md:items-start gap-6">
      <div>
        <img :src="props.product.image" :alt="props.product.name" class="w-full max-w-[360px] rounded-xl object-cover mx-auto md:mx-0" />
      </div>
      <div>
        <span v-show="props.product.badge !== ''" class="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">{{ getCTABadge }}</span>
        <h3 class="mt-2 mb-2 text-2xl md:text-3xl text-slate-900 font-semibold">{{ props.product.name }}</h3>
        <p class="text-slate-600 leading-7">{{ props.product.description }}</p>
        <div class="mt-2 space-y-1">
          <p :class="getDiscountClass">${{ props.product.price.toFixed(2) }}</p>
          <p v-if="props.product.discount > 0" class="text-lg font-semibold text-slate-900">${{ discountedPrice.toFixed(2) }}</p>
        </div>

        <ul class="list-none m-0 mt-3 p-0 flex flex-wrap gap-2">
          <li v-for="tag in props.product.tags" :key="tag" class="px-2 py-1 text-xs text-slate-700 border border-slate-300 rounded-full">
            {{ tag }}
          </li>
        </ul>
        <button :disabled="props.product.stock === 0" :class="getCTAClass" class="mt-4" @click="buyClickHandler(props.product.id)">
          {{ props.product.stock === 0 ? "Out of Stock" : "Buy Now" }}
        </button>
      </div>
    </div>
  </div>
</template>
