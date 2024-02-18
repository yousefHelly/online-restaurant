'use client'

import toast from "react-hot-toast"
import useAxiosAuth from "../hooks/useAxiosAuth"
import { axiosAuth } from "./axios"
import { useMutation } from "react-query"
import { PasswordUpdate } from "@/model/PasswordUpdate"
import { useSession } from "next-auth/react"
import { User } from "@/model/Profile"

export function UpdatePassword() {
    useAxiosAuth()
    return useMutation({
      mutationFn: ({ vals }: { vals:PasswordUpdate }): any=>{
        axiosAuth.put(`/api/Auth/UpdatePassword`,{
            oldPassword:vals.oldPassword,
            password:vals.newPassword
            }).then((res)=>toast.success(res.data)).catch((err)=>toast.error(err.data))
      },
    })
}

export function UpdateProfile() {
    const {data:session, update} = useSession()
    useAxiosAuth()
    return useMutation({
      mutationFn: ({ vals }: { vals:User }): any=>{
        const bodyFormData = new FormData();
        bodyFormData.append('FirstName', vals.firstName)
        bodyFormData.append('LastName', vals.lastName)
        bodyFormData.append('UserName', vals.userName)
        axiosAuth.put<UpdateAuth>('/api/Auth/updateAccount',
        bodyFormData,
        {headers: { "Content-Type": "multipart/form-data" }})
        .then(async(res)=>{
            await update({...session,user:res.data.user});
            toast.success(res.data.message)
        })
        .catch((err)=>toast.error(err.data.message))
      },
    })
}

export function UpdateProfileImage() {
    const {data:session, update} = useSession()
    useAxiosAuth()
    return useMutation({
      mutationFn: ({ img }: { img:FileList }): any=>{
        axiosAuth.put<UpdateAuth>('/api/Auth/updateAccount',
        {
            UserImg:img.item(0)
        },
        {headers: { "Content-Type": "multipart/form-data" }})
        .then(async(res)=>{
            await update({...session,user:res.data.user});
            toast.success(res.data.message)
        })
        .catch((err)=>toast.error(err.data.message))
      },
    })
}