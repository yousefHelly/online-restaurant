import NotFound from '@/components/layout/NotFound'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import Categories from '@/components/menu/Categories'
import { getCategories } from '@/lib/api/server api calls/getCategories'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const categroiesData = await getCategories()
  let names: string[] = []
  categroiesData?.map((cat)=>{
    names.push(cat.name)
  })
  return {
    title: 'التصنيفات',
    description:`استمتع بالأطباق من كل التصنيفات ! لدينا العديد من الصتنيفات في جو فاست فوود منها ${names.join('، ')}`,
    keywords:[...names],
    authors:{
      name:'جو فاست فوود',
      url:process.env.URL
    },
  }
}

async function CategoriesPage() {
  const categroiesData = await getCategories()
  return (
    <main className="flex min-h-max flex-col items-start pb-5 md:pb-20 px-8 md:px-24 overflow-x-hidden">
        <PageHeaderWithoutLink header='كل التصنيفات'>
          {
            categroiesData?<Categories initialData={categroiesData}/>:<NotFound name='تصنيفات'/>
          }
        </PageHeaderWithoutLink>
    </main>
  )
}

export default CategoriesPage