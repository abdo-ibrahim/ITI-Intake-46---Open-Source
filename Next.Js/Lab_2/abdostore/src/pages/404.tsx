import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! This page could not be found.</p>
      <Link href="/products" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Go back to Products
      </Link>
    </div>
  );
}
