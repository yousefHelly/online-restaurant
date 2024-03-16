'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import useAxiosAuth from '../hooks/useAxiosAuth';
import toast from 'react-hot-toast';

function useAddress() {

  const {data, isLoading, isError} = useQuery<Addresses>({
        queryKey:['profile','address'],
        queryFn:()=>axiosAuth.get(`/api/Address?page=1&size=16`).then((res)=>res.data),
      })
  return {data, isLoading, isError}
}


export function PostAddress() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ vals }: { vals:{ street: string, city: string, departmentNum: number, phoneNumber: string } }): any=>{
      axiosAuth.post(`/api/Address`, vals).then((res)=>{clientQuery.invalidateQueries(['profile','address']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}



export function UpdateAddress() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ id, vals }: { id: number, vals:{ street: string, city: string, departmentNum: number, phoneNumber: string } }): any=>{
      axiosAuth.put(`/api/Address/${id}`, vals).then((res)=>{clientQuery.invalidateQueries(['profile','address']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}

export function DeleteAddress() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ id }: { id: number }): any=>{
      axiosAuth.delete(`/api/Address/${id}`).then((res)=>{clientQuery.invalidateQueries(['profile','address']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}


export default useAddress