import Categories from '@/components/menu/Categories'
import Link from 'next/link'
import React from 'react'
import {ArrowLeft} from 'lucide-react'
import Chefs from '@/components/menu/Chefs'
import TopDishes from '@/components/menu/TopDishes'
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

function MenuPage() {
  return (
    <main className="flex min-h-screen flex-col items-start pb-10 px-24 overflow-x-hidden">
        <FilterationTypeHeader filter='التصنيف' link='categories'>
          <Categories count={5}/>
        </FilterationTypeHeader>
        <FilterationTypeHeader filter='الشيف' link='chefs'>
          <Chefs count={4}/>
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