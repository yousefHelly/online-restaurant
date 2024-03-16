'use client'
import DishCard from '@/components/layout/DishCard'
import LoadingErrorFetching from '@/components/layout/LoadingErrorFetching'
import NotFound from '@/components/layout/NotFound'
import PaginationProvider from '@/lib/PaginationProvider'
import useWishlist from '@/lib/api/useWishlist'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

function FavouriteDishes({}: Props) {
  const {get} = useSearchParams()
    let {data, isError, isLoading} = useWishlist(parseInt(get('page') || '1'))
    if(isLoading){
        return <LoadingErrorFetching data={data} isError={isError} isLoading={isLoading} name='أطباق'/>
      }
  return (
    <PaginationProvider totalPages={data?.numOfPages || 1} showPagination={data&&data.wishListMeals?.[0]?.meals?.length>0}>
    {
      data?.wishListMeals[0].meals&&data?.wishListMeals[0].meals.length>0?data?.wishListMeals[0].meals.map((dish, i)=>{
        return(
          <DishCard id={dish.id} key={dish.name} name={dish.name} category={dish.categoryName} chef={dish.chefName} price={dish.price} rating={dish.rate} ratingCount={dish.numOfRate} image={dish.mealImgUrl} oldPrice={dish.oldPrice} cardView={'row'} favourate={dish.isFavourite}/>
        )
      }):(!isLoading&&!isError)&&<NotFound name='أطباق'/>
    }
    </PaginationProvider>
  )
}

export default FavouriteDishes