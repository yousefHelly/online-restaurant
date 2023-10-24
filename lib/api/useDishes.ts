'use client'
import { useQuery } from 'react-query'
import axios from './axios';

function useDishes(category?: string, name?: string, chef?: string, from?: number, to?: number, page?: number, pageSize?: number, order?: string) {

  const {data, isLoading, isError} = useQuery<Dishes>({
        queryKey:'dishes',
        queryFn:category|| name || chef || from || to || page || pageSize || order?()=>axios.get(`/api/Filter?${category?`Category=${category}`:''}&${name?`MealName=${name}`:''}&${chef?`ChefName=${chef}`:''}&${from?`FromPrice=${from!=0?from:1}`:''}&${to?`ToPrice=${to}`:''}&${page?`Page=${page}`:''}&${pageSize?`Size=${pageSize}`:''}&${order?`OrderMeal=${order}`:''}`).then((res)=>res.data):()=>axios.get(`/api/Meal`).then((res)=>res.data)
      })
  return {data, isLoading, isError}
}

export default useDishes