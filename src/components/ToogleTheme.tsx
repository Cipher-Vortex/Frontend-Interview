import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoonStar, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

const ToggleTheme: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "q") {
        e.preventDefault();
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  const Icon = theme === "light" ? MoonStar : Sun;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Icon
          className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
            theme === "light"
              ? "text-gray-800 hover:scale-105"
              : "text-yellow-500 hover:rotate-180"
          }`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </TooltipTrigger>

      <TooltipContent className="px-2 py-1 text-xs" side="left">
        Toggle Theme <span className="opacity-70">(Ctrl + Q)</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default ToggleTheme;
