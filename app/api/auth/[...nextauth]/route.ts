import axios from "axios"
import NextAuth from "next-auth"
import { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
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
        async signIn({account, profile}) {
          if(account?.provider==='google'){
            console.log(profile); 
          }
          return true
        },
        async jwt({ token, user, trigger, session, profile, account }) {
            if(account?.provider==='google'){
              return {...token, ...profile}
            }
            if(trigger==='update'){
              return {...token, ...session.user}
            }
            return {...token, ...user};
          },
        async session({ session, token, user}) {
          session.user = (token as Session["user"]);
          const provider = (session.user as any).token?'credentials':'google';
          session.user.provider=provider
          return session
        }
    },
})

export { handler as GET, handler as POST }