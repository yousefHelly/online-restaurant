import NotFound from '@/components/layout/NotFound'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import Chefs from '@/components/menu/Chefs'
import { getChefs } from '@/lib/api/server api calls/getChefs'
import { Metadata } from 'next'
import React from 'react'


export async function generateMetadata(): Promise<Metadata> {
  const chefsData = await getChefs()
  let names: string[] = []
  chefsData?.chefs?.map((ch)=>{
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
    <main className="flex min-h-max flex-col items-start pb-5 md:pb-20 px-8 md:px-24 overflow-x-hidden">
    <PageHeaderWithoutLink header='كل الشيفات'>
       {
        chefsData? <Chefs initialData={chefsData}/>:<NotFound name='شيفات'/>
       }
     </PageHeaderWithoutLink>
 </main>
  )
}

export default ChefsPage