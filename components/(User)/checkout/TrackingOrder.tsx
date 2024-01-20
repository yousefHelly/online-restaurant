import { useSearchParams } from 'next/navigation'
import React from 'react'
import TraceOrder from './TraceOrder'
import OrderSummary from './OrderSummary'
import CheckoutSummaryTable from './CheckoutSummaryTable'
import { CheckCircleIcon, Loader2, BadgeCent, Navigation2, Timer } from 'lucide-react'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'

type Props = {
    order: PostOrderResponse
}

function TrackingOrder({order}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-start px-24 overflow-x-hidden">
        <div className='flex flex-col gap-5 w-full'>
            <PageHeaderWithoutLink header='حالة طلبيتك'>
            <div className='grid grid-cols-2 items-center justify-center w-full gap-8 px-12'>
            <div className='flex items-center gap-2'>
                <TrackingOrder.Header>عملية الدفع</TrackingOrder.Header>
                {
                    order.isPaid?
                    <div className='flex items-center gap-1 dark:text-stone-300'>
                        <CheckCircleIcon className='pt-1 text-green-600'/>
                        تم الدفع
                    </div>:
                    <div className='flex items-center gap-1 font-bold dark:text-stone-300'>
                        <Timer className='pt-1 text-main'/>
                        لم يتم الدفع بعد
                    </div>
                }
            </div>
            <div className='flex items-center gap-2 self-end ms-auto'>
                <TrackingOrder.Header>وسيلة الدفع</TrackingOrder.Header>
                    <div className='flex items-center gap-1 font-bold dark:text-stone-300'>
                        <BadgeCent className='pt-1 text-main'/>
                        {order.paymentMethod}
                    </div>
            </div>
            <div className='flex items-center gap-2 col-span-2 self-center mx-auto'>
                <TrackingOrder.Header>عنوان الطلبية</TrackingOrder.Header>
                    <div className='flex items-center gap-1 font-bold dark:text-stone-300'>
                        <Navigation2 className='pt-1 text-main'/>
                        شقة رقم : {order.departmentNum}، شارع : {order.street}، مدينة : {order.city} ، ت : {order.phoneNumber}
                    </div>
            </div>
            </div>
            <div className='w-full col-span-full grid grid-cols-3 gap-5 justify-center items-center'>
                <div className="col-span-2">
                    <h4 className='text-header dark:text-stone-300 font-bold text-2xl'>ملخص طلبيتك</h4>
                    <div className='py-2'>
                    <CheckoutSummaryTable orderDetails={order}/>
                    </div>
                </div>
                <TraceOrder status={order?.status!} statusDate={order?.statusDate!}/>
            </div>
            </PageHeaderWithoutLink>

        </div>
    </main>
  )
}

TrackingOrder.Header = function Header({children}: {children: React.ReactNode}){
    return <strong className='text-lg font-bold text-main'>{children} : </strong>

}

export default TrackingOrder