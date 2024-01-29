'use client'
import OrderItem from '@/components/(User)/my-orders/OrderItem'
import NotFound from '@/components/layout/NotFound'
import { useAllOrders } from '@/lib/api/useOrders'
import React from 'react'

type Props = {
    initialData: AllUsersOrders[]
}

function AllOrders({initialData}: Props) {
    const {data:orders} = useAllOrders(initialData)
  return (
    <div className='flex flex-col items-center gap-2'>
        {
            orders&&orders.length>0?orders.map((order, i )=>{
            return (
                <OrderItem key={order.id} order={order} index={i+1} admin={true} withUser={true}/>
            )   
            }):<NotFound name='طلبيات'/>
        }
    </div>
  )
}

export default AllOrders