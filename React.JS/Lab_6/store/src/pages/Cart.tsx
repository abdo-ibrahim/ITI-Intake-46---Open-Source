import { useAppSelector, useAppDispatch } from "@/stores/hook";
import { removeFromCart } from "@/stores/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <Card key={`${item.id}-${index}`} className="flex flex-row items-center p-4 gap-6">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-md border p-1" />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                <p className="text-primary font-bold text-lg mt-1">${item.price.toFixed(2)}</p>
              </div>

              <Button variant="ghost" size="icon" onClick={() => dispatch(removeFromCart(item.id))} className="text-destructive hover:bg-destructive/10 shrink-0">
                <Trash2 className="w-5 h-5" />
              </Button>
            </Card>
          ))}
        </div>

        <Card className="h-fit p-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
