import React from 'react'
import TraceOrder from '../checkout/TraceOrder'
import CheckoutSummaryTable from '../checkout/CheckoutSummaryTable'
import { CheckCircleIcon, BadgeCent, Navigation2, Timer, Wallet, CalendarDays } from 'lucide-react'
import ShowAddress from '../layout/ShowAddress'
import DateConverter from '@/lib/DateConverter'

type Props = {
    order: PostOrderResponse
}

function TrackingOrder({order}: Props) {
  return (
    <>
    <div className='grid grid-cols-2 items-start justify-start w-full gap-5 px-12'>
    <div className='flex items-center gap-2'>
        <TrackingOrder.Header>
        <Wallet/>
        عملية الدفع
        </TrackingOrder.Header>
        {
            order.isPaid?
            <span className='flex items-center gap-1 dark:text-stone-300'>
                تم الدفع
            </span>:
            <span className='flex items-center gap-1 font-bold dark:text-stone-300'>
                لم يتم الدفع بعد
            </span>
        }
    </div>
    <div className='flex items-center gap-2'>
        <TrackingOrder.Header>
        <BadgeCent className='pt-1 text-main'/>
        وسيلة الدفع
        </TrackingOrder.Header>
            <div className='flex items-center gap-1 font-bold dark:text-stone-300'>
                {order.paymentMethod}
            </div>
    </div>
    <div className='flex items-center gap-2'>
        <TrackingOrder.Header>
        <CalendarDays className='pt-1 text-main'/>
        تاريخ الطلب
        </TrackingOrder.Header>
        <div className='flex items-center gap-1 font-bold dark:text-stone-300'>
            {DateConverter(order.date)}
        </div>
    </div>
    <div className='flex items-center gap-2 col-span-2'>
        <TrackingOrder.Header>
        <Navigation2 className='pt-1 text-main'/>
        عنوان الطلبية
        </TrackingOrder.Header>
        <div className='flex items-center gap-1 font-bold dark:text-stone-300'>
            <ShowAddress city={order.city} departmentNum={order.departmentNum} phoneNumber={order.phoneNumber} street={order.street}/>
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
    </>
  )
}

TrackingOrder.Header = function Header({children}: {children: React.ReactNode}){
    return <strong className='text-lg font-bold text-main flex items-center gap-1'>{children} : </strong>

}

export default TrackingOrder