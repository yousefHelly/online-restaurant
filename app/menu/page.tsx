import Categories from '@/components/menu/Categories'
import Link from 'next/link'
import React from 'react'
import {ArrowLeft} from 'lucide-react'
import Chefs from '@/components/menu/Chefs'
import TopDishes from '@/components/menu/TopDishes'
import { Metadata } from 'next'
import { getChefs } from '@/lib/api/server api calls/getChefs'
import { getCategories } from '@/lib/api/server api calls/getCategories'
import NotFound from '@/components/layout/NotFound'

export const metadata: Metadata = {
  title: 'قائمة الطعام',
}

function FilterationTypeHeader({filter, link, children}:{filter: string,link: string, children:React.ReactNode}){
return (
  <div className='flex flex-col gap-10 w-full my-5'>
    <div className='flex justify-between items-center dark:text-stone-300'>
    <h2 className='text-3xl'>إختر طبقك حسب {filter}</h2>
    <Link className='flex justify-between items-center gap-3 transition duration-150 hover:text-main' href={`/menu/${link}`}>كل {filter}ات
    <ArrowLeft size={21}/>
    </Link>
    </div>
      {children}
  </div>
)
}

async function MenuPage() {
  const chefsData = await getChefs()
  const categroiesData = await getCategories()
  return (
    <main className="flex min-h-screen flex-col items-start pb-10 px-24 overflow-x-hidden">
        <FilterationTypeHeader filter='التصنيف' link='categories'>
          {categroiesData?<Categories count={5} initialData={categroiesData}/>:<NotFound name='تصنيفات'/>}
        </FilterationTypeHeader>
        <FilterationTypeHeader filter='الشيف' link='chefs'>
          {chefsData?<Chefs count={4} initialData={chefsData}/>:<NotFound name='شيفات'/>}
        </FilterationTypeHeader>
        <div className='flex flex-col gap-10 w-full my-5'>
          <div className='flex justify-between items-center dark:text-stone-300'>
          <h2 className='text-3xl'>الأطباق الأعلي تقييماً</h2>
          <Link className='flex justify-between items-center gap-3 transition duration-150 hover:text-main' href={`/menu/all-dishes`}>كل الأطباق
          <ArrowLeft size={21}/>
          </Link>
          </div>
          <TopDishes filter='RD'/>
        </div>
  </main>
  )
}

export default MenuPage