import { useThemeStore } from "@/stores/useThemeStore";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/stores/hook";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { language, toggleLanguage } = useLanguage();

  const content = {
    title: language === "en" ? "Store" : "المتجر",
    home: language === "en" ? "Home" : "الرئيسية",
    about: language === "en" ? "About" : "من نحن",
    cart: language === "en" ? "Cart" : "السلة",
    langBtn: language === "en" ? "AR" : "EN",
    register: language === "en" ? "Register" : "انشاء حساب",
  };

  return (
    <header className="shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="text-2xl font-extrabold ">
          {content.title}
        </Link>

        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-sm hover:underline">
            {content.home}
          </Link>
          <Link to="/about" className="text-sm hover:underline">
            {content.about}
          </Link>

          <Link to="/cart" className="relative inline-flex items-center p-2 rounded-md hover:bg-gray-100">
            <ShoppingCart className="h-4 w-4" />

            <span className="sr-only">{content.cart}</span>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">{cartItems?.length ?? 0}</span>
          </Link>

          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          <Button variant="outline" onClick={toggleLanguage}>
            {content.langBtn}
          </Button>
          <Link to="/register">
            <Button>{content.register}</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
