import React, { useEffect } from "react";
import { useThemeStore } from "../store/theme.store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useThemeStore((s) => s.darkMode);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="theme-provider min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default ThemeProvider;
