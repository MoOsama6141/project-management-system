import React, { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../../../app/store/theme.store";
import ProfileDropdown from "@/components/ProfileDropdown";

const Navbar: React.FC = () => {
  const darkMode = useThemeStore((s) => s.darkMode);
  const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav
      style={{ background: "var(--surface)", color: "var(--text)" }}
      className="w-full shadow px-4 py-3"
    >
      <div className="w-full mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {darkMode ? (
                        <img src="/logo.png" alt="PMS Logo" className="h-11 w-40 mr-3" />

          ) : (
            <img src="/2.png" alt="PMS Logo" className="h-11 w-40 mr-3" />
          )}
            </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full transition"
            style={{ background: "transparent" }}
          >
            {!darkMode ? (
              <Moon style={{ color: "var(--accent-green)" }} size={18} />
            ) : (
              <Sun style={{ color: "var(--accent-orange)" }} size={18} />
            )}
          </button>

          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
