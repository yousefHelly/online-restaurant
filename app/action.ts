'use server'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache';
 
export async function deleteCookie(cookie: string) {
    const cookieStore = cookies()
    cookieStore.delete(cookie)
}

export async function revalidateChefs() {
    revalidateTag('chefs')
}

export async function revalidateDishes() {
    revalidateTag('dishes')
}

export async function revalidateCategories() {
    revalidateTag('categories')
}

export async function revalidateFixedAdditions() {
    revalidateTag('fixedAdditions')
}