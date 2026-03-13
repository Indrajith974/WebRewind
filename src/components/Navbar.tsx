"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Monitor, Cpu, History } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";

const themes = [
  { id: "theme-1995", label: "1995 Web", icon: Monitor },
  { id: "theme-2005", label: "2005 Web 2.0", icon: Cpu },
  { id: "theme-2015", label: "2015 Modern", icon: History },
];

export function Navbar() {
  const [currentTheme, setCurrentTheme] = useState("theme-1995");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (themeId: string) => {
    themes.forEach((t) => document.documentElement.classList.remove(t.id));
    if (themeId !== "theme-2015") {
      document.documentElement.classList.add(themeId);
    }
    setCurrentTheme(themeId);
    localStorage.setItem("retro-theme", themeId);
  };

  useEffect(() => {
    const saved = localStorage.getItem("retro-theme") || "theme-1995";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyTheme(saved);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--retro-border)] bg-[var(--retro-surface)] p-4 shadow-sm">
      <div className="container mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-[var(--retro-primary)] whitespace-nowrap">
          <History className="h-8 w-8" />
          <h1 className="text-xl font-bold tracking-tight">WebRewind Archive</h1>
        </Link>
        <div className="w-full xl:w-auto xl:max-w-md xl:flex-grow flex justify-center mt-2 xl:mt-0 relative z-[60]">
            <GlobalSearch />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 xl:mt-0">
          <Link 
            href="/quiz" 
            className="hidden sm:flex items-center gap-1 font-bold text-sm bg-yellow-400 text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300 transition-colors"
          >
            <span>❓</span> Era Quiz
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-2">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isActive = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => applyTheme(theme.id)}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[var(--retro-primary)] text-white shadow-inner"
                    : "bg-transparent text-[var(--retro-text)] hover:bg-[var(--retro-bg)]"
                }`}
                style={{
                  border: isActive ? "inset 2px rgba(0,0,0,0.2)" : "solid 2px var(--retro-border)",
                  borderRadius: theme.id === "theme-1995" ? "0px" : "6px",
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{theme.label}</span>
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </nav>
  );
}
