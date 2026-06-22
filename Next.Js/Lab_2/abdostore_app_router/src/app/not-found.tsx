import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
        404
      </h1>
      <h2 className="text-2xl mt-4 mb-8 font-semibold">Page Not Found</h2>
      <p className="text-slate-400 mb-8">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
