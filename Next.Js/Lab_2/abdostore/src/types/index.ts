export interface Product {
  id: number | string;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  images: string[];
  brand?: string;
  stock?: number;
  discountPercentage?: number;
}
