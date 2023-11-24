'use client'
import { Query, QueryKey, useQuery } from 'react-query'
import { axiosAuth } from './axios';

function useDish(mealName: string, refetch?: (boolean|number)) {

  const {data, isLoading} = useQuery<Dish>({
        queryKey:['dish', mealName],
        queryFn:async ()=>(await axiosAuth.get(`/api/meal?name=${mealName}`)).data,
        refetchInterval:(typeof refetch === 'boolean' ? refetch : false) as number | false | ((data: Dish | undefined, query: Query<Dish, unknown, Dish, QueryKey>) => number | false) | undefined
      })
  return {data, isLoading}
}

export default useDish