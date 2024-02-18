import React from 'react'
import TraceOrder from '../checkout/TraceOrder'
import CheckoutSummaryTable from '../checkout/CheckoutSummaryTable'
import { CheckCircleIcon, BadgeCent, Navigation2, Timer, Wallet, CalendarDays } from 'lucide-react'
import ShowAddress from '../layout/ShowAddress'
import DateConverter from '@/lib/DateConverter'
import UpdateOrder from '@/components/(Admin)/orders/UpdateOrder'

type Props = {
    order: PostOrderResponse,
    admin?: boolean
}

function TrackingOrder({order, admin}: Props) {
  return (
    <div className={admin?'grid grid-cols-4 grid-rows-2 ':''}>
        <div className='lg:col-span-3 lg:col-start-1 lg:col-end-4 grid lg:grid-cols-2 items-start justify-start w-full gap-5 lg:px-12'>
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
        <div className='flex items-center gap-2 lg:col-span-2'>
            <TrackingOrder.Header>
            <Navigation2 className='pt-1 text-main'/>
            عنوان الطلبية
            </TrackingOrder.Header>
            <div className='flex items-center gap-1 font-bold dark:text-stone-300'>
                <ShowAddress city={order.city} departmentNum={order.departmentNum} phoneNumber={order.phoneNumber} street={order.street}/>
            </div>
        </div>
        </div>
        <div className={`${admin?'col-span-3 my-8 mr-10 order-2 ':'w-full col-span-full my-8 lg:my-0'} grid lg:grid-cols-3 gap-5 justify-center items-center`}>
            <div className="lg:col-span-2 order-2 lg:order-first">
                <h4 className='text-header dark:text-stone-300 font-bold text-2xl'>ملخص الطلبية</h4>
                <div className='py-2'>
                <CheckoutSummaryTable orderDetails={order}/>
                </div>
            </div>
            {!admin&&<TraceOrder status={order?.status!} statusDate={order?.statusDate!}/>}
        </div>
        {
            admin&&<UpdateOrder order={order}/>
        }
    </div>
  )
}

TrackingOrder.Header = function Header({children}: {children: React.ReactNode}){
    return <strong className='text-lg min-w-max font-bold text-main flex items-center gap-1'>{children} : </strong>

}

export default TrackingOrder