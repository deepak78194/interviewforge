'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, HelpCircle, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  className?: string;
}

const navItems = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/jobs", label: "Jobs", icon: Briefcase },
  { href: "/app/questions", label: "Questions", icon: HelpCircle },
  { href: "/app/plans", label: "Plans", icon: Calendar },
  { href: "/app/progress", label: "Progress", icon: TrendingUp },
];

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center border-t border-border bg-card",
        className
      )}
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/app" ? pathname === "/app" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 min-h-[44px] text-xs font-medium transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
