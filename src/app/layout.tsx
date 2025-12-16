import "@/index.css"
import type { ReactNode } from "react"
import SessionWrapper from "@/components/SessionWrapper"
import Footer from "@/components/Footer"
import HeaderBar from "@/components/Header"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-gradient-to-b from-gray-50 to-white text-gray-800">
        <SessionWrapper>

          <HeaderBar />

          <main className="pt-20 flex justify-center min-h-screen">
            <div className="w-full max-w-[1200px] px-6 py-8 space-y-8">
              {children}
            </div>
          </main>

          <Footer />

        </SessionWrapper>
      </body>
    </html>
  )
}
