import { useEffect } from "react";
import { useUiStore } from "../store/uiStore";

export const useTheme = () => {
  const { theme, toggleTheme } = useUiStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return { theme, toggleTheme, isDark: theme === "dark" };
};
