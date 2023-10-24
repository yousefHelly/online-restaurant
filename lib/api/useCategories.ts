'use client'
import { useQuery } from 'react-query'
import axios from './axios';

function useCategories() {
    const {data, isLoading, isError} = useQuery<Category[]>({
        queryKey:'categories',
        queryFn:()=>axios.get(`/api/Category`).then((res)=>res.data)
      })
      return {data, isLoading, isError}
}

export default useCategories