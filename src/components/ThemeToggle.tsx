'use client';

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg border border-border bg-card p-1",
        className
      )}
    >
      <button
        onClick={() => setTheme("light")}
        aria-label="Light theme"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
          theme === "light"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("system")}
        aria-label="System theme"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
          theme === "system"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Monitor className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
          theme === "dark"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
