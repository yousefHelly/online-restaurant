import { BadgeCent, Beef, CakeSlice, CalendarRange, Car, MailCheck, Microwave, Navigation2, PackageCheck, PackageCheckIcon, Wallet } from 'lucide-react'
import ShowAddress from '../layout/ShowAddress'
import React, { Children } from 'react'
import Link from 'next/link'
import DateConverter from '@/lib/DateConverter'
import Image from 'next/image'

type Props = {
    order:UserOrder,
    index: number,
} | {
  order:AllUsersOrders,
  index: number,
  admin: boolean,
  withUser: boolean
}
enum Status {
  Processing = 'Processing',
  Cooking = 'Cooking',
  Delivering = 'Delivering',
  Delivered = 'Delivered'
}
function IsAdminOrder(order: UserOrder | AllUsersOrders): order is AllUsersOrders{
  return !!(order as AllUsersOrders)?.userName
  }
function OrderItem({order, index}: Props) {
  return (
    <Link href={IsAdminOrder(order)?`/admin/orders/update?o=${order.id}`:`/my-orders/track?o=${order.id}`} className="w-full grid md:grid-cols-3 md:grid-rows-2 items-center  bg-slate-100 hover:bg-main/5 dark:bg-stone-800 dark:hover:bg-main/20 p-5 rounded-2xl shadow-md hover:scale-[101%] transition duration-150">
      <div className="flex flex-col gap-2 md:col-span-3 row-span-1">
       <div className='w-full flex justify-between items-center'>
        {
          !IsAdminOrder(order)? 
          <h3 className='text-main font-header font-bold text-2xl'>طلبية #{index}</h3>:
          <div className='text-main font-header font-bold text-2xl flex items-center gap-2'>
              <div className='w-[35px] h-[35px] rounded-full border border-main'>
                  <Image
                  src={order.userImg || '/static/default-user-icon.jpg'}
                  alt={order.userName}
                  width={35}
                  height={35}
                  className='object-cover rounded-full'
                  />
              </div>
            طلبية من {order.userName}
          </div>

        }
        
        <h3 className='text-main font-header font-bold text-xl'>إجمالي الطلب {order.totalCost} ج </h3>
       </div>
        <div className='w-full flex flex-col md:flex-row gap-5 md:gap-8 md:items-center'>
          <span className='text-sm font-bold text-lighterText dark:text-stone-400'>كود تتبع : <span className=' underline '>{order.id}</span></span>
          <span className='text-sm font-bold text-lighterText dark:text-stone-400'>تاريخ الطلب : {DateConverter(order.date)}</span>
          <span className='text-sm font-bold text-lighterText dark:text-stone-400'>العنوان : 
            <ShowAddress city={order.city} departmentNum={order.departmentNum} phoneNumber={order.phoneNumber} street={order.street}/>
          </span>
        </div>
      </div>
      <div className="w-full md:col-span-3 md:row-span-1 flex justify-between items-center pt-3">
       <div className='w-full grid grid-cols-2 md:w-auto md:flex gap-5 items-center'>
       <OrderItem.Icon>
          {
            order.status === Status.Processing?<>
            <CalendarRange className='text-main'/>
            تم إستلام الطلب
            </>
            : order.status === Status.Cooking?<>
            <Microwave className='text-main'/>
            جاري الطهي
            </>:
            order.status === Status.Delivering?
            <><Car className='text-main'/>
            في طريقة إليك
            </>:<>
            <PackageCheck className='text-main'/>
            تم التوصيل
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
        <OrderItem.Icon cn='md:hidden flex-col'>
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
        <OrderItem.Icon cn='hidden md:flex'>
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
OrderItem.Icon = function Ico({children, cn}:{children:React.ReactNode, cn?:string}){
  return <div className={`flex items-center gap-1 font-bold text-sm dark:text-stone-300 border px-2 py-1 border-dashed border-main rounded-2xl ${cn}`}>
  {
    children
  }
</div>
}

export default OrderItem