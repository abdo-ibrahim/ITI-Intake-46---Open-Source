<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import ProductHeroCard from "../components/product-details/ProductHeroCard.vue";
import ProductList from "../components/utils/ProductList.vue";
import { useProductsStore } from "../store/productsStore";
import { storeToRefs } from "pinia";

const route = useRoute();

const productStore = useProductsStore();
const { fetchAllProducts, getProductById } = productStore;
const { featuredProduct, relatedProducts } = storeToRefs(productStore);

onMounted(async () => {
  console.log(`ProductView mounted for ID: ${route.params.id}`);
  await fetchAllProducts();
  await getProductById(Number(route.params.id));
});

onUnmounted(() => {
  console.log("ProductView unmounted");
});

watch(
  () => route.params.id,
  async () => {
    await getProductById(Number(route.params.id));
  },
);
</script>

<template>
  <section class="grid gap-6">
    <ProductHeroCard v-if="featuredProduct" :product="featuredProduct" />
    <p v-else class="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 flex items-center justify-center h-[47vh]">Product not found.</p>

    <ProductList :products="relatedProducts" :section-title="'Related Products'" />
  </section>
</template>
