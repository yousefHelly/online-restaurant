'use client'
import { Query, QueryKey, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function useDish(mealName: string, refetch?: (boolean|number)) {
  useAxiosAuth()
  const router = useRouter()
  const {data, isLoading} = useQuery<Dish>({
        queryKey:['dish', mealName],
        queryFn:async ()=>(await axiosAuth.get(`/api/meal?name=${mealName}`)).data,
        refetchInterval:(typeof refetch === 'boolean' ? refetch : 1500) as number | false | ((data: Dish | undefined, query: Query<Dish, unknown, Dish, QueryKey>) => number | false) | undefined,
        onError:()=>{
          toast.error('لا يوجد طبق بهذا الاسم')
          router.replace('/')
        }
      })
  return {data, isLoading}
}

export default useDish