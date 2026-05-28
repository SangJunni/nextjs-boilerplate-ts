"use client"

import { useState } from "react"
import { SideNav, TopNav, BottomNav, UploadModal } from "@/components/moments"
import { TimelineEntry } from "@/components/moments/timeline-entry"
import { FriendEntry } from "@/components/moments/friend-entry"

const timelineData = {
  today: {
    day: "Thursday",
    date: "October 24, 2024",
    entries: [
      {
        id: 1,
        type: "photo" as const,
        time: "06:42 AM",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        description: "Finally caught the sunrise at the lake today. The air was crisp and the silence was absolute. Moments like these are why I love the early hours.",
        location: "Silver Lake Reserve",
      },
      {
        id: 2,
        type: "friend" as const,
        time: "11:15 AM",
        friend: {
          name: "Sarah Jenks",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        },
        description: "Coffee and concepts. Working on the new brand identity today. Feeling inspired by the mid-century modern aesthetic we saw yesterday.",
        images: [
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=400&h=400&fit=crop",
        ],
      },
    ],
  },
  yesterday: {
    entries: [
      {
        id: 3,
        type: "group" as const,
        time: "04:30 PM",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=400&fit=crop",
        description: "The weekly hike never gets old. Found a new trail today that leads to an incredible clearing.",
        friends: [
          {
            name: "James",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          },
          {
            name: "Maya",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          },
        ],
      },
    ],
  },
}

export default function TimelinePage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <SideNav onPostClick={() => setIsUploadModalOpen(true)} />
      <TopNav onAddClick={() => setIsUploadModalOpen(true)} />

      <main className="max-w-[800px] mx-auto px-4 md:px-6 py-10 lg:pl-72 lg:pr-12">
        {/* Daily Log Header */}
        <header className="mb-16 fade-in-up">
          <div className="font-mono text-xs text-secondary uppercase tracking-widest mb-1">
            {timelineData.today.day}
          </div>
          <h1 className="font-sans text-[32px] leading-[40px] font-semibold text-primary tracking-[-0.01em]">
            {timelineData.today.date}
          </h1>
        </header>

        <div className="flex flex-col gap-16">
          {/* Today's Entries */}
          {timelineData.today.entries.map((entry, index) => (
            <article key={entry.id} className={`fade-in-up delay-${index + 1}`}>
              {entry.type === "photo" ? (
                <TimelineEntry
                  time={entry.time}
                  image={entry.image}
                  description={entry.description}
                  location={entry.location}
                />
              ) : entry.type === "friend" && entry.friend ? (
                <FriendEntry
                  time={entry.time}
                  friend={entry.friend}
                  description={entry.description}
                  images={entry.images}
                />
              ) : null}
            </article>
          ))}

          {/* Yesterday Divider */}
          <div className="flex items-center gap-4 py-6 fade-in-up delay-3">
            <div className="h-px flex-1 bg-outline-variant/30" />
            <span className="font-mono text-xs text-on-primary-container">Yesterday</span>
            <div className="h-px flex-1 bg-outline-variant/30" />
          </div>

          {/* Yesterday's Entries */}
          {timelineData.yesterday.entries.map((entry) => (
            <article key={entry.id} className="fade-in-up delay-3">
              <TimelineEntry
                time={entry.time}
                image={entry.image}
                description={entry.description}
                friends={entry.friends}
              />
            </article>
          ))}
        </div>

        {/* Spacer for Bottom Nav */}
        <div className="h-24 lg:hidden" />
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsUploadModalOpen(true)}
        className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <span className="material-symbols-outlined">add</span>
      </button>

      <BottomNav onAddClick={() => setIsUploadModalOpen(true)} />
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  )
}
