import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-black tracking-tighter text-indigo-600">
            ABDO<span className="text-gray-900">STORE</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link 
                key={link.path}
                href={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  router.pathname === link.path 
                    ? "text-indigo-600" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Hi, {session.user?.name || session.user?.email}
                </span>
                <button 
                  onClick={() => signOut()} 
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signIn()} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
