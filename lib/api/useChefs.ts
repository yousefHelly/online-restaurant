'use client'
import { useQuery } from 'react-query'
import axios from './axios';

function useChefs() {
    const {data, isLoading, isError} = useQuery<Chef[]>({
        queryKey:'chefs',
        queryFn:()=>axios.get(`/api/Chef`).then((res)=>res.data)
      })
      return {data, isLoading, isError}
}

export default useChefs