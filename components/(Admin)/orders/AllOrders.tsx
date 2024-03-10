'use client'
import OrderItem from '@/components/(User)/my-orders/OrderItem'
import NotFound from '@/components/layout/NotFound'
import PaginationProvider from '@/lib/PaginationProvider'
import { useAllOrders } from '@/lib/api/useOrders'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    initialData: {orders:AllUsersOrders[]}&WithPagination,
    size?: number
}

function AllOrders({initialData, size}: Props) {
    const {get} = useSearchParams()
    const {data} = useAllOrders(initialData, parseInt(get('page') || '1'), size)
  return (
    <PaginationProvider totalPages={data?.numOfPages || 1} showPagination={data&&data.orders.length>0}>
    <div className='flex flex-col items-center gap-2'>
        {
            data&&data.orders.length>0?data.orders.map((order, i )=>{
            return (
                <OrderItem key={order.id} order={order} index={i+1} admin={true} withUser={true}/>
            )   
            }):<NotFound name='طلبيات'/>
        }
    </div>
    </PaginationProvider>
  )
}

export default AllOrders