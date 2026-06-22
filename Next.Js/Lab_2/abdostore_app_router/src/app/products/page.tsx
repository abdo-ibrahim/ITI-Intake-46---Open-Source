import Link from 'next/link';
import { IProduct } from '@/models/Product';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export default async function ProductsPage() {
  const products: IProduct[] = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Our Products</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-slate-100">
            <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">{product.title}</h3>
                <span className="font-bold text-emerald-600 ml-2">${product.price}</span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>
              <div className="flex items-center text-sm text-amber-500 font-medium">
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.rating.toFixed(1)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
