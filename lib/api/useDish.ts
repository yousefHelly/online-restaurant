'use client'
import { useQuery } from 'react-query'
import { axiosAuth } from './axios';

function useDish(mealName: string) {

  const {data, isLoading} = useQuery<Dish>({
        queryKey:['dish', mealName],
        queryFn:async ()=>(await axiosAuth.get(`/api/meal?name=${mealName}`)).data,
        refetchInterval:1500
      })
  return {data, isLoading}
}

export default useDish