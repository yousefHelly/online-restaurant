'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import useAxiosAuth from '../hooks/useAxiosAuth';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

function useUsers(initialData: User[]) {
    useAxiosAuth()
  const {data, isLoading, isError} = useQuery<User[]>({
        queryKey:['admin','allUsers'],
        initialData:initialData,
        queryFn:()=>axiosAuth.get(`/api/Auth/GetAllUsers`).then((res)=>res.data),
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


