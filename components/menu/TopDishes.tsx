'use client'
import React from 'react'
import useDishes from '@/lib/api/useDishes'
import DishCard from '@/components/layout/DishCard'
import useWishlist from '@/lib/api/useWishlist'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import NotFound from '../layout/NotFound'
import LoadingErrorFetching from '../layout/LoadingErrorFetching'

function TopDishes({filter, cardView='grid', dataFrom='filter'}:{filter: Sort, cardView?:'grid' | 'row', dataFrom?: 'filter' | 'wishlist'}) {
  useAxiosAuth()
    let {data, isLoading, isError} = useDishes(undefined,undefined,undefined,undefined,undefined,undefined,undefined, filter)
    let WishList = useWishlist()
    const Data = dataFrom==='wishlist'? WishList.data?.[0]: data as Dishes
    if(isError && !isLoading){
      return <LoadingErrorFetching data={Data} isError={isError} isLoading={isLoading} name='أطباق'/>
    }
  return (
    <>
    <LoadingErrorFetching data={data} isError={isError} isLoading={isLoading} name='أطباق'/>
    <div className={`w-full grid ${cardView==='grid'?'md:grid-cols-2 lg:grid-cols-4 ':''} gap-4 p-1`}>
    {
      Data?.meals&&Data.meals.length>0?Data.meals.map((dish, i)=>{
        return(
          <DishCard i={i} key={dish.name} name={dish.name} category={dish.categoryName} chef={dish.chefName} price={dish.price} rating={dish.rate} ratingCount={dish.numOfRate} image={dish.mealImgUrl} oldPrice={dish.oldPrice} cardView={cardView} favourate={dataFrom==='wishlist'&&true}/>
        )
      }):(!isLoading&&!isError)&&<NotFound name='أطباق'/>
    }
    {
      Data?.meals&&Data?.meals.length>1&&<button className={`${cardView==='grid'?'md:col-span-2 lg:col-span-4':''} w-24 mx-auto text-slate-50 font-bold bg-main px-3 py-2 rounded-2xl mt-5 transition duration-150 hover:bg-transparent hover:text-main`}>المزيد!</button>
    }
  </div>
  </>
  )
}

export default TopDishes