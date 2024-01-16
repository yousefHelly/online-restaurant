import ChefForm from '@/components/(Admin)/chefs/ChefForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { getChef } from '@/lib/api/server api calls/getChef'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({params:{id}}:{params:{id: string}}): Promise<Metadata> {
  const chefData = await getChef(id)
  if(!chefData){
    return {
      title: 'تعديل شيف غير موجود',
    }
  }
  return {
    title:`تعديل شيف ${chefData.name}`,
    keywords:["go fast food", "جو فاست فوود", chefData.name]
  }
} 
async function UpdateChefPage({params:{id}}:{params:{id: string}}) {
  const chefData = await getChef(id)
  if(!chefData){
    return notFound()
  }
  return (
    <PageHeaderWithoutLink header={`تعديل الشيف ${chefData.name} `}>
      <ChefForm id={id} ChefData={chefData}/>
    </PageHeaderWithoutLink>
  )
}

export default UpdateChefPage