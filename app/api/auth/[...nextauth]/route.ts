import axios from "axios"
import NextAuth from "next-auth"
import { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
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
    ],
    pages: {
        signIn: "/login",
    },
    callbacks:{
        async jwt({ token, user, trigger, session }) {
            if(trigger==='update'){
              return {...token, ...session.user}
            }
            return {...token, ...user};
          },
        async session({ session, token, user }) {
          session.user = (token as Session["user"]) 
          return session
        }
    },
})

export { handler as GET, handler as POST }