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
interface cartItemProps extends productProps {
  quantity: number;
}
export type { productProps, cartItemProps };
