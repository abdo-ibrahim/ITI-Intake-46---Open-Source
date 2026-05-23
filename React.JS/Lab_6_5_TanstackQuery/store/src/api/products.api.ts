import api from "./axios";
import type { IProduct } from "@/types/types";

export const fetchProducts = async (): Promise<IProduct[]> => {
  const { data } = await api.get("/products");
  return data;
};

export const fetchProductById = async (id: string): Promise<IProduct> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
