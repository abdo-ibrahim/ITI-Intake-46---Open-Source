import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { IProduct } from "@/types/types";
import { Star } from "lucide-react";

const ProductCard = ({ product }: { product: IProduct }) => {
  const isPremium = product.price > 100;
  const badgeLabel = isPremium ? "Premium" : "Best Seller";
  const badgeColor = isPremium ? "bg-blue-600" : "bg-green-600";

  return (
    <Card className="mx-auto flex w-full max-w-sm flex-col overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="group relative aspect-video w-full overflow-hidden bg-muted">
        <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-300 group-hover:bg-transparent" />

        <div className="absolute left-3 top-3 z-20">
          <Badge variant="secondary" className="bg-background/80 font-medium backdrop-blur-md">
            {product.category}
          </Badge>
        </div>

        <div className="absolute right-3 top-3 z-20">
          <Badge className={`${badgeColor} text-white font-medium border-none shadow-sm`}>{badgeLabel}</Badge>
        </div>

        <img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <CardHeader className="flex-1 space-y-3">
        <CardTitle className="line-clamp-1 text-lg" title={product.title}>
          {product.title}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm">{product.description}</CardDescription>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span>{product.rating.rate.toFixed(1)}</span>
            <span className="font-normal text-muted-foreground text-xs">({product.rating.count})</span>
          </div>

          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
      </CardHeader>

      <CardFooter className="pt-0">
        <Button className="w-full py-5 transition-transform active:scale-[0.98]">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
