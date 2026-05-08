"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeCtx {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({
  theme: "system",
  resolved: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(Ctx);
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.setAttribute("data-theme", isDark ? "dark" : "light");
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  // Read stored preference once on mount
  useEffect(() => {
    const stored = localStorage.getItem("trialfind-theme") as Theme | null;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const sys = mql.matches ? "dark" : "light";

    const t = stored ?? "system";
    setThemeState(t);

    const isDark = t === "dark" || (t === "system" && sys === "dark");
    setResolved(isDark ? "dark" : "light");
    applyTheme(isDark);

    // Update when system preference changes (only relevant when theme === 'system')
    const handler = (e: MediaQueryListEvent) => {
      setThemeState((cur) => {
        if (cur === "system") {
          setResolved(e.matches ? "dark" : "light");
          applyTheme(e.matches);
        }
        return cur;
      });
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  function setTheme(t: Theme) {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = t === "dark" || (t === "system" && mql.matches);
    setThemeState(t);
    setResolved(isDark ? "dark" : "light");
    applyTheme(isDark);
    if (t === "system") {
      localStorage.removeItem("trialfind-theme");
    } else {
      localStorage.setItem("trialfind-theme", t);
    }
  }

  return <Ctx.Provider value={{ theme, resolved, setTheme }}>{children}</Ctx.Provider>;
}
