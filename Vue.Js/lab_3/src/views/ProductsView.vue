<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import ProductList from "../components/utils/ProductList.vue";
import { useProductsStore } from "../store/productsStore";
import { storeToRefs } from "pinia";

const productsStore = useProductsStore();
const { fetchAllProducts } = productsStore;
const { products } = storeToRefs(productsStore);

onMounted(async () => {
  if (products.value.length === 0) {
    await fetchAllProducts();
  }
  console.log("ProductsView mounted");
});

onUnmounted(() => {
  console.log("ProductsView unmounted");
});
</script>

<template>
  <ProductList :products="products" :section-title="'All Products'" />
</template>
