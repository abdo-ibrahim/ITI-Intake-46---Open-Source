<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import CarouselBanner from "../components/home/CarouselBanner.vue";
import ProductList from "../components/utils/ProductList.vue";
import type { productProps } from "../types/types";

const props = defineProps<{
  products: productProps[];
}>();

onMounted(() => {
  console.log(`HomeView mounted — ${props.products.length} products loaded`);
});

onUnmounted(() => {
  console.log("HomeView unmounted");
});

const handleBuy = (id: number) => {
  const product = props.products.find((item) => item.id === id);

  if (product && product.stock > 0) {
    product.stock -= 1;
  }
};
</script>

<template>
  <div class="home-carousel-bleed">
    <CarouselBanner />
  </div>
  <ProductList :products="props.products" :section-title="'Featured Products'" @buy="handleBuy" />
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
