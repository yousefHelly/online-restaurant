import TrackingOrder from '@/components/(User)/checkout/TrackingOrder'
import { getOrderStatus } from '@/lib/api/server api calls/getOrderStatus'
import { notFound } from 'next/navigation'
import React from 'react'
type Props = {
    searchParams?: {[key: string]: string | string[] | undefined}
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
   <TrackingOrder order={data}/>
  )
}

export default page