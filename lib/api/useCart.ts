import { useQuery } from 'react-query'
import axios from './axios';

function useCart() {
    const {data, isLoading, isError} = useQuery<{
          cartMeals: 
            {
              id: number,
              name: string,
              price: number,
              mealImgUrl: string,
              chefId: number,
              categoryId: number
            }[]
          
      }>({
        queryKey:'cart',
        queryFn:()=>axios.get(`/api/cart`).then((res)=>res.data)
      })
      return {data, isLoading, isError}
}

export default useCart