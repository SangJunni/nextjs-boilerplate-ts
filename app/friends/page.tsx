"use client"

import { useState } from "react"
import { SideNav, TopNav, BottomNav, UploadModal } from "@/components/moments"

const friendData = {
  profile: {
    name: "Sam Fletcher",
    bio: "Documenting the quiet moments in between. Currently in Tokyo, Japan.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    verified: true,
    isPro: true,
    streak: 154,
    location: "Tokyo",
  },
  today: {
    day: "Wednesday",
    date: "October 24, 2024",
  },
  timeline: [
    {
      id: 1,
      time: "08:45 AM",
      type: "photo" as const,
      title: "First light in Shibuya",
      description: "Started the day at a quiet corner cafe. The rhythm of the city waking up is my favorite soundtrack. The coffee here is surprisingly reminiscent of home.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
      location: "SHIBUYA, TOKYO",
      likes: 24,
      comments: 3,
    },
    {
      id: 2,
      time: "12:30 PM",
      type: "quote" as const,
      quote: "The city is a poem that never stops being written.",
      attribution: "Feeling inspired at Gyoen National Garden",
    },
    {
      id: 3,
      time: "04:15 PM",
      type: "gallery" as const,
      images: [
        "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=400&fit=crop",
      ],
      description: "The contrast between the neon glass towers and the silent wooden shrines is what makes this place soul-stirring. Walking through Yoyogi Park felt like a meditation.",
    },
    {
      id: 4,
      time: "08:00 PM",
      type: "photo" as const,
      title: "Midnight in Shinjuku",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=800&fit=crop",
    },
  ],
}

export default function FriendsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isFollowed, setIsFollowed] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <SideNav onPostClick={() => setIsUploadModalOpen(true)} />
      <TopNav onAddClick={() => setIsUploadModalOpen(true)} />

      <main className="max-w-[800px] mx-auto px-4 md:px-6 py-10 lg:pl-72 lg:pr-12">
        {/* Friend Profile Header */}
        <header className="mb-16 flex flex-col items-center md:items-start md:flex-row md:justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                alt={friendData.profile.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface shadow-sm object-cover"
                src={friendData.profile.avatar}
              />
              {friendData.profile.isPro && (
                <span className="absolute bottom-1 right-1 bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-mono text-[10px] shadow-sm">
                  Pro
                </span>
              )}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="font-sans text-[32px] leading-[40px] font-semibold tracking-[-0.01em]">
                  {friendData.profile.name}
                </h1>
                {friendData.profile.verified && (
                  <span
                    className="material-symbols-outlined text-tertiary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                )}
              </div>
              <p className="font-sans text-base text-secondary max-w-sm">
                {friendData.profile.bio}
              </p>
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <span className="bg-surface-container px-3 py-1 rounded-full font-mono text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  {friendData.profile.streak} Streak
                </span>
                <span className="bg-surface-container px-3 py-1 rounded-full font-mono text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {friendData.profile.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFollowed(!isFollowed)}
              className={`border border-primary px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                isFollowed
                  ? "bg-transparent text-primary hover:bg-primary hover:text-on-primary"
                  : "bg-primary text-on-primary"
              }`}
            >
              {isFollowed ? "Followed" : "Follow"}
            </button>
            <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-mono text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              Message
            </button>
          </div>
        </header>

        {/* Timeline Section */}
        <section className="relative">
          {/* Daily Log Header */}
          <div className="mb-10 sticky top-20 z-30 bg-background/95 py-2">
            <p className="font-mono text-xs text-secondary uppercase tracking-widest">
              {friendData.today.day}
            </p>
            <h2 className="font-sans text-[32px] leading-[40px] font-semibold tracking-[-0.01em]">
              {friendData.today.date}
            </h2>
          </div>

          {/* Vertical Timeline Container */}
          <div className="relative space-y-16">
            {friendData.timeline.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row relative z-10">
                {/* Desktop Time (Left) */}
                <div className="hidden md:block w-32 shrink-0 pt-2 text-right pr-8">
                  <p className="font-mono text-sm text-secondary font-bold">{item.time}</p>
                </div>

                {/* Content Card */}
                {item.type === "photo" && (
                  <div className="flex-1 bg-surface-container-lowest rounded-xl card-shadow overflow-hidden border border-outline-variant/10">
                    <div className="md:hidden p-4 bg-surface-container-low border-b border-outline-variant/10">
                      <p className="font-mono text-xs text-secondary">{item.time}</p>
                    </div>
                    {item.image && (
                      <img
                        alt={item.title || "Photo"}
                        className="w-full aspect-video object-cover"
                        src={item.image}
                      />
                    )}
                    <div className="p-6">
                      {item.title && (
                        <h3 className="font-sans text-xl font-medium mb-1">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="font-sans text-base text-secondary mb-4">
                          {item.description}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        {item.location && (
                          <span className="bg-secondary-container px-2 py-0.5 rounded font-mono text-[10px] text-on-secondary-container">
                            {item.location}
                          </span>
                        )}
                        {(item.likes !== undefined || item.comments !== undefined) && (
                          <div className="flex items-center gap-4">
                            {item.likes !== undefined && (
                              <button className="flex items-center gap-1 text-secondary hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-lg">favorite</span>
                                <span className="font-mono text-xs">{item.likes}</span>
                              </button>
                            )}
                            {item.comments !== undefined && (
                              <button className="flex items-center gap-1 text-secondary hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-lg">chat_bubble</span>
                                <span className="font-mono text-xs">{item.comments}</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {item.type === "quote" && (
                  <div className="flex-1 bg-surface-container-lowest rounded-xl card-shadow p-6 border border-outline-variant/10 border-l-4 border-l-tertiary">
                    <div className="md:hidden mb-2">
                      <p className="font-mono text-xs text-secondary">{item.time}</p>
                    </div>
                    <p className="font-sans text-xl italic text-primary leading-relaxed">
                      {`"${item.quote}"`}
                    </p>
                    <p className="font-mono text-xs text-secondary mt-4">
                      — {item.attribution}
                    </p>
                  </div>
                )}

                {item.type === "gallery" && (
                  <div className="flex-1 space-y-4">
                    <div className="md:hidden p-4 bg-surface-container-low rounded-t-xl border border-outline-variant/10">
                      <p className="font-mono text-xs text-secondary">{item.time}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {item.images?.map((image, index) => (
                        <div
                          key={index}
                          className={`bg-surface-container-lowest rounded-xl card-shadow overflow-hidden border border-outline-variant/10 ${
                            index === 0 ? "col-span-2" : "col-span-1"
                          }`}
                        >
                          <img
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-64 object-cover"
                            src={image}
                          />
                        </div>
                      ))}
                    </div>
                    {item.description && (
                      <div className="bg-surface-container-lowest rounded-xl card-shadow p-6 border border-outline-variant/10">
                        <p className="font-sans text-base text-secondary">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Previous Day Link */}
          <div className="mt-16 text-center">
            <button className="flex items-center justify-center gap-2 mx-auto text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">expand_more</span>
              <span className="font-mono text-xs">Previous Day: October 23</span>
            </button>
          </div>
        </section>

        {/* Spacer for Bottom Nav */}
        <div className="h-24 lg:hidden" />
      </main>

      <BottomNav onAddClick={() => setIsUploadModalOpen(true)} />
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  )
}
