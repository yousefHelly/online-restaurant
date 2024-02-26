'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios, { axiosAuth } from './axios';
import { useRouter } from 'next/navigation';
import useAxiosAuth from '../hooks/useAxiosAuth';
import toast from 'react-hot-toast';
import { revalidateChefs } from '@/app/action';
import { startTransition } from 'react';

function useChefs(initialData?: Chef[]) {
    const {data, isLoading, isError} = useQuery<Chef[]>({
        queryKey:'chefs',
        initialData:initialData,
        queryFn:()=>axios.get(`/api/Chef/GetAllChefs`).then((res)=>res.data)
      })
      return {data, isLoading, isError}
}

export default useChefs


export function useChef(id: string|undefined) {
  const router = useRouter()
    const {data, isLoading, isError, isLoadingError} = useQuery<ChefById>({
      queryKey:['chefs', id],
      queryFn:()=> id? axios.get(`/api/Chef/${id}`).then((res)=>res.data).catch((err)=>{toast.error(err.response.data); router.replace("/admin/chefs")}) : undefined as any
    })
    const chefs =  useChefs()
    if(id){
      const chef = chefs.data?.find((chef)=>chef.id===+id)
      const chefCateogryName = chef?.categoryName
      const queriedChef = {
        ...data,
        categoryName:chefCateogryName
      }
      return {queriedChef, isLoading, isError, isLoadingError}
    }
}

export function useChefsInCategory(id: number|undefined) {
    const {data, isLoading, isError} = useQuery<Chef[]>({
      queryKey:['chefsInCategory', id],
      queryFn:()=> id? axios.get(`/api/Chef/GetChefsByCategoryId/${id}`).then((res)=>res.data) : undefined as any
    })
    return {data, isLoading, isError}
}


export function GetChefsInCategory() {
  useAxiosAuth()
  return useMutation({
    mutationFn: ({categoryId}:{categoryId: number}): any=>{
      return axios.get(`/api/Chef/GetChefsByCategoryId/${categoryId}`).then((res)=> res.data)
    },
  })
}



export function PostChef() {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: (chefData: { Name: string ,ChefImg: File, CategoryId: number }): any=>{
      const formData = new FormData
      formData.append('Name', chefData.Name)
      formData.append('CategoryId', `${chefData.CategoryId}`)
      formData.append('ChefImg', chefData.ChefImg)
      axiosAuth.post(`/api/chef`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{clientQuery.invalidateQueries(['chefs']);toast.success((res as any).data.message);router.push('/admin/chefs')}).catch((err)=> toast.error((err as any).response.data as string))
    },
    onSuccess(data, variables, context) {
      startTransition(()=>{
        revalidateChefs()
      })
    },
  })
}
export function UpdateChef() {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: (chefData: { id: number, Name?: string, ChefImg?: File, CategoryId?: number }): any=>{
      const formData = new FormData
      chefData.Name&&formData.append('Name', chefData.Name)
      chefData.CategoryId&&formData.append('CategoryId', `${chefData.CategoryId}`)
      chefData.ChefImg&&formData.append('ChefImg', chefData.ChefImg)
      axiosAuth.put(`/api/chef/${chefData.id}`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{clientQuery.invalidateQueries(['chefs']);toast.success((res as any).data.message);router.push('/admin/chefs')}).catch((err)=> toast.error((err as any).response.data as string))
    },
    onSuccess(data, variables, context) {
      startTransition(()=>{
        revalidateChefs()
      })
    },
  })
}


export function DeleteChef() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ id }: { id: number }): any=>{
      axiosAuth.delete(`/api/chef/${id}`).then((res)=>{clientQuery.invalidateQueries(['chefs']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
    onSuccess(data, variables, context) {
      startTransition(()=>{
        revalidateChefs()
      })
    },
  })
}