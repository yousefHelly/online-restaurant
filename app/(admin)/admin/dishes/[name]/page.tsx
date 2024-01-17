import DishForm from '@/components/(Admin)/dishes/DishForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { convert } from '@/lib/ConvertArabicURL'
import { getDish } from '@/lib/api/server api calls/getDish'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
  type Props = {
    params:{
        name: string
    }
  }
  export async function generateMetadata({params:{name}}:Props): Promise<Metadata> {
    const arabicName = name ? convert(name) : undefined
    const DishData = await getDish(arabicName)
    if(!DishData){
      return {
        title: 'طبق غير موجود',
      }
    } else{
      return {
        title: `تعديل طبق ${DishData.name}`,
        description:DishData.description || `طبق ${DishData.name} المميز المقدم من الشيف ${DishData.chefName} تحت تصنيف ${DishData.categoryName}`,
        keywords:['go fast food', 'جو فاست فوود', DishData.name,  DishData.chefName, DishData.categoryName],
        authors:{name:"جو فاست فوود", url:process.env.URL},
      }
    }
    
  }


async function EditDishPage({params:{name}}:Props) {
  const arabicName = name ? convert(name) : undefined
  const DishData = await getDish(arabicName)
  if(!DishData){
    notFound()
  } else{
    return (
      <PageHeaderWithoutLink header={`تعديل طبق ${DishData.name}`}>
        <DishForm name={name} initialData={DishData}/>
    </PageHeaderWithoutLink>
    )
  }
}

export default EditDishPage