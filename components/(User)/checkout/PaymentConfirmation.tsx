'use client'
import Loading from '@/app/loading'
import { ConfirmOrder } from '@/lib/api/useOrders'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import OrderSummary from './OrderSummary'
import { useSession } from 'next-auth/react'

type Props = {}

export default function PaymentConfirmation({}: Props) {
    const searchParams = useSearchParams()
    const confirm = ConfirmOrder()
    const [orderDetails, setOrderDetails] = useState<PostOrderResponse|undefined>(undefined)
    const {data:s} = useSession()
    useEffect(()=>{
        if(s?.user.token){
            confirm.mutate({success:searchParams.get('s') === 'success', ID:searchParams.get('id') || undefined, token:s?.user.token}, {
                onSuccess(data, variables, context) {
                    setOrderDetails(data)
                },
            })
        }
    },[s?.user.token])    
  return (
    <>
    {
        orderDetails === undefined?
        <Loading/>:
        <OrderSummary orderDetails={orderDetails} />
    }    
    </>
  )
}