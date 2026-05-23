import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="text-2xl font-extrabold text-gray-800">
          Store
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-sm text-gray-700 hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-sm text-gray-700 hover:underline">
            About
          </Link>

          <Link to="/cart" className="relative inline-flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m12-6l2 6m-6-6v6" />
            </svg>
            <span className="sr-only">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
