'use client'
import { useMutation } from "react-query"
import axios from "./axios"
import { Register } from "@/model/Register";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export const useRegister = ()=>{
    return useMutation({
        mutationFn: async (vals:Register)=> {
            const bodyFormData = new FormData();
            bodyFormData.append('FirstName', vals.firstName)
            bodyFormData.append('LastName', vals.lastName)
            bodyFormData.append('UserName', vals.userName)
            bodyFormData.append('Email', vals.email)
            bodyFormData.append('Password', vals.password)
            await axios.post('/api/Auth/register',bodyFormData,{headers: { "Content-Type": "multipart/form-data" }})
            .then((res)=>{toast.success(res.data)})
            .catch((err)=> toast.error((err as any).response.data as string))   
        }
    })
}

export const useVerify = ()=>{
    return useMutation({
        mutationFn: async ({email, password, verificationCode}:{email: string, password: string,verificationCode: string})=> {
            await axios.post('/api/Auth/verifyAccount',{email, verificationCode})
            .then((res)=>{
                toast.success('تم تأكيد حسابك بنجاح!')
            }).then(()=>signIn("credentials",{ email, password, redirect:false }))
            .catch((err)=> toast.error((err as any).response.data as string))   
        }
    })
}

export const useResendEmail = ()=>{
    return useMutation({
        mutationFn: async ({email}:{email: string})=> {
            await axios.post('/api/Auth/ResendVerificationCode', {email})
            .then((res)=>{toast.success(res.data)})
            .catch((err)=> toast.error((err as any).response.data as string))   
        }
    })
}

export const useSendResetPasswordEmail = ()=>{
    return useMutation({
        mutationFn: async ({email}:{email: string})=> {
            await axios.post('/api/Auth/ForgetPassword', {email})
            .then((res)=>{toast.success(res.data)})
            .catch((err)=> toast.error((err as any).response.data as string))   
        }
    })
}

export const useResetPassword = ()=>{
    const router = useRouter()
    return useMutation({
        mutationFn: async ({token, email, newPassword}:{token: string,email: string, newPassword: string})=> {
            await axios.post('/api/Auth/ResetPassword', {token, email, newPassword})
            .then((res)=>{
                toast.success(res.data)
                router.replace('/login')
            })
            .catch((err)=> toast.error((err as any).response.data as string))   
        }
    })
}