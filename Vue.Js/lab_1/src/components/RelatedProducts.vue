<script setup lang="ts">
import ProductCard from "./ProductCard.vue";

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
  products: Product[];
}>();
</script>

<template>
  <section class="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
    <h2 class="m-0 mb-4 text-slate-900 text-xl font-semibold">Related Products</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
