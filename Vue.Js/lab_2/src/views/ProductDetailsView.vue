<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ProductHeroCard from "../components/product-details/ProductHeroCard.vue";
import type { productProps } from "../types/types";
import ProductList from "../components/utils/ProductList.vue";

const props = defineProps<{
  products: productProps[];
}>();
const route = useRoute();

const featuredProduct = ref<productProps | null>(null);
const relatedProducts = ref<productProps[]>([]);

const updateProducts = () => {
  const idParam = Number(route.params.id);
  featuredProduct.value = props.products.find((product) => product.id === idParam) ?? null;
  relatedProducts.value = props.products.filter((product) => product.id !== idParam);
};

const decreaseStock = (id: number) => {
  const product = props.products.find((item) => item.id === id);
  if (!product) {
    return;
  }
  if (product.stock > 0) {
    product.stock -= 1;
  }
};

onMounted(() => {
  console.log(`ProductView mounted for ID: ${route.params.id}`);
});

onUnmounted(() => {
  console.log("ProductView unmounted");
});

watch(
  () => route.params.id,
  () => {
    updateProducts();
  },
  { immediate: true }
);
</script>

<template>
  <section class="grid gap-6">
    <ProductHeroCard v-if="featuredProduct" :product="featuredProduct" @buy="decreaseStock" />
    <p v-else class="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 flex items-center justify-center h-[47vh]">Product not found.</p>

    <ProductList :products="relatedProducts" :section-title="'Related Products'" @buy="decreaseStock" />
  </section>
</template>
