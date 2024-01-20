'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import useAxiosAuth from '../hooks/useAxiosAuth';
import toast from 'react-hot-toast';

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
    useAxiosAuth()
    return useMutation({
      mutationFn: (vals: { userId: string, role: Role }): any=>{
        axiosAuth.post(`/api/Auth/AddRole`,JSON.stringify(vals), {headers:{'Content-Type':'application/json'}}).then((res)=>{clientQuery.invalidateQueries(['admin','allUsers']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
      },
    })
  }


