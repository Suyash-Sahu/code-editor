"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-black hover:text-[#256DA4]" />
      ) : (
        <Sun className="h-5 w-5 text-white hover:text-[#74FF9E]" />
      )}
    </div>
  );
}
