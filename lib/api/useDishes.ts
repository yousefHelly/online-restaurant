'use client'
import { useQuery } from 'react-query'
import { axiosAuth } from './axios';
import useAxiosAuth from '../hooks/useAxiosAuth';

function useDishes(category?: string, name?: string, chef?: string, from?: number, to?: number, page?: number, pageSize?: number, order?: string, initialData?: Dishes) {
  useAxiosAuth()
  const {data, isLoading, isError} = useQuery<Dishes>({
        queryKey:'dishes',
        initialData:initialData,
        queryFn:()=>axiosAuth.get(`/api/Filter?${category?`Category=${category}`:''}&${name?`MealName=${name}`:''}&${chef?`ChefName=${chef}`:''}&${from?`FromPrice=${from!=0?from:1}`:''}&${to?`ToPrice=${to}`:''}&${page?`Page=${page}`:''}&${pageSize?`Size=${pageSize}`:''}&${order?`OrderMeal=${order}`:''}`).then((res)=>res.data)
      })
  return {data, isLoading, isError}
}

export default useDishes