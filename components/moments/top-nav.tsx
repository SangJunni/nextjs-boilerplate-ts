"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { getMomentsUserProfile } from "@/lib/profile"

interface TopNavProps {
  onAddClick?: () => void
}

export function TopNav({ onAddClick }: TopNavProps) {
  const { data: session } = useSession()
  const profile = getMomentsUserProfile(session)
  const settingsHref = session?.user ? "/settings" : "/login"

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-4 md:px-6 py-4 max-w-[800px] mx-auto lg:pl-72 lg:pr-12">
        <Link
          href="/"
          className="font-sans text-xl font-semibold text-primary lg:hidden"
        >
          Moments
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={onAddClick}
            className="text-secondary hover:text-primary transition-colors flex items-center"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <Link
            href="/notifications"
            className="text-secondary hover:text-primary transition-colors flex items-center"
          >
            <span className="material-symbols-outlined">notifications</span>
          </Link>
          <Link
            href={settingsHref}
            className="w-8 h-8 rounded-full overflow-hidden bg-surface-container"
            aria-label={session?.user ? `Open ${profile.displayName}'s settings` : "Sign in"}
          >
            {profile.avatarUrl ? (
              <img
                alt={profile.displayName}
                className="w-full h-full object-cover"
                src={profile.avatarUrl}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-container-high font-mono text-[10px] font-bold text-primary">
                {profile.initials}
              </div>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}
