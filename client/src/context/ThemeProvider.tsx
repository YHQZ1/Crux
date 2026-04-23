import { useState, useEffect, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    // Disable all transitions instantly
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // Kill transitions before toggle
    document.documentElement.style.setProperty("transition", "none");
    document.documentElement.querySelectorAll("*").forEach((el) => {
      (el as HTMLElement).style &&
        ((el as HTMLElement).style.transition = "none");
    });
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    // Re-enable after paint
    requestAnimationFrame(() => {
      document.documentElement.style.removeProperty("transition");
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
