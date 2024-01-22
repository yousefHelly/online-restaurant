import { BadgeCent, Beef, CakeSlice, CalendarRange, Car, MailCheck, Navigation2, PackageCheck, Wallet } from 'lucide-react'
import ShowAddress from '../layout/ShowAddress'
import React, { Children } from 'react'
import Link from 'next/link'
import DateConverter from '@/lib/DateConverter'

type Props = {
    order:UserOrder,
    index: number
}

function OrderItem({order, index}: Props) {
  return (
    <Link href={`/my-orders/track?o=${order.id}`} className="w-full grid grid-cols-3 grid-rows-2 items-center  bg-slate-100 hover:bg-main/5 dark:bg-stone-800 dark:hover:bg-main/20 p-5 rounded-2xl shadow-md hover:scale-[101%] transition duration-150">
      <div className="flex flex-col gap-2 col-span-3 row-span-1">
       <div className='w-full flex justify-between items-center'>
        <h3 className='text-main font-header font-bold text-2xl'>طلبية #{index}</h3>
        <h3 className='text-main font-header font-bold text-xl'>إجمالي الطلب {order.totalCost} ج </h3>
       </div>
        <div className='w-full flex gap-8 items-center'>
          <span className='text-sm font-bold text-lighterText dark:text-stone-400'>كود تتبع : <span className=' underline '>{order.id}</span></span>
          <span className='text-sm font-bold text-lighterText dark:text-stone-400'>تاريخ الطلب : {DateConverter(order.date)}</span>
          <span className='text-sm font-bold text-lighterText dark:text-stone-400'>العنوان : 
            <ShowAddress city={order.city} departmentNum={order.departmentNum} phoneNumber={order.phoneNumber} street={order.street}/>
          </span>
        </div>
      </div>
      <div className="col-span-3 row-span-1 flex justify-between items-center pt-3">
       <div className='flex gap-5 items-center'>
       <OrderItem.Icon>
          {
            order.status === 'Processing'?<>
            <CalendarRange className='text-main'/>
            تم إستلام الطلب
            </>
            : order.status === 'Ready For Shipping'?<>
            <PackageCheck/>
            جاهز للتوصيل
            </>:<>
            <Car/>
            في طريقة إليك
            </>
          }
        </OrderItem.Icon>
        <OrderItem.Icon>
            <BadgeCent className='text-main'/>
            {
              order.paymentMethod
            }
        </OrderItem.Icon>
        <OrderItem.Icon>
          <Wallet className='text-main'/>
          {
            order.isPaid?'تم الدفع':'لم يتم الدفع بعد'
          }
        </OrderItem.Icon>
       </div>
        <OrderItem.Icon>
          <p>عدد اللأطباق : </p>
          <OrderItem.Icon>
            <Beef className='text-main'/>
            {
              order.numOfMeals
            }
          </OrderItem.Icon>
          <OrderItem.Icon>
            <CakeSlice className='text-main'/>
            {
              order.numOfStaticMealAdditions
            }
          </OrderItem.Icon>
        </OrderItem.Icon>
      </div>
    </Link>
  )
}
OrderItem.Icon = function Ico({children}:{children:React.ReactNode}){
  return <div className='flex items-center gap-1 font-bold text-sm dark:text-stone-300 border px-2 py-1 border-dashed border-main rounded-2xl'>
  {
    children
  }
</div>
}

export default OrderItem