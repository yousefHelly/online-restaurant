import SideDishForm from '@/components/(Admin)/side-dishes/SideDishForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { getFixedAddition } from '@/lib/api/server api calls/getFixedAddition'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'


type Props = {
  params:{
      id: string
  }
}

export async function generateMetadata({params:{id}}: Props): Promise<Metadata> {
  const sideDish = await getFixedAddition(id)
  if(!sideDish){
    return {title: 'تعديل طبق جانبي غير موجود'}
  }
  return {
    title: `تعديل طبق جانبي ${sideDish.name}`,
    description:`تعديل طبق جانبي ${sideDish.name} المضاف لدي جو فاست فوود`,
    keywords:['go fast food' ,'جو فاست فوود' ,sideDish.name, sideDish.price+' ج'],
    authors:{name:"جو فاست فوود", url:process.env.URL},
  }
}


async function UpdateSideDishPage({params:{id}}: Props) {
  const sideDish = await getFixedAddition(id)
  if(!sideDish){
    return notFound()
  }
  return (
    <PageHeaderWithoutLink header={`تعديل طبق جانبي ${sideDish.name}`}>
      <SideDishForm id={id} sideDish={sideDish}/>
    </PageHeaderWithoutLink>
  )
}

export default UpdateSideDishPage