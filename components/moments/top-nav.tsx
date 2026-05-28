"use client"

import Link from "next/link"

interface TopNavProps {
  onAddClick?: () => void
}

export function TopNav({ onAddClick }: TopNavProps) {
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
          <Link href="/settings" className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
            <img
              alt="User profile avatar"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}
