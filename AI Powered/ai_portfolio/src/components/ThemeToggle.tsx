import { HiMoon, HiSun } from "react-icons/hi2";

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}>
      {isDark ? <HiSun size={16} /> : <HiMoon size={16} />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;
