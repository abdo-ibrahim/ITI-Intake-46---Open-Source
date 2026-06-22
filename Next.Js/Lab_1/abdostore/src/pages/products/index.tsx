import { useState, useTransition, useDeferredValue } from "react";
import { GetStaticProps } from "next";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import SortDropdown from "@/components/SortDropdown";
import { Product } from "@/types/index";

export default function ProductsPage({ products = [] }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const deferredSearch = useDeferredValue(search);
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="max-w-7xl mx-auto py-6">
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

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 ${isPending || search !== deferredSearch ? "opacity-50" : "opacity-100"}`}>
        {filtered.length > 0 ? (
          filtered.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-xl text-gray-500 font-semibold">No products match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=85");
  const data = await res.json();

  return {
    props: {
      products: data.products || [],
    },
  };
};
