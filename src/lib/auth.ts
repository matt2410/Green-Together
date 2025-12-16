import Google from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
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

      const existingUser = await User.findOne({ email: user.email })

      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name || "Unnamed",
          image: user.image,
        })
      }

      return true
    },

    async jwt({ token, trigger, session }) {
      await connectDB()

      // 🔥 INIT JWT (login / refresh)
      if (!token.user && token.email) {
        const dbUser = await User.findOne({ email: token.email }).lean()
        if (dbUser) {
          token.user = {
            ...dbUser,
            _id: dbUser._id.toString(),
          }
        }
      }

      // 🔥 useSession().update()
      if (trigger === "update" && session?.user) {
        token.user = Object.assign(
          {},
          token.user ?? {},
          session.user
        )
      }

      return token
    },

    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
}
