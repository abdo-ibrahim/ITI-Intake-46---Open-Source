export interface Product {
  id: number;
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
