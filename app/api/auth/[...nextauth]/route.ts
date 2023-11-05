import NextAuth from "next-auth"
import { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios';
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
              },
              async authorize(credentials, req) {
                const res =await axios.post<AuthResponse>(`https://localhost:7166/api/Auth/token`, JSON.stringify({email:credentials?.email, password:credentials?.password}), { headers: { "Content-Type": "application/json" }})
                const user =  res.data
                if(user && res.data.isAuthenticated){
                    return user
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
        error:'/login'
    },
    callbacks:{
        async signIn({account, user, profile}) {
          if(account?.provider==='google'){
            const formData = new FormData()
            formData.append('Email', user.email!)
            formData.append('FirstName', user.name!.split(' ')[0])
            formData.append('LastName', user.name!.split(' ')[1] || '')
            formData.append('UserName', user.name!)
            formData.append('UserImg', (profile as any).picture||user.image!)
            axios.post(`https://localhost:7166/api/auth/gmail`,
            formData
            )
              return true
          }
          return true
        },
        async jwt({ token, user, trigger, session, profile, account }) {
            if(account?.provider==='google'){
              token.provider = account.provider
              return {...token, ...profile}
            }
            if(trigger==='update'){
              return {...token, ...session.user}
            }
            return {...token, ...user};
          },
        async session({ session, token, user}) {
          session.user = (token as Session["user"]);
          return session
        }
    },
})

export { handler as GET, handler as POST }