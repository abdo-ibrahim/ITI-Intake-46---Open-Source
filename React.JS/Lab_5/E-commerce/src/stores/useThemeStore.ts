import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);

      return { theme: newTheme };
    }),
}));
