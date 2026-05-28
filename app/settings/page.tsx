"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { SideNav, TopNav, BottomNav, UploadModal } from "@/components/moments"
import { getMomentsUserProfile } from "@/lib/profile"

export default function SettingsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [privateProfile, setPrivateProfile] = useState(true)
  const [hideFromDiscovery, setHideFromDiscovery] = useState(false)
  const [stripLocation, setStripLocation] = useState(true)
  const [dailyReminders, setDailyReminders] = useState(false)
  const { data: session } = useSession()
  const profile = getMomentsUserProfile(session)

  const [formData, setFormData] = useState(() => ({
    fullName: profile.displayName,
    username: profile.handle,
    bio: "",
  }))

  return (
    <div className="min-h-screen bg-background">
      <SideNav onPostClick={() => setIsUploadModalOpen(true)} />
      <TopNav onAddClick={() => setIsUploadModalOpen(true)} />

      <main className="max-w-[800px] mx-auto px-4 md:px-6 py-10 lg:pl-72 lg:pr-12">
        {/* Profile Header Stats */}
        <section className="mb-16">
          <div className="bg-surface-container-lowest p-10 rounded-xl card-shadow flex flex-wrap gap-10 items-center justify-between border border-outline-variant/30">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-md">
                  {profile.avatarUrl ? (
                    <img
                      alt={profile.displayName}
                      className="w-full h-full object-cover"
                      src={profile.avatarUrl}
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center font-mono text-lg font-bold text-primary">
                      {profile.initials}
                    </div>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-1 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div>
                <h1 className="font-sans text-[32px] leading-[40px] font-semibold text-primary tracking-[-0.01em]">
                  Settings
                </h1>
                <p className="font-mono text-sm text-secondary">
                  Manage your presence on Moments
                </p>
                <p className="font-mono text-xs text-secondary mt-1 truncate max-w-sm">
                  {profile.email || profile.handle}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex gap-10 border-l border-outline-variant pl-10">
              <div className="text-center">
                <span className="block font-sans text-lg font-medium text-primary max-w-[10rem] truncate">
                  {profile.displayName}
                </span>
                <span className="block font-mono text-xs text-secondary uppercase tracking-wider">
                  Display Name
                </span>
              </div>
              <div className="text-center">
                <span className="block font-sans text-lg font-medium text-primary max-w-[10rem] truncate">
                  {profile.handle}
                </span>
                <span className="block font-mono text-xs text-secondary uppercase tracking-wider">
                  Username
                </span>
              </div>
              <div className="text-center">
                <span className="block font-sans text-lg font-medium text-primary max-w-[10rem] truncate">
                  {profile.email || "Google account"}
                </span>
                <span className="block font-mono text-xs text-secondary uppercase tracking-wider">
                  Email
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Sections */}
        <div className="space-y-10">
          {/* Personal Information */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">badge</span>
              <h2 className="font-sans text-xl font-medium text-primary">
                Personal Information
              </h2>
            </div>
            <div className="bg-surface-container-lowest p-6 md:p-10 rounded-xl card-shadow border border-outline-variant/20 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-mono text-sm text-secondary px-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-tertiary transition-all font-sans text-base text-on-surface"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-sm text-secondary px-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-tertiary transition-all font-sans text-base text-on-surface"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-mono text-sm text-secondary px-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-tertiary transition-all font-sans text-base text-on-surface resize-none"
                />
                <p className="font-mono text-xs text-on-secondary-container px-1 text-right">
                  {formData.bio.length} / 160
                </p>
              </div>
            </div>
          </section>

          {/* Account Privacy */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">lock</span>
              <h2 className="font-sans text-xl font-medium text-primary">Account Privacy</h2>
            </div>
            <div className="bg-surface-container-lowest p-6 md:p-10 rounded-xl card-shadow border border-outline-variant/20">
              <div className="flex items-center justify-between group cursor-pointer">
                <div>
                  <h4 className="font-sans text-lg text-primary font-medium">Private Profile</h4>
                  <p className="font-sans text-base text-secondary">
                    Only followers can see your moments and timeline.
                  </p>
                </div>
                <button
                  onClick={() => setPrivateProfile(!privateProfile)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    privateProfile ? "bg-primary" : "bg-surface-container-highest"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      privateProfile ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary">visibility_off</span>
                    <span className="font-sans text-base text-on-surface">Hide from discovery</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hideFromDiscovery}
                    onChange={(e) => setHideFromDiscovery(e.target.checked)}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary">location_off</span>
                    <span className="font-sans text-base text-on-surface">
                      Strip location metadata
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={stripLocation}
                    onChange={(e) => setStripLocation(e.target.checked)}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">notifications_active</span>
              <h2 className="font-sans text-xl font-medium text-primary">
                Notification Preferences
              </h2>
            </div>
            <div className="bg-surface-container-lowest p-6 md:p-10 rounded-xl card-shadow border border-outline-variant/20 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <div className="bg-surface-container p-2 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">favorite</span>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-medium">Interactions</h4>
                    <p className="font-mono text-xs text-secondary">Likes, comments and shares</p>
                  </div>
                </div>
                <select className="bg-surface-container-low border-none rounded-lg font-mono text-sm px-4 py-2 focus:ring-1 focus:ring-tertiary">
                  <option>Everyone</option>
                  <option>Following</option>
                  <option>Off</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <div className="bg-surface-container p-2 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">
                      history_toggle_off
                    </span>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-medium">Daily Reminders</h4>
                    <p className="font-mono text-xs text-secondary">Time to post your moment</p>
                  </div>
                </div>
                <button
                  onClick={() => setDailyReminders(!dailyReminders)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    dailyReminders ? "bg-primary" : "bg-surface-container-highest"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      dailyReminders ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
            <button className="px-10 py-3 bg-surface-container text-primary font-mono text-sm rounded-xl hover:bg-surface-container-high transition-colors">
              Discard Changes
            </button>
            <button className="px-10 py-3 bg-primary text-on-primary font-mono text-sm rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Save Settings
            </button>
          </div>

          {/* Delete Account */}
          <div className="pt-16 border-t border-outline-variant/30 flex flex-col items-center">
            <button className="text-error font-mono text-sm flex items-center gap-2 px-10 py-3 hover:bg-error-container/20 rounded-xl transition-colors">
              <span className="material-symbols-outlined">delete_forever</span>
              Delete Account
            </button>
            <p className="font-mono text-xs text-secondary mt-2 text-center">
              This action is permanent and will remove all your moments and data.
            </p>
          </div>
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
