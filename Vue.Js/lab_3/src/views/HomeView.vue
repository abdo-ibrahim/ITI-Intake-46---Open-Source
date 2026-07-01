<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import CarouselBanner from "../components/home/CarouselBanner.vue";
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
  console.log(`HomeView mounted — ${products.value.length} products loaded`);
});

onUnmounted(() => {
  console.log("HomeView unmounted");
});
</script>

<template>
  <div class="home-carousel-bleed">
    <CarouselBanner />
  </div>
  <ProductList :products="products" :section-title="'Featured Products'" />
</template>

<style scoped>
.home-carousel-bleed {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
}
</style>
