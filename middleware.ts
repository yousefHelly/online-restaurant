import type { Session } from 'next-auth'
import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'
export default withAuth(
    async function middleware(req) {
        if(req.url.slice(req.url.lastIndexOf('/')) === '/admin'){
            return NextResponse.redirect(new URL('/admin/dashboard', req.url))
        }
    }
    ,{
    callbacks: {
      authorized:({req, token})=>{
        //check if the user signed in 
        if(token){
            //check if the user requested admin pages
            if(req.url.includes('admin')){
                //check the role of the user
                return (token as Session['user']).roles.includes('Admin')
            }
            //normal signed in user requested other pages
            else{
                return true
            }
        }        
        return false
      } 
    },
  })

export const config =  { matcher: ['/profile', '/settings', '/admin/:path*'] }
