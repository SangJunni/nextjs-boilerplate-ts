"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { SideNav, TopNav, BottomNav, UploadModal } from "@/components/moments"
import { getMomentsUserProfile } from "@/lib/profile"

export default function NotificationsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const { data: session } = useSession()
  const profile = getMomentsUserProfile(session)

  const notifications = [
    {
      id: 1,
      type: "photo" as const,
      user: {
        name: "Elena Vance",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      },
      action: "shared a new moment from",
      target: "Golden Hour in Kyoto",
      preview: "The light was just perfect this afternoon...",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop",
      time: "12m ago",
    },
    {
      id: 2,
      type: "comment" as const,
      user: {
        name: "Julian Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      action: "commented on your photo.",
      comment: `This composition is incredible, ${profile.displayName}. Really captures the mood of the morning.`,
      time: "2h ago",
    },
    {
      id: 3,
      type: "milestone" as const,
      title: "Streak Milestone!",
      description: "You've shared a moment for",
      highlight: "30 consecutive days",
      message: "Keep the chronicle alive. Your consistency is building a beautiful story.",
      time: "5h ago",
    },
    {
      id: 4,
      type: "photo" as const,
      user: {
        name: "Sarah Jenkins",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      },
      action: "posted in",
      target: "Weekend Travels",
      preview: "Finally found that hidden cafe everyone was talking about.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop",
      time: "Yesterday",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SideNav onPostClick={() => setIsUploadModalOpen(true)} />
      <TopNav onAddClick={() => setIsUploadModalOpen(true)} />

      <main className="max-w-[800px] mx-auto px-4 md:px-6 py-10 lg:pl-72 lg:pr-12">
        {/* Page Header */}
        <header className="mb-10">
          <p className="font-mono text-xs text-secondary uppercase tracking-widest mb-1">
            Activity Center
          </p>
          <h1 className="font-sans text-[32px] leading-[40px] font-semibold text-primary tracking-[-0.01em]">
            Notifications
          </h1>
        </header>

        {/* Notifications List */}
        <section className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-surface-container-low transition-colors cursor-pointer group flex gap-4 items-start ${
                index !== notifications.length - 1 ? "border-b border-outline-variant/10" : ""
              }`}
            >
              {/* Avatar / Icon */}
              {notification.type === "milestone" ? (
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img
                    alt={notification.user?.name}
                    className="w-full h-full object-cover"
                    src={notification.user?.avatar}
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  {notification.type === "milestone" ? (
                    <p className="font-sans text-base text-on-surface">
                      <span className="font-semibold">{notification.title}</span>{" "}
                      {notification.description}{" "}
                      <span className="font-bold text-tertiary">{notification.highlight}</span>.
                    </p>
                  ) : (
                    <p className="font-sans text-base text-on-surface">
                      <span className="font-semibold">{notification.user?.name}</span>{" "}
                      {notification.action}{" "}
                      {notification.target && (
                        <span className="font-medium">{notification.target}</span>
                      )}
                      .
                    </p>
                  )}
                  <span className="font-mono text-xs text-secondary shrink-0 ml-4">
                    {notification.time}
                  </span>
                </div>

                {/* Preview text */}
                {notification.preview && (
                  <p className="text-secondary font-sans text-base truncate mb-4">
                    {`"${notification.preview}"`}
                  </p>
                )}

                {/* Milestone message */}
                {notification.type === "milestone" && notification.message && (
                  <p className="text-secondary font-sans text-base mb-4">
                    {notification.message}
                  </p>
                )}

                {/* Comment */}
                {notification.type === "comment" && notification.comment && (
                  <div className="bg-surface-container px-4 py-3 rounded-lg border-l-4 border-primary mt-2">
                    <p className="text-on-surface-variant font-sans text-sm italic">
                      {`"${notification.comment}"`}
                    </p>
                  </div>
                )}

                {/* Thumbnail */}
                {notification.image && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden border border-outline-variant mt-4">
                    <img
                      alt="Related Photo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={notification.image}
                    />
                  </div>
                )}

                {/* Milestone actions */}
                {notification.type === "milestone" && (
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-surface-container-high rounded-full font-mono text-xs text-primary cursor-pointer hover:bg-surface-container-highest transition-colors">
                      View Badge
                    </span>
                    <span className="px-3 py-1 bg-primary text-on-primary rounded-full font-mono text-xs cursor-pointer hover:opacity-90 transition-opacity">
                      Share Story
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Load More Action */}
        <div className="mt-10 text-center">
          <button className="font-mono text-sm text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto group">
            View older notifications
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">
              expand_more
            </span>
          </button>
        </div>

        {/* Spacer for Bottom Nav */}
        <div className="h-24 lg:hidden" />
      </main>

      {/* Footer */}
      <footer className="w-full py-16 px-4 md:px-6 lg:pl-72 flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-outline-variant">
        <div className="mb-4 md:mb-0">
          <span className="font-mono text-sm font-bold text-primary">Moments</span>
          <p className="font-mono text-xs text-secondary mt-1">
            &copy; 2024 Moments. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="font-mono text-xs text-secondary hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="font-mono text-xs text-secondary hover:text-primary transition-colors">
            Terms
          </a>
          <a href="#" className="font-mono text-xs text-secondary hover:text-primary transition-colors">
            Support
          </a>
        </div>
      </footer>

      <BottomNav onAddClick={() => setIsUploadModalOpen(true)} />
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  )
}
