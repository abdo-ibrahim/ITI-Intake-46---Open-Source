import { GetStaticPaths, GetStaticProps } from "next";
import { Product } from "@/types";
import ProductGallery from "@/components/ProductGallery";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const imagesToPass = product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="min-h-[80vh] bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2 gap-8 p-6 md:p-10">
        <ProductGallery images={imagesToPass} title={product.title} />

        <div className="flex flex-col gap-6 justify-center">
          <div>
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{product.brand || product.category.replace("-", " ")}</span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{product.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="font-bold text-yellow-700">{product.rating.toFixed(1)}</span>
            </div>
            {product.stock !== undefined && (
              <span className={`text-sm font-semibold px-3 py-1.5 rounded-lg ${product.stock > 0 ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-4">
            <p className="text-5xl font-black text-gray-900">${product.price}</p>
            {product.discountPercentage && <p className="text-lg text-gray-400 line-through font-semibold">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</p>}
          </div>

          <p className="text-lg text-gray-600 leading-relaxed border-t border-b border-gray-100 py-6">{product.description}</p>

          <button className="w-full mt-auto bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-transform transform hover:-translate-y-1 shadow-lg active:scale-95">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://dummyjson.com/products/${params?.id}`);
  const product = await res.json();
  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
