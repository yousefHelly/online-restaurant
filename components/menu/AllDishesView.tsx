'use client'
import React from 'react'
import DishCard from '../layout/DishCard'
import NotFound from '../layout/NotFound'

type Props = {
    filterList: {categories: string[],
        chefs: string[],
        price: {
            from: string,
            to: string,
        }
        search: string},
    cardView: 'grid'|'row',
    dishes: {
        data: Dishes | undefined;
        isLoading: boolean;
        isError: boolean;
    }
}

function AllDishesView({filterList, cardView, dishes}: Props) {
  return (
    <div className='col-span-full lg:col-span-3 flex flex-col p-1 my-2 gap-2'>
    <h2 className='text-xl lg:text-2xl col-span-3 font-bold font-header text-header dark:text-stone-400 m-2'>
    عرض
    {filterList.search!=''?<span> كل &apos;{filterList.search}&apos; </span>:<span> كل الأطباق </span>}
    {filterList.chefs.length>0&&<span> للشيف {filterList.chefs.join(' ، ')} </span>}
    {filterList.categories.length>0&&<span> ضمن تصنيف {filterList.categories.join(' ، ')} </span>}
    {filterList.price.from!=''&&<span> في نطاق سعر من {filterList.price.from}ج الي {filterList.price.to}ج</span>}
    </h2>
    <div className={`grid ${cardView==='row'?'grid-cols-1 gap-5':'lg:grid-cols-3 gap-4'} p-1`}>
      {
        dishes&&dishes.data?.meals&&dishes.data.meals.length>0?dishes.data.meals.map((dish, i)=>{
          return(
            <DishCard id={dish.id!} key={dish.name} name={dish.name} category={dish.categoryName} chef={dish.chefName} price={dish.price} rating={dish.rate} ratingCount={dish.numOfRate} image={dish.mealImgUrl} oldPrice={dish.oldPrice} cardView={cardView} favourate={dish.isFavourite}/>
          )
        }):<NotFound name='أطباق'/>
      }
    </div>
  </div>
  )
}

export default AllDishesView