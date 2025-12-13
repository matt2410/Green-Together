import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

//   if (
//     token &&
//     !token.phone &&
//     !req.nextUrl.pathname.startsWith("/user")
//   ) {
//     return NextResponse.redirect(new URL("/user", req.url))
//   }

  return NextResponse.next()
}
