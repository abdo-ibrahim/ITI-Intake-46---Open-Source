import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              AbdoStore
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white transition-colors">
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
