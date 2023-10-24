'use client'
import { useQuery } from 'react-query'
import { axiosAuth } from './axios';

function useWishlist() {

  const {data, isLoading, isError} = useQuery<Wishlist>({
        queryKey:['dishes', 'wishlist'],
        queryFn:()=>axiosAuth.get(`/api/wishlist`).then((res)=>res.data)
      })
  return {data, isLoading, isError}
}

export default useWishlist