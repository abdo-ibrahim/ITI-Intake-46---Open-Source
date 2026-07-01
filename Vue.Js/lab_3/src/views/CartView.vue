<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../store/cartStore";
import { storeToRefs } from "pinia";
import CartItem from "../components/utils/CartItem.vue";

const cartStore = useCartStore();
const { cartItems, totalItems, totalPrice } = storeToRefs(cartStore);
const { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartStore;

const isEmpty = computed(() => cartItems.value.length === 0);
</script>

<template>
  <section class="space-y-5">
    <header class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-2xl font-semibold text-slate-900">Your Cart</h1>
      <p class="mt-1 text-slate-600">Review items and update quantities before checkout.</p>
    </header>

    <div v-if="isEmpty" class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">Your cart is empty.</div>

    <template v-else>
      <div class="grid gap-3">
        <CartItem v-for="item in cartItems" :key="item.id" :item="item" @increase="increaseQuantity" @decrease="decreaseQuantity" @remove="removeFromCart" />
      </div>

      <aside class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between text-slate-700">
          <span>Total items</span>
          <strong>{{ totalItems }}</strong>
        </div>
        <div class="mt-2 flex items-center justify-between text-lg text-slate-900">
          <span>Total price</span>
          <strong>${{ totalPrice.toFixed(2) }}</strong>
        </div>
        <button class="btn-error mt-4" @click="clearCart">Clear Cart</button>
      </aside>
    </template>
  </section>
</template>
