import type { Session } from "next-auth"

export interface MomentsUserProfile {
  displayName: string
  handle: string
  email: string
  avatarUrl: string | null
  initials: string
}

function toTitleCase(value: string) {
  return value
    .split(/[._\-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function buildInitials(displayName: string) {
  const parts = displayName.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return "ME"
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
}

export function getMomentsUserProfile(session: Session | null | undefined): MomentsUserProfile {
  const user = session?.user
  const email = user?.email ?? ""
  const emailLocalPart = email.split("@")[0]?.trim() ?? ""
  const displayName =
    user?.name?.trim() || (emailLocalPart ? toTitleCase(emailLocalPart) : "Your account")

  const handleSource = (emailLocalPart || displayName).replace(/[^a-zA-Z0-9._-]+/g, ".")
  const handle = `@${handleSource.toLowerCase() || "your-account"}`

  return {
    displayName,
    handle,
    email,
    avatarUrl: user?.image ?? null,
    initials: buildInitials(displayName),
  }
}
