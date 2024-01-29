import React from 'react'
import Link from 'next/link';
import TraceOrder from './TraceOrder';
import Image from 'next/image';
import CheckoutSummaryTable from './CheckoutSummaryTable';

type Props = {
  orderDetails: PostOrderResponse
}

function OrderSummary({orderDetails}: Props) {
  return (
    <div className='w-full p-5 pb-0 col-span-full grid grid-cols-3 gap-5 justify-center items-center'>
    <div className='col-span-3 flex flex-col'>
      <div className='header mx-auto flex flex-col items-center gap-1'>
        <h3 className='text-header dark:text-stone-300 font-bold text-3xl'>تم تأكيد طلبيتك بنجاح !🎉</h3>
        <span className='text-sm mt-2 text-lighterText dark:text-stone-400'>شكرا لثقتك في جو فاست فوود ! نتمني ان تتحصل علي تجربة مرضية.</span>
        <span className='text-sm text-lighterText dark:text-stone-400'>كود طلبيتك هو <Link className='underline hover:text-main transition duration-150' href={`/my-orders/track?o=${orderDetails.id}`}>{orderDetails.id}</Link> يمكنك من خلاله متابعة حالة طلبك.</span>
      </div>
    </div>
    <div className="col-span-2 order-summary py-5">
        <h4 className='text-header dark:text-stone-300 font-bold text-2xl'>ملخص طلبيتك</h4>
        <div className='py-4'>
          <CheckoutSummaryTable orderDetails={orderDetails}/>
        </div>
      </div>
    <div className="col-span-1">
        <TraceOrder status={orderDetails.status} statusDate={orderDetails.statusDate}/>
    </div>
    <div className="col-span-3 flex">
      <Link
      href={'/'}
      className='mx-auto self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-md dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50'>
        عودة للصفحة الرئيسية
      </Link>
    </div>
  </div>
  )
}

export default OrderSummary