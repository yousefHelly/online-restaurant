"use client"

import { useSession } from "next-auth/react"

import {useEffect} from 'react'
import axios from "axios"

const useUpdateEmailSession = () => {
    const {data: session, update} = useSession()
    useEffect(
        ()=>{
            const updateData = async()=>{
                const formData = new FormData()
                formData.append('Email', session?.user.email!)
                const res = await axios.post<{
                    "isAuthenticated": boolean,
                    "userName": string,
                    "FirstName": string,
                    "LastName": string,
                    "email": string,
                    "roles": ('User'|'Admin')[],
                    "token": string,
                    "expiresOn": string,
                    "userImgUrl": string|null,
                  }>('https://localhost:7166/api/Auth/Gmail',
                    formData
                )
                await update({...session, user:res.data})
            }
            if(session?.user.provider!='credentials' && session?.user.email!=undefined && !session.user.token){
                updateData()
            }
        }
    ,[session]);
};
export default useUpdateEmailSession