import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t mt-12 ">
      <div className="container mx-auto py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Store. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/" className="mx-2 hover:underline ">
            Home
          </Link>
          <Link to="/about" className="mx-2 hover:underline ">
            About
          </Link>
          <Link to="/cart" className="mx-2 hover:underline ">
            Cart
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
