import Container from "../components/Container";

function Footer() {
  return (
    <footer className="border-t border-slate-200/70 py-6 dark:border-slate-800/70">
      <Container className="text-center text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Abdulrahman Ibrahim. Crafted with React, Tailwind, and Framer Motion.</Container>
    </footer>
  );
}

export default Footer;
