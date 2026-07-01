<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import ProductList from "../components/utils/ProductList.vue";
import type { productProps } from "../types/types";

const props = defineProps<{
  products: productProps[];
}>();

onMounted(() => {
  console.log("ProductsView mounted");
});

onUnmounted(() => {
  console.log("ProductsView unmounted");
});

const handleBuy = (id: number) => {
  const product = props.products.find((item) => item.id === id);

  if (product && product.stock > 0) {
    product.stock -= 1;
  }
};
</script>

<template>
  <ProductList :products="props.products" :section-title="'All Products'" @buy="handleBuy" />
</template>
