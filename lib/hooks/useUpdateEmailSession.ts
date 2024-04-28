"use client"

import { useSession } from "next-auth/react"

import { useEffect } from 'react'
import axios from "axios"

const useUpdateEmailSession = () => {
    const { data: session, update } = useSession()
    useEffect(
        () => {
            const updateData = async () => {
                console.log(session?.user);

                const formData = new FormData()
                formData.append('Email', session?.user.email!)
                formData.append('FirstName', (session?.user as any).name.split(' ')[0])
                formData.append('LastName', (session?.user as any).name.split(' ')[1])
                formData.append('UserName', (session?.user as any).name!)
                formData.append('UserImgUrl', (session?.user as any).picture!)
                const res = await axios.post<{
                    "isAuthenticated": boolean,
                    "userName": string,
                    "FirstName": string,
                    "LastName": string,
                    "email": string,
                    "roles": ('User' | 'Admin')[],
                    "token": string,
                    "expiresOn": string,
                    "userImgUrl": string | null,
                }>('https://localhost:7166/api/Auth/Gmail',
                    formData
                )
                await update({ ...session, user: res.data })
                console.log(session?.user);
            }
            if (session?.user.provider != 'credentials' && session?.user.email != undefined && !session.user.token) {
                updateData()
            }
        }
        , [session]);
};
export default useUpdateEmailSession