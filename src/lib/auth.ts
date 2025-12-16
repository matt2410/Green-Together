import Google from "next-auth/providers/google"
import { connectDB } from "./mongodb"
import { NextAuthOptions } from "next-auth"
import { User } from "@/models/User"

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      await connectDB()
      return true
    },

    async jwt({ token }) {
      await connectDB()

      const dbUser = await User.findOne({ email: token.email })

      if (dbUser) {
        token.id = dbUser._id.toString()
        token.phone = dbUser.phone
        token.gender = dbUser.gender
        token.dob = dbUser.dob
      } else {
        token.id = ''
      }

      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as any
      session.user.phone = token.phone as any
      session.user.gender = token.gender as any
      session.user.dob = token.dob as any

      return session
    },
  },
}
