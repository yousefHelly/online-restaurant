'use client'
import DishCard from '@/components/layout/DishCard'
import LoadingErrorFetching from '@/components/layout/LoadingErrorFetching'
import NotFound from '@/components/layout/NotFound'
import useWishlist from '@/lib/api/useWishlist'
import React from 'react'

type Props = {}

function FavouriteDishes({}: Props) {
    let {data, isError, isLoading} = useWishlist()
    if(isError && !isLoading){
        return <LoadingErrorFetching data={data} isError={isError} isLoading={isLoading} name='أطباق'/>
      }
  return (
    <div>
    {
      data&&data[0].meals.length>0?data[0].meals.map((dish, i)=>{
        return(
          <DishCard i={i} key={dish.name} name={dish.name} category={dish.categoryName} chef={dish.chefName} price={dish.price} rating={dish.rate} ratingCount={dish.numOfRate} image={dish.mealImgUrl} oldPrice={dish.oldPrice} cardView={'row'} favourate={dish.isFavourite==='true'}/>
        )
      }):(!isLoading&&!isError)&&<NotFound name='أطباق'/>
    }
    </div>
  )
}

export default FavouriteDishes