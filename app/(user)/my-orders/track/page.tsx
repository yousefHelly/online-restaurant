import TrackingOrder from '@/components/(User)/my-orders/TrackingOrder'
import { getOrderStatus } from '@/lib/api/server api calls/getOrderStatus'
import { notFound } from 'next/navigation'
import React from 'react'
import { Metadata } from "next"
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'

type Props = {
    searchParams?: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const data = await getOrderStatus(searchParams?.o as string)
    if(!data){
        return {
            title:'حالة طلبية غير موجودة'
        }
    }
    return {
        title:`حالة الطلبية كود ${data.id}`,
    }
}

async function page({searchParams}: Props) {
    if( !searchParams || !searchParams?.o){
        notFound()
    }
    const data = await getOrderStatus(searchParams?.o as string)
    if(!data){
        notFound()
    }
  return (
    <PageHeaderWithoutLink header='حالة طلبيتك'>
        <TrackingOrder order={data}/>
    </PageHeaderWithoutLink>
  )
}

export default page