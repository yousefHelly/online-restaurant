'use client'
import React from 'react'
import { Category } from './Category'
import useCategories from '@/lib/api/useCategories'
import LoadingErrorFetching from '../layout/LoadingErrorFetching'
import NotFound from '../layout/NotFound'

type Props = {
  count?: 'all' | number
}



function Categories({count = 'all'}: Props) {
  const {data, isLoading, isError} = useCategories()
  return (
    <>
    <LoadingErrorFetching data={data} isLoading={isLoading} isError={isError} name='تصنيفات'/>
    <div className='grid grid-cols-5 gap-5 w-full'>
      {
        count!='all'?data&&data.length>0?data.map((category, i)=>{
          return(
            i+1<=count&&<Category key={i}   name={category.name}  image={category.categoryImg} amount={category.numOfMeals} chefs={category.numOfChefs}/>
          )
        }):(!isLoading&& !isError)&&<NotFound name='تصنيفات'/>:data&&data.length>0?data.map((category, i)=>{
          return(
            <Category key={i} name={category.name}  image={category.categoryImg} amount={category.numOfMeals} chefs={category.numOfChefs}/>
          )
          }):(!isLoading&& !isError)&&<NotFound name='تصنيفات'/>
      }
    </div>
    </>
  )
}

export default Categories