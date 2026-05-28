// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Next.js Boilerplate",
  description: "Next.js 16 쨌 Tailwind CSS v4 쨌 shadcn/ui 쨌 Auth.js 쨌 Prisma 쨌 Neon",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
