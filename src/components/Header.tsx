"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import LoginButton from "@/components/LoginButton"

function NavItem({
  href,
  label,
}: {
  href: string
  label: string
}) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={`relative font-medium transition-colors
        ${
          active
            ? "text-green-700"
            : "text-gray-700 hover:text-green-600"
        }
      `}
    >
      {label}
      {active && (
        <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-green-600 rounded-full" />
      )}
    </Link>
  )
}

export default function HeaderBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur border-b z-50">
      <div className="h-full flex justify-center">
        <div className="w-full max-w-[1200px] px-6 flex items-center justify-between">

          {/* BRAND */}
          <Link
            href="/"
            className="font-bold text-lg text-green-700 flex items-center gap-1"
          >
            GreenTogether <span>🌱</span>
          </Link>

          {/* NAV */}
          <nav className="flex items-center gap-6">
            <NavItem href="/" label="Trang chủ" />
            <NavItem href="/map" label="Bản đồ" />
            <NavItem href="/events" label="Sự kiện" />
            <NavItem href="/campaigns" label="Chiến dịch" />
            <NavItem href="/community" label="Góp ý" />
            <NavItem href="/recognitions" label="Ghi nhận" />
          </nav>

          {/* AUTH */}
          <LoginButton />
        </div>
      </div>
    </header>
  )
}
