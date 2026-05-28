"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Feed", icon: "grid_view", activeIcon: "grid_view" },
  { href: "/friends", label: "Friends", icon: "group", activeIcon: "group" },
  { href: "/add", label: "Add", icon: "add_box", activeIcon: "add_box" },
  { href: "/notifications", label: "Activity", icon: "notifications", activeIcon: "notifications" },
  { href: "/settings", label: "Profile", icon: "person", activeIcon: "person" },
]

interface BottomNavProps {
  onAddClick?: () => void
}

export function BottomNav({ onAddClick }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe pt-2 border-t border-outline-variant/20 bg-background/80 backdrop-blur-md">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
        const isAdd = item.href === "/add"

        if (isAdd) {
          return (
            <button
              key={item.href}
              onClick={onAddClick}
              className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-mono text-xs">{item.label}</span>
            </button>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center transition-colors",
              isActive
                ? "text-primary font-bold"
                : "text-secondary hover:text-primary"
            )}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-mono text-xs">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
