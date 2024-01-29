import PaymentConfirmation from '@/components/(User)/checkout/PaymentConfirmation'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import axios from 'axios'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    searchParams?: {[key: string]: string | string[] | undefined}
}

async function PaymentConfirmationPage({searchParams}: Props) {
    if(!searchParams?.s){
        return notFound()
    }
  return (
    <div className='w-full grid grid-cols-4 gap-5 items-start pt-4 pb-10'>
        <PaymentConfirmation/>
    </div>
  )
}

export default PaymentConfirmationPage