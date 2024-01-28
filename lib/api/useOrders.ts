'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import useAxiosAuth from '../hooks/useAxiosAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation'
function useOrders() {
    useAxiosAuth()
    const {data, isLoading, isError} = useQuery<UserOrder[]>({
          queryKey:['orders'],
          queryFn:()=>axiosAuth.get(`/api/Order/GetAllUserOrders`).then((res)=>res.data)
        })
    return {data, isLoading, isError}
  }
  
  export default useOrders


  export function PostOrder() {
    useAxiosAuth()
    return useMutation({
      mutationFn: async ({ order }: { order:PostOrder }): Promise<PostOrderResponse>=>{
        return await axiosAuth.post(`/api/order`, order).then((res)=>res.data).catch((err)=> toast.error((err as any).response.data as string))
      },
    })
  }

  export function ConfirmOrder() {
    const router = useRouter()
    return useMutation({
      mutationFn: async ({ success, ID, token }: { success: boolean, ID?: string, token: string }): Promise<PostOrderResponse>=>{
        return await axios.post(`/api/checkout/confirm`, {success: success, ID: ID,token:token}).then((res)=>res.data).catch((err)=> {toast.error((err as any).response.data as string); router.replace("/")})
      },
    })
  }

  