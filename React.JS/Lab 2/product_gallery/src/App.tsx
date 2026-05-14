import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import type { IProduct } from "./types/types";
import { Skeleton } from "./components/ui/skeleton";
import { Input } from "./components/ui/input";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const data: IProduct[] = await response.json();
        setProducts(data);
      } catch {
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getAllProducts();
  }, []);

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Products Gallery</h1>

        <div className="max-w-md mx-auto">
          <Input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-12" />
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-80 w-full rounded-md" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-600 py-10">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && <p className="col-span-full text-center py-10 text-gray-500">No products found for "{searchTerm}"</p>}
        </div>
      )}
    </div>
  );
}

export default App;
