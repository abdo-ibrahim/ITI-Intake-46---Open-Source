import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

type NavLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  links: NavLink[];
  isDark: boolean;
  onToggleTheme: () => void;
};

function Navbar({ links, isDark, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
      <Container className="flex h-16 items-center justify-between">
        <a href="#hero" className="font-[Space_Grotesk] text-lg font-bold tracking-wide text-slate-900 dark:text-slate-100">
          Abdulrahman.dev
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">
              {link.label}
            </a>
          ))}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button type="button" onClick={() => setOpen((prev) => !prev)} className="rounded-lg border border-slate-300 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200" aria-label="Toggle menu" aria-expanded={open}>
            {open ? <HiXMark size={18} /> : <HiBars3 size={18} />}
          </button>
        </div>
      </Container>

      {open ? (
        <nav className="border-t border-slate-200 bg-white/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <Container>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

export default Navbar;
