'use client'
import { useQuery } from 'react-query'
import { axiosAuth } from './axios';

function useAddress() {

  const {data, isLoading, isError} = useQuery<Address[]>({
        queryKey:['profile','address'],
        queryFn:()=>axiosAuth.get(`/api/Address`).then((res)=>res.data),
        refetchInterval:1500
      })
  return {data, isLoading, isError}
}

export default useAddress