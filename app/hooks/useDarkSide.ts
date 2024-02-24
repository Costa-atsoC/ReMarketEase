import { useState, useEffect } from "react";

export default function useDarkSide() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return "dark";
    }
  });

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage === "undefined"
    ) {
      console.warn("localStorage is not available.");
      return;
    }

    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
