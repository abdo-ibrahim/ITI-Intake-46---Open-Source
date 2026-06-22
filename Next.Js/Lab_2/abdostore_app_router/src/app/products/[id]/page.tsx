import { IProduct } from "@/models/Product";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product: IProduct | null = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-slate-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <img src={product.thumbnail} alt={product.title} className="w-full max-w-md object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-blue-600 font-bold mb-2">
              {product.brand} • {product.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{product.title}</h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center text-amber-500 font-medium bg-amber-50 px-3 py-1 rounded-full mr-4">
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.rating.toFixed(1)}
              </div>
              <span className="text-slate-500 text-sm">{product.stock} in stock</span>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">{product.description}</p>

            <div className="flex flex-wrap items-end gap-4 mb-8">
              <span className="text-5xl font-extrabold text-slate-900">${product.price}</span>
              {product.discountPercentage > 0 && (
                <div className="flex flex-col">
                  <span className="text-lg text-slate-400 line-through mb-1">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                  <span className="text-sm font-bold text-red-500">Save {Math.round(product.discountPercentage)}%</span>
                </div>
              )}
            </div>

            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl active:scale-[0.98]">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
