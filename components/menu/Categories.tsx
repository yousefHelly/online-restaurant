'use client'
import React from 'react'
import { Category } from './Category'
import useCategories from '@/lib/api/useCategories'
import LoadingErrorFetching from '../layout/LoadingErrorFetching'
import NotFound from '../layout/NotFound'
import AdminCategory from '../(Admin)/categories/AdminCategory'
import Link from 'next/link'
import { PlusSquare } from 'lucide-react'

type Props = {
  count?: 'all' | number,
  admin?: boolean
}



function Categories({count = 'all', admin}: Props) {
  const {data, isLoading, isError} = useCategories()
  return (
    <>
    <LoadingErrorFetching data={data} isLoading={isLoading} isError={isError} name='تصنيفات'/>
    <div className='grid grid-cols-5 gap-5 w-full'>
      {
        (!admin && count!='all')?data&&data.length>0?data.map((category, i)=>{
          return(
            i+1<=count&&<Category key={i}   name={category.name}  image={category.categoryImg} amount={category.numOfMeals} chefs={category.numOfChefs}/>
          )
        }):(!admin && !isLoading&& !isError)&&<NotFound name='تصنيفات'/>:!admin && data&&data.length>0?data.map((category, i)=>{
          return(
            <Category key={i} name={category.name}  image={category.categoryImg} amount={category.numOfMeals} chefs={category.numOfChefs}/>
          )
          }):(!admin && !isLoading&& !isError)&&<NotFound name='تصنيفات'/>
      }
      {
        admin&&!isLoading &&
        <Link href={`/admin/categories/new`} className='flex flex-col gap-3 justify-center items-center bg-main/20 p-5 rounded-2xl transition duration-150 hover:bg-transparent dark:text-stone-300 dark:hover:text-main hover:text-main cursor-pointer overflow-hidden shadow-md hover:shadow-none'>
            <PlusSquare size={28}/>
            <p className='text-xl font-bold font-header'>تصنيف جديد</p>
        </Link>
      }
      {
        (admin && count==='all')&&data&&data.length>0?data.map((category, i)=>{
          return(
            <AdminCategory key={i} id={category.id} name={category.name}  image={category.categoryImg} amount={category.numOfMeals} chefs={category.numOfChefs}/>
          )
        }):(!isLoading&& !isError)&&<NotFound name='تصنيفات'/>
      }
    </div>
    </>
  )
}

export default Categories