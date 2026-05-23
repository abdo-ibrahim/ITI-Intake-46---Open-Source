import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t mt-12 bg-white">
      <div className="container mx-auto py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Store. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/" className="mx-2 hover:underline text-gray-600">
            Home
          </Link>
          <Link to="/about" className="mx-2 hover:underline text-gray-600">
            About
          </Link>
          <Link to="/cart" className="mx-2 hover:underline text-gray-600">
            Cart
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
