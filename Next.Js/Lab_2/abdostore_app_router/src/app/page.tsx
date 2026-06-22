import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">AbdoStore</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 mb-10">
            Discover our amazing collection of products fetched from MongoDB and dummyjson. Built with Next.js App Router and Tailwind CSS.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30"
            >
              Browse Products
            </Link>
            <Link
              href="/not-found-test"
              className="px-8 py-4 text-lg font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
            >
              Test 404 Page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
