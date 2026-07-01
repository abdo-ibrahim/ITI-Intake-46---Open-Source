import { defineStore } from "pinia";
import { useLocalStorage } from "../composables/useLocalStorage";
import type { cartItemProps, productProps } from "../types/types";
import { computed } from "vue";
export const useCartStore = defineStore("cart", () => {
  const cartItems = useLocalStorage("cartItems", [] as cartItemProps[]);

  const addToCart = (product: productProps) => {
    const existing = cartItems.value.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  };

  const increaseQuantity = (id: number) => {
    const existing = cartItems.value.find((p) => p.id === id);
    if (!existing) return;
    existing.quantity += 1;
  };

  const decreaseQuantity = (id: number) => {
    const existing = cartItems.value.find((p) => p.id === id);
    if (!existing) return;

    if (existing.quantity <= 1) {
      cartItems.value = cartItems.value.filter((p) => p.id !== id);
      return;
    }

    existing.quantity -= 1;
  };

  const removeFromCart = (id: number) => {
    cartItems.value = cartItems.value.filter((p) => p.id !== id);
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, product) => {
      const unitPrice = product.price - (product.price * product.discount) / 100;
      return total + unitPrice * product.quantity;
    }, 0);
  });

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, product) => total + product.quantity, 0);
  });

  return {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
    clearCart,
  };
});
