import { useState, useTransition, useDeferredValue, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import SortDropdown from "@/components/SortDropdown";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/types/index";
import dbConnect from "@/lib/mongoose";
import { Product as ProductModel } from "@/models/Product";

export default function ProductsPage({ products = [], quote }: { products: Product[]; quote: string }) {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const deferredSearch = useDeferredValue(search);
  const [isPending, startTransition] = useTransition();

  // Show quote toast on mount
  useEffect(() => {
    if (quote) {
      toast(quote, { id: "quote-toast", icon: "💬", duration: 5000 });
    }
  }, [quote]);

  const categories = Array.from(new Set(products.map((p) => p.category)));
  let filtered = [...products];

  if (deferredSearch) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(deferredSearch.toLowerCase()));
  }
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (sort === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted");
        window.location.reload();
      } else {
        toast.error("Failed to delete");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        {session && (
          <button
            onClick={() => {
              setEditingProduct(undefined);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">
            + Add Product
          </button>
        )}
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div className="flex-1">
          <FilterBar categories={categories} value={category} onChange={(v) => startTransition(() => setCategory(v))} />
        </div>
        <div className="shrink-0 w-full lg:w-auto">
          <SortDropdown value={sort} onChange={(v) => startTransition(() => setSort(v))} />
        </div>
      </div>

      {(isPending || search !== deferredSearch) && <p className="text-gray-500 mb-4 animate-pulse">Updating results...</p>}

      {!session && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded">
          <p>You are not logged in. Showing limited products (1 row). Log in to view all products and perform CRUD operations.</p>
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 ${isPending || search !== deferredSearch ? "opacity-50" : "opacity-100"}`}>
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p.id} className="relative group">
              <ProductCard product={p} />
              {session && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setIsModalOpen(true);
                    }}
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-50">
                    ✎
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="bg-white text-red-600 p-2 rounded-full shadow hover:bg-red-50">
                    🗑
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-xl text-gray-500 font-semibold">No products available.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10">
              ✕
            </button>
            <ProductForm product={editingProduct} onSuccess={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const quoteRes = await fetch("https://dummyjson.com/quotes/random");
  const quoteData = await quoteRes.json();
  const quote = `"${quoteData.quote}" - ${quoteData.author}`;

  await dbConnect();
  const docs = await ProductModel.find({})
    .limit(session ? 0 : 4)
    .lean();
  let products = docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    id: doc._id.toString(),
  }));

  if (products.length === 0) {
    const res = await fetch(`https://dummyjson.com/products?limit=${session ? 85 : 4}`);
    const data = await res.json();
    products = data.products || [];
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      quote,
    },
  };
};
