'use client'
import React from 'react'
import { Chef } from './Chef'
import useChefs from '@/lib/api/useChefs'
import LoadingErrorFetching from '../layout/LoadingErrorFetching'
import NotFound from '../layout/NotFound'
import { PlusSquare } from 'lucide-react'
import Link from 'next/link';

type Props = {
  count?: 'all' | number,
  admin?: boolean
}

function Chefs({count = 'all', admin}: Props) {
  const {data, isLoading, isError} = useChefs()
  
  return (
    <>
    <LoadingErrorFetching data={data} isLoading={isLoading} isError={isError} name='شيفات'/>
    <div className={`grid grid-cols-${count==='all'?4:count} gap-5 w-full`}>
      {
        !admin&&
          count!='all'?data&&data.length>0?data.map((chef, i)=>{
            return i+1<=count&&<Chef key={chef.name} name={chef.name} category={chef.categoryName} mealsCount={chef.numOfMeals} rating={chef.rate} image={chef.chefImgUrl} rateNum={chef.numOfRate}/>
          }):(!isLoading && !isError)&&<NotFound name='شيفات'/>:!admin&&data&&data.length>0?data.map((chef)=>{
            return <Chef key={chef.name} name={chef.name} category={chef.categoryName} mealsCount={chef.numOfMeals} rating={chef.rate} image={chef.chefImgUrl} rateNum={chef.numOfRate}/>
          }):(!isLoading&& !isError && !admin)&&<NotFound name='شيفات'/>
      }
      {
        (admin && !isLoading)&&<Link href={`/admin/chefs/new`} className='group h-[350px] bg-main/25 rounded-md transition duration-150 hover:bg-transparent col-span-full md:col-span-1'>
        <div className='h-full rounded-md overflow-hidden relative flex flex-col gap-3 items-center justify-center'>
            <PlusSquare size={28}/>
            <p className='text-xl font-bold font-header'>شيف جديد</p>
        </div>
      </Link>
      }
      {
        admin&&data&&data.length>0&&data.map((chef)=>{
          return <Chef key={chef.name} name={chef.name} category={chef.categoryName} mealsCount={chef.numOfMeals} rating={chef.rate} image={chef.chefImgUrl} rateNum={chef.numOfRate}/>
        })
      }
    </div>
    </>
  )
}

export default Chefs