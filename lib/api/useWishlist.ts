'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

function useWishlist() {

  const {data, isLoading, isError} = useQuery<Wishlist>({
        queryKey:['dishes', 'wishlist'],
        queryFn:()=>axiosAuth.get(`/api/wishlist`).then((res)=>res.data)
      })
  return {data, isLoading, isError}
}

export default useWishlist


export function ToggleWishlist() {
  const clientQuery = useQueryClient()
  const {data:session} = useSession()
  return useMutation({
    mutationFn: ({ id, isFavourite }: { id: number, isFavourite: boolean }): any=>{
      session?.user?
        isFavourite?
        axiosAuth.delete(`/api/wishlist/${id}`).then((res)=>{toast.success(res.data.message)})
        :axiosAuth.post(`/api/wishlist/${id}`).then((res)=>{toast.success(res.data.message)})
      :toast.error('يجب عليك تسجيل الدخول لتتمكن من إضافة الطبق الي المفضلة', {id:'signinRequired'})   
    },
    onSuccess:()=>{
      clientQuery.invalidateQueries(['dishes', 'wishlist'])
      clientQuery.invalidateQueries(['dish'])
    }
  })
}