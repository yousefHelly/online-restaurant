'use server'
import { cookies } from 'next/headers'
 
export async function deleteCookie(cookie: string) {
    const cookieStore = cookies()
    cookieStore.delete(cookie)
}