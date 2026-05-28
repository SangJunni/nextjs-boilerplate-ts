"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { getMomentsUserProfile } from "@/lib/profile"

const navItems = [
  { href: "/", label: "Timeline", icon: "auto_awesome_motion" },
  { href: "/friends", label: "Friends", icon: "group" },
  { href: "/memories", label: "Memories", icon: "history" },
  { href: "/settings", label: "Settings", icon: "settings" },
]

interface SideNavProps {
  onPostClick?: () => void
}

export function SideNav({ onPostClick }: SideNavProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const profile = getMomentsUserProfile(session)

  return (
    <aside className="hidden lg:flex flex-col p-6 gap-6 border-r border-outline-variant/30 h-screen w-64 fixed left-0 top-0 bg-surface">
      {/* Logo */}
      <div className="mb-6">
        <Link href="/" className="font-sans text-[32px] leading-[40px] font-bold text-primary tracking-[-0.01em]">
          Moments
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg font-mono text-sm font-medium tracking-[0.02em] transition-all duration-200",
                isActive
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-secondary hover:bg-surface-container-high"
              )}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Card */}
      <div className="p-4 bg-surface-container-low rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          {profile.avatarUrl ? (
            <img
              alt={profile.displayName}
              className="w-10 h-10 rounded-full object-cover"
              src={profile.avatarUrl}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-mono text-xs font-bold text-primary">
              {profile.initials}
            </div>
          )}
          <div>
            <p className="font-mono text-sm font-bold text-primary">{profile.displayName}</p>
            <p className="text-[10px] text-secondary truncate max-w-[10rem]">
              {profile.email || profile.handle}
            </p>
          </div>
        </div>
        <button
          onClick={onPostClick}
          className="w-full py-2 bg-primary text-on-primary rounded-lg font-mono text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Post Today
        </button>
      </div>
    </aside>
  )
}
