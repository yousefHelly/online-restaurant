'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import { useRouter } from 'next/navigation';
import useAxiosAuth from '../hooks/useAxiosAuth';
import toast from 'react-hot-toast';

function useFixedAdditions() {

  const {data, isLoading, isError} = useQuery<FixedAddition[]>({
        queryKey:['dishes','fixed additions'],
        queryFn:()=>axiosAuth.get(`/api/StaticAddition`).then((res)=>res.data),
      })
  return {data, isLoading, isError}
}

export default useFixedAdditions


export function useFixedAddition(id?: string) {
  const router = useRouter()
      const {data, isLoading, isError, isLoadingError} = useQuery<FixedAddition>({
          queryKey:['dishes','fixed additions', id],
          queryFn:()=> id? axiosAuth.get(`/api/StaticAddition/${id}`).then((res)=>res.data).catch((err)=>{toast.error(err.response.data); router.replace("/admin/side-dishes")}) : undefined as any
        })
      return {data, isLoading, isError, isLoadingError}
}

export function PostFixedAddition() {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: (FAData: { Name: string, AdditionImg: File, Price: number }): any=>{
      const formData = new FormData
      formData.append('Name', FAData.Name)
      formData.append('Price', `${FAData.Price}`)
      formData.append('AdditionImg', FAData.AdditionImg)
      axiosAuth.post(`/api/StaticAddition`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{clientQuery.invalidateQueries(['dishes','fixed additions']);toast.success((res as any).data.message);router.push('/admin/side-dishes')}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}

export function UpdateFixedAddition() {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: (FAData: { id: string ,Name?: string, AdditionImg?: File, Price?: number }): any=>{
      const formData = new FormData
      formData.append('id', `${FAData.id}`)
      FAData.Name&&formData.append('Name', FAData.Name)
      FAData.Price&&formData.append('Price', `${FAData.Price}`)
      FAData.AdditionImg&&formData.append('AdditionImg', FAData.AdditionImg)
      axiosAuth.put(`/api/StaticAddition/${FAData.id}`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{clientQuery.invalidateQueries(['dishes','fixed additions']);toast.success((res as any).data.message);router.push('/admin/side-dishes')}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}


export function DeleteFixedAddition() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ id }: { id: number }): any=>{
      axiosAuth.delete(`/api/StaticAddition/${id}`).then((res)=>{clientQuery.invalidateQueries(['dishes','fixed additions']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}