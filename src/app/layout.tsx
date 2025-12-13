// src/app/layout.tsx
import "@/index.css"
import type { ReactNode } from "react"
import Link from "next/link"
import SessionWrapper from "@/components/SessionWrapper"
import LoginButton from "@/components/LoginButton"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <SessionWrapper>
          <HeaderBar />
          <main className="pt-16 px-4">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  )
}

function HeaderBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center px-6 z-50">
      <div className="flex items-center justify-between w-full">
        {/* LEFT — NAV */}
        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          <NavItem href="/" label="Home" />
          <NavItem href="/map" label="Map" />
          <NavItem href="/goals" label="Goals" />
          <NavItem href="/timeline" label="Timeline" />
          <NavItem href="/events" label="Events" />
          <NavItem href="/team" label="Team" />
          <NavItem href="/impact" label="Impact" />
        </nav>

        {/* RIGHT — LOGIN BUTTON */}
        <div>
          <LoginButton />
        </div>
      </div>
    </header>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="hover:text-green-600 transition-colors"
        >
            {label}
        </Link>
    )
}
