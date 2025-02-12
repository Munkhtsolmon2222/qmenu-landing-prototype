"use client";
import { createContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
  mainTheme: string;
};

const initialState = {
  theme: "system",
  setTheme: () => null,
  mainTheme: "dark",
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "shadcn-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) ?? defaultTheme
  );
  const [mainTheme, setMainTheme] = useState<string>("dark");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      setMainTheme(mainTheme);
      root.classList.add(systemTheme);
      return;
    }

    setMainTheme(theme);
    root.classList.add(theme);
  }, [theme, mainTheme]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        mainTheme,
        setTheme: (theme: string) => {
          localStorage.setItem(storageKey, theme);
          setTheme(theme);
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
