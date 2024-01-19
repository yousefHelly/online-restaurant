'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import useAxiosAuth from '../hooks/useAxiosAuth';

function useOrder() {
    useAxiosAuth()
    const {data, isLoading, isError} = useQuery<Wishlist>({
          queryKey:['order', 'wishlist'],
          queryFn:()=>axiosAuth.get(`/api/wishlist`).then((res)=>res.data)
        })
    return {data, isLoading, isError}
  }
  
  export default useOrder


  export function PostOrder() {
    useAxiosAuth()
    return useMutation({
      mutationFn: async ({ order }: { order:PostOrder }): Promise<PostOrderResponse>=>{
        return await axiosAuth.post(`/api/order`, order).then((res)=>res.data).catch((err)=> toast.error((err as any).response.data as string))
      },
    })
  }