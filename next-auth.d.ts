import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      // Cradenials User 
      provider:'credentials',
      userName: string,
      firstName: string,
      lastName: string,
      email: string,
      userImgUrl: string,
      token: sring,
      roles: string[]
    } | {
      // Google User
      provider:'google',
      name: string,
      email: string,
      picture: string,
      email_verified: boolean,
      given_name: string,
      family_name: string,
    }
  }
}