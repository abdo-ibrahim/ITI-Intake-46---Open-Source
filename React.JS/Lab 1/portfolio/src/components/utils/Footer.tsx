import { Button } from "../ui/button";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-10 flex flex-col items-center text-center gap-8">
      <div className="space-y-2">
        <p className="font-bold tracking-widest text-sm uppercase">Get In Touch</p>
        <p className="text-gray-400">abdulrahman@gmail.com</p>
      </div>

      <Button variant="default" className="border-white text-white hover:bg-white hover:text-black px-10 py-6 transition-all">
        CONTACT ME
      </Button>

      <div className="flex items-center gap-8">
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors">
          <FaLinkedinIn size={22} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors">
          <FaFacebookF size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors">
          <FaTwitter size={22} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors">
          <FaInstagram size={22} />
        </a>
      </div>

      <div className="text-gray-500 text-[10px] mt-4 tracking-widest uppercase">Copyright © 2026 Abdulrahman Ibrahim</div>
    </footer>
  );
}
