<script setup lang="ts">
import { ref } from "vue";
import NavBar from "./components/utils/NavBar.vue";
import Footer from "./components/utils/Footer.vue";

const products = ref([
  {
    id: 1,
    name: "Cozy Sneakers",
    description: "High-quality sneakers that go with everything you wear.",
    image: "https://picsum.photos/id/1/400/400",
    badge: "",
    price: 90,
    discount: 10,
    tags: ["Fashion", "Casual", "Sport"],
    stock: 10,
  },
  {
    id: 2,
    name: "Elegant Watch",
    description: "A timeless piece that adds sophistication to any outfit.",
    image: "https://picsum.photos/id/2/400/400",
    badge: "SALE",
    price: 150,
    discount: 0,
    tags: ["Accessories", "Luxury", "Gift"],
    stock: 5,
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
    stock: 2,
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
    stock: 8,
  },
]);
</script>
<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden">
    <NavBar :products="products" />
    <main class="w-[min(1100px,92vw)] mx-auto my-6 md:my-8 grid gap-5 md:gap-8">
      <RouterView :products="products" />
    </main>
    <Footer />
  </div>
</template>
