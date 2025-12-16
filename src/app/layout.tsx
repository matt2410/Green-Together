import "@/index.css"
import type { ReactNode } from "react"
import Link from "next/link"
import SessionWrapper from "@/components/SessionWrapper"
import LoginButton from "@/components/LoginButton"

export default function RootLayout({ children }: { children: ReactNode }) {
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

  function HeaderBar() {
    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
        <div className="h-full flex items-center justify-center">
          {/* INNER 1200 */}
          <div className="w-full max-w-[1200px] px-6 flex items-center justify-between">

            {/* LEFT */}
            <nav className="flex items-center gap-6 text-gray-700 font-medium">
              <NavItem href="/" label="Trang chủ" />
              <NavItem href="/map" label="Bản đồ" />
              {/* <NavItem href="/goals" label="Goals" /> */}
              {/* <NavItem href="/timeline" label="Timeline" /> */}
              <NavItem href="/events" label="Sự kiện" />
              <NavItem href="/campaigns" label="Chiến dịch" />
              {/* <NavItem href="/team" label="Team" />
              <NavItem href="/impact" label="Impact" /> */}
            </nav>

            {/* RIGHT */}
            <LoginButton />

          </div>
        </div>
      </header>
    )
  }

  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <SessionWrapper>

          {/* HEADER */}
          <HeaderBar />

          {/* PAGE CONTENT */}
          <main className="pt-16 flex justify-center">
            <div className="w-full max-w-[1200px] px-6 py-6 space-y-6">
              {children}
            </div>
          </main>

        </SessionWrapper>
      </body>
    </html>
  )
}
