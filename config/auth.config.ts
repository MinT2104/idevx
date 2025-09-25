import { prisma } from "@/core/database/db"
import bcrypt from "bcryptjs"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// import GoogleProvider from "next-auth/providers/google"

export default {
  // adapter: PrismaAdapter(prisma), // Commented out for build
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (user && user.role === "admin" && user.passwordHash) {
            const isValid = await bcrypt.compare(
              credentials.password,
              user.passwordHash
            )
            if (!isValid) return null

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }
          }
        } catch (error) {
          console.error("Database error during authentication:", error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        const user = session.user as typeof session.user & {
          id: string
          role: string
        }
        user.id = token.sub!
        user.role = token.role as string
      }
      return session
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true },
          })
          token.role = dbUser?.role || "user"
        } catch (error) {
          token.role = "user"
        }
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions
