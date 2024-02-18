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
import { getDishes } from '@/lib/api/server api calls/getDishes'

export async function generateMetadata(): Promise<Metadata> {
  const categroiesData = await getCategories()
  let catnames: string[] = []
  categroiesData?.map((cat)=>{
    catnames.push(cat.name)
  })
  const chefsData = await getChefs()
  let chefsnames: string[] = []
  chefsData?.map((chef)=>{
    chefsnames.push(chef.name)
  })
  const dishesData = await getDishes()
  let dishesnames: string[] = []
  dishesData?.meals.map((meal)=>{
    dishesnames.push(meal.name)
  })
  return {
    title: 'قائمة الطعام',
    description:`استمتع بالأطباق من كل التصنيفات ! لدينا العديد من الصتنيفات في جو فاست فوود منها ${catnames.join('، ')} ، كما ان لدينا العديد من الشيفات المتميزين مثل ${chefsnames.join('، ')} . هؤلاء الشيفات المميزون يقدمون العديد من الأطباق اللذيذة مثل ${dishesnames.join('، ')}`,
    keywords:[...catnames, ...chefsnames, ...dishesnames],
    authors:{
      name:'جو فاست فوود',
      url:process.env.URL
    },
  }
}

function FilterationTypeHeader({filter, link, children}:{filter: string,link: string, children:React.ReactNode}){
return (
  <div className='flex flex-col gap-10 w-full my-5'>
    <div className='flex justify-between items-center dark:text-stone-300'>
    <h2 className='text-xl md:text-3xl'>إختر طبقك حسب {filter}</h2>
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
  const dishesData = await getDishes(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'RD')
  return (
    <main className="flex min-h-max flex-col items-start pb-5 md:pb-10 px-8 md:px-24 overflow-x-hidden">
        <FilterationTypeHeader filter='التصنيف' link='categories'>
          {categroiesData?<Categories count={5} initialData={categroiesData}/>:<NotFound name='تصنيفات'/>}
        </FilterationTypeHeader>
        <FilterationTypeHeader filter='الشيف' link='chefs'>
          {chefsData?<Chefs count={4} initialData={chefsData}/>:<NotFound name='شيفات'/>}
        </FilterationTypeHeader>
        <div className='flex flex-col gap-10 w-full my-5'>
          <div className='flex justify-between items-center dark:text-stone-300'>
          <h2 className='text-xl md:text-3xl'>الأطباق الأعلي تقييماً</h2>
          <Link className='flex justify-between items-center gap-3 transition duration-150 hover:text-main' href={`/menu/all-dishes`}>كل الأطباق
          <ArrowLeft size={21}/>
          </Link>
          </div>
          <TopDishes filter='RD' initialData={dishesData}/>
        </div>
  </main>
  )
}

export default MenuPage