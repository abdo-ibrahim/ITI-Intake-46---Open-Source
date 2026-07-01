interface productProps {
  id: number;
  name: string;
  description: string;
  image: string;
  badge: string;
  price: number;
  discount: number;
  tags: string[];
  stock : number;
}

export type { productProps };
