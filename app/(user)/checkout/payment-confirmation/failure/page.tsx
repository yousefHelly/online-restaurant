import FailedOrder from '@/components/(User)/checkout/FailedOrder'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'فشل تأكيد الطلبية',
  }

  
function PaymentFailedPage() {
  return (
    <div className='w-full grid grid-cols-4 gap-5 items-start'>
        <FailedOrder/>
    </div>
  )
}

export default PaymentFailedPage