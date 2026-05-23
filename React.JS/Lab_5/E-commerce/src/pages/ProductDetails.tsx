import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { SkeletonCard } from "@/components/SkeletonCard";
import type { IProduct } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import api from "@/api/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error || !product) {
    return <div className="max-w-4xl mx-auto p-8 text-center text-red-600">{error ?? "Product not found."}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Button variant="default" className="px-6 py-3 mb-3 flex items-center" onClick={() => navigate(`/`)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          <img src={product.image} alt={product.title} className="max-h-[520px] w-full object-contain rounded-lg shadow-md" />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">{product.category}</span>
            <div className="flex items-center text-sm text-yellow-500">
              <Star className="h-5 w-5" />
              <span className="text-gray-800 font-medium">{product.rating?.rate ?? "-"}</span>
              <span className="text-gray-500 ml-2">({product.rating?.count ?? 0})</span>
            </div>
          </div>

          <p className="text-3xl font-extrabold text-gray-900">${product.price.toFixed(2)}</p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <Button className="px-6 py-3">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
