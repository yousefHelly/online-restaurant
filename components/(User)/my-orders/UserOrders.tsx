'use client'
import Loading from '@/app/loading'
import NotFound from '@/components/layout/NotFound'
import useOrders from '@/lib/api/useOrders'
import React from 'react'
import OrderItem from './OrderItem'

type Props = {}

function UserOrders({}: Props) {
    const {data:orders} = useOrders()
    return (
    <div className='flex flex-col gap-8 items-center gap-2'>
            {
                orders&&orders.length>0?orders.map((order, i )=>{
                return (
                    <OrderItem key={order.id} order={order} index={i+1}/>
                )   
                }):<NotFound name='طلبيات'/>
            }
    </div>
    )
}

export default UserOrders