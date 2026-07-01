<script setup lang="ts">
import type { productProps } from "../../types/types";
import ProductCard from "./ProductCard.vue";

const props = defineProps<{
  products: productProps[];
  sectionTitle: string;
}>();

</script>

<template>
  <section class="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
    <h2 class="m-0 mb-4 text-slate-900 text-xl font-semibold">{{ props.sectionTitle }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard v-for="product in props.products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
