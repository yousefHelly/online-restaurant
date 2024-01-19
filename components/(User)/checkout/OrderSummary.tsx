import React from 'react'
import { Table } from '@mantine/core';
import Link from 'next/link';
import TraceOrder from './TraceOrder';
import Image from 'next/image';

type Props = {
  orderDetails: PostOrderResponse
}

function OrderSummary({orderDetails}: Props) {
  return (
    <div className='w-full p-5 pb-0 col-span-full grid grid-cols-3 gap-5 justify-center items-center'>
    <div className='col-span-3 flex flex-col'>
      <div className='header mx-auto flex flex-col items-center gap-1'>
        <h3 className='text-header dark:text-stone-300 font-bold text-3xl'>تم تأكيد طلبك بنجاح !🎉</h3>
        <span className='text-sm mt-2 text-lighterText dark:text-stone-400'>شكرا لثقتك في جو فاست فوود ! نتمني ان تتحصل علي تجربة مرضية.</span>
        <span className='text-sm text-lighterText dark:text-stone-400'>كود طلبك هو <Link className='underline hover:text-main transition duration-150' href={`/my-orders/track?o=${orderDetails.id}`}>{orderDetails.id}</Link> يمكنك من خلاله متابعة حالة طلبك.</span>
      </div>
    </div>
    <div className="col-span-2 order-summary py-5">
        <h4 className='text-header dark:text-stone-300 font-bold text-2xl'>ملخص طلبك</h4>
        <div className='py-4'>
          <Table >
          <Table.Thead>
            <Table.Tr className='dark:border-stone-600'>
              <Table.Th className='dark:text-stone-300'>الطبق</Table.Th>
              <Table.Th className='dark:text-stone-300'>الكمية</Table.Th>
              <Table.Th className='dark:text-stone-300'>السعر</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {
              orderDetails.meals.map((meal)=>{
                return <Table.Tr key={meal.mealName} className='dark:border-stone-600 transition duration-150'>
                <Table.Td className='dark:text-stone-300 flex gap-3 items-center '>
                  <div className='w-24 h-24'>
                    <Image
                    alt={meal.mealName}
                    src={meal.mealImgUrl}
                    width={250}
                    height={250}
                    className='object-cover w-full h-full rounded-md'
                    />
                  </div>
                  <p>{meal.mealName}</p>
                </Table.Td>
                <Table.Td className='dark:text-stone-300'>{meal.amount}</Table.Td>
                <Table.Td className='dark:text-stone-300'>50 ج</Table.Td>
              </Table.Tr>
              })
            }
            {
              orderDetails.staticAdditions.map((st)=>{
                return <Table.Tr key={st.staticAdditionName} className='dark:border-stone-600 transition duration-150'>
                <Table.Td className='dark:text-stone-300 flex gap-3 items-center '>
                  <div className='w-24 h-24'>
                    <Image
                    alt={st.staticAdditionName}
                    src={st.staticAdditionImgUrl}
                    width={250}
                    height={250}
                    className='object-cover  w-full h-full rounded-md'
                    />
                  </div>
                  <p>{st.staticAdditionName}</p>
                </Table.Td>
                <Table.Td className='dark:text-stone-300'>{st.amount}</Table.Td>
                <Table.Td className='dark:text-stone-300'>50 ج</Table.Td>
              </Table.Tr>
              })
            }
          </Table.Tbody>
          <Table.Caption className='dark:text-stone-400'>إجمالي تكلفة الطلب {orderDetails.totalCost} ج</Table.Caption>
          </Table>
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