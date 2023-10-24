'use client'
import React from 'react'
import { Chef } from './Chef'
import useChefs from '@/lib/api/useChefs'
import LoadingErrorFetching from '../layout/LoadingErrorFetching'
import NotFound from '../layout/NotFound'

type Props = {
  count?: 'all' | number
}

function Chefs({count = 'all'}: Props) {
  const {data, isLoading, isError} = useChefs()
  
  return (
    <>
    <LoadingErrorFetching data={data} isLoading={isLoading} isError={isError} name='شيفات'/>
    <div className={`grid grid-cols-${count==='all'?4:count} gap-5 w-full`}>
      {
        count!='all'?data&&data.length>0?data.map((chef, i)=>{
          return i+1<=count&&<Chef key={chef.name} name={chef.name} category={chef.categoryName} mealsCount={chef.numOfMeals} rating={chef.rate} image={chef.chefImgUrl} rateNum={chef.numOfRate}/>
        }):(!isLoading && !isError)&&<NotFound name='شيفات'/>:data&&data.length>0?data.map((chef)=>{
          return <Chef key={chef.name} name={chef.name} category={chef.categoryName} mealsCount={chef.numOfMeals} rating={chef.rate} image={chef.chefImgUrl} rateNum={chef.numOfRate}/>
        }):(!isLoading&& !isError)&&<NotFound name='شيفات'/>
      }
    </div>
    </>
  )
}

export default Chefs