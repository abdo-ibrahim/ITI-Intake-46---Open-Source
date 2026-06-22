import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
        Welcome to <span className="text-blue-600">AbdoStore</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mb-10 leading-relaxed">Discover the best products at unbeatable prices. Experience fast shipping, premium quality, and top-notch customer service.</p>
      <Link href="/products" className="px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-full hover:bg-gray-800 transition-transform transform hover:scale-105 shadow-xl">
        Start Shopping →
      </Link>
    </div>
  );
}
