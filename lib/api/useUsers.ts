'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';

function useUsers(initialData: {users:User[]}&WithPagination, page?: number, size?: number) {
    useAxiosAuth()
  const {data, isLoading, isError} = useQuery<{users:User[]}&WithPagination>({
        queryKey:['admin','allUsers'],
        initialData:initialData,
        queryFn:()=>axiosAuth.get(`/api/Auth/GetAllUsers?Page=${page??1}&Size=${size??8}`).then((res)=>res.data),
      })
  return {data, isLoading, isError}
}
export default useUsers

export function ChangeRole() {
    const clientQuery = useQueryClient()
    const {data:s}= useSession()
    useAxiosAuth()
    return useMutation({
      mutationFn: async(vals: { userId: string, role: Role }):Promise<boolean>=>{
        if(vals.role === 'Admin'){
          return await axiosAuth.post(`/api/Auth/AddRole`,JSON.stringify(vals), {headers:{'Content-Type':'application/json', Authorization:`Bearer ${s?.user.token}`}}).then((res)=>true).catch((err)=>false)
        } else {
          return await axiosAuth.delete(`/api/Auth/RemoveRole/${vals.userId}`, {headers:{'Content-Type':'application/json', Authorization:`Bearer ${s?.user.token}`}}).then((res)=>true).catch((err)=>false)
        }
      },
    })
  }


