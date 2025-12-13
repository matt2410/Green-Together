import { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import { connectDB } from "@/lib/mongodb"
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

      const existing = await User.findOne({ email: user.email })

      if (!existing) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
        })
      }

      return true
    },

    async jwt({ token }) {
      await connectDB()
      const dbUser = await User.findOne({ email: token.email })

      if (dbUser) {
        token.id = dbUser._id.toString()
        token.phone = dbUser.phone
      }

      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.phone = token.phone as string
      return session
    },
  },
}
