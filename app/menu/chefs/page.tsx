import NotFound from '@/components/layout/NotFound'
import Chefs from '@/components/menu/Chefs'
import { getChefs } from '@/lib/api/server api calls/getChefs'
import { Metadata } from 'next'
import React from 'react'


export async function generateMetadata(): Promise<Metadata> {
  const chefsData = await getChefs()
  let names: string[] = []
  chefsData?.map((ch)=>{
    names.push(ch.name)
  })
  return {
    title: 'الشيفات',
    description:`استمتع بالأطباق مقدمة من ايدي افضل الشيفات ! لدينا العديد من الشيفات في جو فاست فوود منها ${names.join('، ')}`,
    keywords:[...names],
    authors:{
      name:'جو فاست فوود',
      url:process.env.URL
    },
  }
}

async function ChefsPage() {
  const chefsData = await getChefs()
  return (
    <main className="flex min-h-screen flex-col items-start pb-20 px-24 overflow-x-hidden">
    <div className='flex flex-col gap-10 w-full my-5'>
       <div className='flex justify-between items-center dark:text-stone-300'>
       <h2 className='text-3xl'>كل الشيفات</h2>
       </div>
       {
        chefsData? <Chefs initialData={chefsData}/>:<NotFound name='شيفات'/>
       }
     </div>
 </main>
  )
}

export default ChefsPage