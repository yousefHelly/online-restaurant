import CategoryForm from '@/components/(Admin)/categories/CategoryForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { getCategory } from '@/lib/api/server api calls/getCategory'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
type Props = {
  params:{
      id: string
  }
}
export async function generateMetadata({params:{id}}:Props): Promise<Metadata> {
  const categoryData = await getCategory(id)
  if(!categoryData){
    return {
      title: 'تعديل تصنيف غير موجود',
    }
  }
  return {
    title:`تعديل تصنيف ${categoryData.name}`,
    keywords:["go fast food", "جو فاست فوود", categoryData.name]
  }
} 
async function UpdateCategoryPage({params:{id}}:Props) {
  const categoryData = await getCategory(id)
  if(!categoryData){
    return notFound()
  }
  return (
    <PageHeaderWithoutLink header={`تعديل التصنيف ${categoryData.name} `}>
      <CategoryForm id={id} categoryData={categoryData}/>
    </PageHeaderWithoutLink>
  )
}

export default UpdateCategoryPage