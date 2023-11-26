'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios, {axiosAuth} from './axios';
import toast from 'react-hot-toast';

export default function useCategories() {
    const {data, isLoading, isError} = useQuery<Category[]>({
        queryKey:'categories',
        queryFn:()=>axios.get(`/api/Category`).then((res)=>res.data)
      })
      return {data, isLoading, isError}
}


export function DeleteCategory() {
  const clientQuery = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number }): any=>{
      axiosAuth.delete(`/api/category/${id}`).then((res)=>{clientQuery.invalidateQueries(['categories']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}