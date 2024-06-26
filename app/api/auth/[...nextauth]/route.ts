import { Decrypt } from "@/lib/Decrypt"
import axios from "@/lib/api/axios"
import NextAuth from "next-auth"
import { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await axios.post<AuthResponse>(`/api/Auth/token`, JSON.stringify({ email: credentials?.email, password: credentials?.password }), { headers: { "Content-Type": "application/json" } })
        const user = res.data
        const { firstName: fn, lastName: ln, userName: un, email: em, ...otherUserAttrs } = user
        console.log('before decryption', fn, ln, un, em)
        const email = Decrypt(em)
        const firstName = Decrypt(fn)
        const lastName = Decrypt(ln)
        const userName = Decrypt(un)
        console.log('after decryption', email, firstName, lastName, userName)
        if (user && res.data.isAuthenticated) {
          return {
            firstName,
            lastName,
            userName,
            email,
            ...otherUserAttrs
          }
        }
        return null
      }
    }
    ),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  pages: {
    signIn: "/login",
    error: '/login'
  },
  callbacks: {
    async signIn({ account, user, profile }) {
      if (account?.provider === 'google') {
        const formData = new FormData()
        formData.append('Email', user.email!)
        formData.append('FirstName', user.name?.split(' ')[0] || user.name || "")
        formData.append('LastName', user.name?.split(' ')[1] || user.name || "")
        formData.append('UserName', user.name!)
        formData.append('Value', 'google')
        formData.append('UserImgUrl', (profile as any).picture || user.image!)
        console.log(formData)
        return axios.post(`/api/auth/gmail`,
          formData, {
          headers: { 'Content-Type': 'multipart-form-data' }
        }
        ).then((val) => {
          console.log(val);
          return true
        })
          .catch((err) => {
            console.log(err);
            return false
          })
      }
      return true
    },
    async jwt({ token, user, trigger, session, profile, account }) {
      if (account?.provider === 'google') {
        token.provider = account.provider
        return { ...token, ...profile }
      }
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = (token as Session["user"]);
      return session
    }
  },
})

export { handler as GET, handler as POST }