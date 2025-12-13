"use client"

import { UserModel } from "@/data/users"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function LoginButton() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const userSession = session?.user as UserModel

  useEffect(() => {
    if (status === "authenticated" && !userSession.phone) {
      router.push("/user")
    }
  }, [status, session, router, pathname])

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span
          className="cursor-pointer underline"
          onClick={() => {
            router.push(`/user`)
          }}
        >
          Xin chào, {session.user.name}
        </span>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/" })
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Đăng xuất
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-600 text-white font-medium rounded"
    >
      Đăng nhập bằng Google
    </button>
  )
}
