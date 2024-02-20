import React from 'react'
import ViewActionTable from '@/components/cart/ViewActionTable'
import CartDishes from '@/components/cart/CartDishes'
import type { Metadata } from 'next'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'

export const metadata: Metadata = {
  title: 'سلة التسوق',
}

function CartPage() {
  return (
      <PageHeaderWithoutLink header='سلة التسوق'>
        <div className='w-full grid grid-cols-4 gap-5 items-start'>
          <CartDishes/> 
          <ViewActionTable link='/checkout' actionName='إتمام الطلب'/>
          <div className='col-span-full lg:col-span-3 flex flex-col border-t dark:border-stone-600'>
            <h3 className='text-xl font-bold font-header text-header dark:text-stone-300 pt-5'>لديك كوبون خصم ؟</h3>
            <p className='text-xs lg:text-sm font-bold text-lighterText dark:text-stone-400 py-2'>اضف كوبون خصم و احصل علي تخفيضات تصل إلي 50% !</p>
            <div className='w-full grid grid-cols-4'>
            <input type="text" className='col-span-3 border dark:border-stone-600 rounded-2xl rounded-l-none py-2 px-3 focus-within:outline-none' />
            <button type="submit" className='rounded-2xl rounded-r-none px-3 py-2 bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold border-main hover:border hover:bg-transparent hover:text-main transition duration-150'>إضافة</button>
            </div>
          </div>
        </div>
      </PageHeaderWithoutLink>
  )
}

export default CartPage