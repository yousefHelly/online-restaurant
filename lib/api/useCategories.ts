'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios, {axiosAuth} from './axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAxiosAuth from '../hooks/useAxiosAuth';

export default function useCategories() {
    const {data, isLoading, isError} = useQuery<Category[]>({
        queryKey:'categories',
        queryFn:()=>axios.get(`/api/Category`).then((res)=>res.data)
      })
      return {data, isLoading, isError}
}

export function useCategory(catId?: string) {
  const router = useRouter()
    const {data, isLoading, isError, isLoadingError} = useQuery<CategoryById>({
      queryKey:'categories',
      queryFn:()=>catId?axios.get(`/api/Category/${catId}`).then((res)=>res.data).catch((err)=>{toast.error(err.response.data); router.replace("/admin/categories")}):undefined as any
    })
    return {data, isLoading, isError, isLoadingError}
}


export function PostCategory() {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: (catData: { Name: string ,CategoryImg: File }): any=>{
      const formData = new FormData
      formData.append('Name', catData.Name)
      formData.append('CategoryImg', catData.CategoryImg)
      axiosAuth.post(`/api/category`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{clientQuery.invalidateQueries(['categories']);toast.success((res as any).data.message);router.push('/admin/categories')}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}

export function UpdateCategory() {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: (catData: { id: string ,Name?: string ,CategoryImg?: File }): any=>{
      const formData = new FormData
      catData.Name&&formData.append('Name', catData.Name)
      catData.CategoryImg&&formData.append('CategoryImg', catData.CategoryImg)
      axiosAuth.put(`/api/category/${catData.id}`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{clientQuery.invalidateQueries(['categories']);toast.success((res as any).data.message);router.push('/admin/categories')}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}

export function DeleteCategory() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ id }: { id: number }): any=>{
      axiosAuth.delete(`/api/category/${id}`).then((res)=>{clientQuery.invalidateQueries(['categories']);clientQuery.invalidateQueries(['chefs']);clientQuery.invalidateQueries(['dishes']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}