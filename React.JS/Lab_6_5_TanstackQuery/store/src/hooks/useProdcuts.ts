import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "@/api/products.api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};
