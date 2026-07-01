import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { productProps } from "../types/types";
import { useApi } from "../composables/useApi";

export const useProductsStore = defineStore("products", () => {
  const productsApi = useApi<productProps[]>("http://localhost:3000/products");
  const productApi = useApi<productProps>("http://localhost:3000/products");

  // states
  const products = ref<productProps[]>([]);
  const featuredProduct = ref<productProps | null>(null);
  const relatedProducts = computed(() => products.value.filter((p) => p.id !== featuredProduct.value?.id));

  // actions
  const fetchAllProducts = async () => {
    try {
      const result = await productsApi.getAll();
      products.value = result;
    } catch (e) {
      console.error("Fetch all failed:", e);
    }
  };

  const getProductById = async (id: number) => {
    try {
      const result = await productApi.getOne(id);
      featuredProduct.value = result;
      return result;
    } catch (e) {
      console.error("Fetch one failed:", e);
    }
  };

  const decreaseStock = async (id: number) => {
    const product = products.value.find((p) => p.id === id);
    if (!product || product.stock <= 0) return;
    const updated = { ...product, stock: product.stock - 1 };
    try {
      await productApi.update(id, updated);
      product.stock -= 1;
    } catch (e) {
      console.error("Update failed:", e);
    }
  };

  return {
    // states
    products,
    featuredProduct,
    relatedProducts,
    isLoading: productsApi.isLoading || productApi.isLoading,
    isError: productsApi.isError || productApi.isError,

    // actions
    fetchAllProducts,
    getProductById,
    decreaseStock,
  };
});
