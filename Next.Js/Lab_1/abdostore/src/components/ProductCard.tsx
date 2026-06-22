import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/index";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group flex h-full">
      <div className="flex flex-col w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
        
        <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
          <Image 
            src={product.thumbnail} 
            alt={product.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-lg font-bold text-gray-900 truncate mb-1">
            {product.title}
          </h2>
          
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
            {product.description}
          </p>
          
          <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
            <span className="text-xl font-black text-gray-900">
              ${product.price}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 text-sm font-semibold rounded-md">
              <span className="text-yellow-500">★</span> 
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}