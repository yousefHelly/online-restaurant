'use client'

import toast from "react-hot-toast"
import useAxiosAuth from "../hooks/useAxiosAuth"
import { axiosAuth } from "./axios"
import { useMutation } from "react-query"
import { PasswordUpdate } from "@/model/PasswordUpdate"
import { signOut, useSession } from "next-auth/react"
import { User } from "@/model/Profile"
import { useRouter } from "next/router"

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

export function DeleteProfileImage() {
  useAxiosAuth()
  const {data:session, update} = useSession()
  return useMutation({
    mutationFn: (): any=>{
      axiosAuth.delete(`/api/Auth/DeleteImage`)
      .then(async(res)=>{
        toast.success(res.data) 
      }).then(async()=>{
        await update({...session,user:{
          ...session?.user,
          userImgUrl:null,
        }}).then((res)=>console.log(res)
        )
      }).catch((err)=>toast.error(err.data))
    },
  })
}

export function DeleteAccount() {
  useAxiosAuth()
  return useMutation({
    mutationFn: (): any=>{
      axiosAuth.delete(`/api/Auth/DeleteAccount`)
      .then((res)=>{
        toast.success(res.data)
        signOut({redirect:true})
      }).catch((err)=>toast.error(err.data))
    },
  })
}