import React from 'react'
import ItemCart from '@/components/layout/ItemCart'
import ViewActionTable from '@/components/cart/ViewActionTable'

function CartPage() {
  return (
    <main className="flex flex-col items-start pb-20 px-24 overflow-x-hidden">
      <div className='w-full grid grid-cols-4 gap-5 items-start'>
        <div className='col-span-3 flex flex-col'>
          <div className='border-b dark:border-stone-600 py-3 text-xl font-bold font-header text-header dark:text-stone-300'>
            سلة التسوق 
          </div>
          <ItemCart page='cart' image='https://images.unsplash.com/photo-1560684352-8497838a2229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1428&q=80' name='شوربة سي فود' price={300} status='زيادة جمبري' quantity={1}/>
          <ItemCart page='cart' image='https://images.unsplash.com/photo-1560684352-8497838a2229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1428&q=80' name='شوربة سي فود' price={300} status='زيادة جمبري' quantity={1}/>
          <ItemCart page='cart' image='https://images.unsplash.com/photo-1560684352-8497838a2229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1428&q=80' name='شوربة سي فود' price={300} status='زيادة جمبري' quantity={1}/>
          <ItemCart page='cart' image='https://images.unsplash.com/photo-1560684352-8497838a2229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1428&q=80' name='شوربة سي فود' price={300} status='زيادة جمبري' quantity={1}/>
        </div>
        <ViewActionTable link='/checkout' actionName='إتمام الطلب'/>
        <div className='col-span-3 flex flex-col border-t dark:border-stone-600'>
          <h3 className='text-xl font-bold font-header text-header dark:text-stone-300 pt-5'>لديك كوبون خصم ؟</h3>
          <p className='text-sm font-bold text-lighterText dark:text-stone-400 py-2'>اضف كوبون خصم و احصل علي تخفيضات تصل إلي 50% !</p>
          <div className='w-full grid grid-cols-4'>
          <input type="text" className='col-span-3 border dark:border-stone-600 rounded-2xl rounded-l-none py-2 px-3 focus-within:outline-none' />
          <button type="submit" className='rounded-2xl rounded-r-none px-3 py-2 bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold border-main hover:border hover:bg-transparent hover:text-main transition duration-150'>إضافة</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CartPage