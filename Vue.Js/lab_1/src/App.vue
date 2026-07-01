<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { reactive, ref } from "vue";
import ProductDetails from "./components/ProductDetails.vue";
import RelatedProducts from "./components/RelatedProducts.vue";

const mainProduct = reactive({
  id: 1,
  name: "Cozy Sneakers",
  description: "High-quality sneakers that go with everything you wear.",
  image: "https://picsum.photos/id/1/400/400",
  badge: "",
  price: 90,
  discount: 10,
  tags: ["Fashion", "Casual", "Sport"],
  isAvailable: true,
});

const relatedProducts = ref([
  {
    id: 2,
    name: "Elegant Watch",
    description: "A timeless piece that adds sophistication to any outfit.",
    image: "https://picsum.photos/id/2/400/400",
    badge: "SALE",
    price: 150,
    discount: 0,
    tags: ["Accessories", "Luxury", "Gift"],
    isAvailable: true,
  },
  {
    id: 3,
    name: "Stylish Backpack",
    description: "A versatile backpack perfect for work, travel, or school.",
    image: "https://picsum.photos/id/3/400/400",
    badge: "HOT",
    price: 30,
    discount: 50,
    tags: ["Bags", "Travel", "Everyday"],
    isAvailable: false,
  },
  {
    id: 4,
    name: "Trendy Sunglasses",
    description: "Protect your eyes in style with these trendy sunglasses.",
    image: "https://picsum.photos/id/4/400/400",
    badge: "NEW",
    price: 60,
    discount: 10,
    tags: ["Accessories", "Summer", "Fashion"],
    isAvailable: true,
  },
]);
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="w-[min(1100px,92vw)] mx-auto my-6 md:my-8 grid gap-5 md:gap-8">
      <ProductDetails :product="mainProduct" />
      <RelatedProducts :products="relatedProducts" />
    </main>
    <Footer />
  </div>
</template>
