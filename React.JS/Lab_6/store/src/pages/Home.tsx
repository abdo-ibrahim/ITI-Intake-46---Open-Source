import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import type { IProduct } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router";
import api from "@/api/api";

const CATEGORIES = ["jewelery", "electronics", "men's clothing", "women's clothing"];

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<IProduct[]>("/products");
        setProducts(response.data);
      } catch {
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getAllProducts();
  }, []);

  const [searchParams] = useSearchParams();

  const categoryQuery = searchParams.get("category") || "";

  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    if (!category || category.toLowerCase() === categoryQuery.toLowerCase()) {
      navigate(`/`);
      return;
    }
    navigate(`/?category=${encodeURIComponent(category)}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;

    const matchesCategory = categoryQuery ? product.category.toLowerCase() === categoryQuery.toLowerCase() : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="max-w-md mx-auto my-6">
        <Input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-12" />
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <Button onClick={() => handleCategoryClick("")} className={`px-4 py-2 cursor-pointer ${!categoryQuery ? "bg-blue-500 text-white" : "hover:bg-black/70"}`}>
          All Products
        </Button>
        {CATEGORIES.map((category) => {
          const active = category.toLowerCase() === categoryQuery.toLowerCase();
          return (
            <Button key={category} onClick={() => handleCategoryClick(category)} className={`px-4 py-2 cursor-pointer ${active ? "bg-blue-500 text-white" : "hover:bg-black/70"}`}>
              {category}
            </Button>
          );
        })}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-80 w-full rounded-md" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-600 py-10">{error}</p>
      ) : (
        <>
          {categoryQuery ? (
            <p className="text-gray-500 mb-4">
              Showing results for category: <span className="font-semibold">{categoryQuery}</span>
            </p>
          ) : (
            <p className="text-gray-500 mb-4">Showing results for All Products</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center py-10 text-gray-500">
                No products found{searchTerm ? ` for "${searchTerm}"` : ""}
                {categoryQuery ? ` in category "${categoryQuery}"` : ""}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
