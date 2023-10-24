import Link from 'next/link'
import React from 'react'

function OrderItem({name, quantity, piecePrice, last=false}:{name: string, quantity: number, piecePrice: number, last?:boolean}){
    return(
      <div className={`flex py-2 ${last?'':'border-b dark:border-stone-600'} text-header dark:text-stone-300 font-bold font-header text-sm justify-between w-full px-2`}>
        <span>{name}</span>
        <span>{quantity}</span>
        <span>{piecePrice*quantity} ج</span>
      </div>
    )
  }

function ViewActionTable({link, action, actionName, disable=4}: {link?: string, actionName: string, action?: (x: boolean)=>void, disable?: number}) {
  return (
    <div className='p-3 rounded-2xl border dark:border-stone-600 flex flex-col items-center shadow-md mt-12 min-h-[200px]'>
    <div className='flex py-2 border-b dark:border-stone-600 text-header dark:text-stone-300  font-bold font-header text-sm justify-between w-full px-2'>
      <span>اسم الطبق</span>
      <span>الكمية</span>
      <span>السعر</span>
    </div>
    <OrderItem name={'شوربة سي فود'} quantity={2} piecePrice={85}/>
    <OrderItem name={'شوربة سي فود'} quantity={2} piecePrice={85}/>
    <OrderItem name={'شوربة سي فود'} quantity={2} piecePrice={85} last={true}/>
    <div className='mt-auto flex pt-3 pb-2 text-header dark:text-stone-300 font-bold font-header gap-1 text-sm flex-col w-full px-2'>
      <div className='flex justify-between items-center mx-3 pt-3 border-t dark:border-stone-600'>
        <span>إجمالي سعر الأطباق</span>
        <span className='text-main font-bold font-header'>375 ج</span>
      </div>
      <div className='flex justify-between items-center px-3'>
        <span>التوصيل</span>
        <span className='text-main font-bold font-header'>25 ج</span>
      </div>
      <div className='flex justify-between items-center px-3'>
      <span>دفع عند الاستلام</span>
        <span className='text-main font-bold font-header'>25 ج</span>
      </div>
      <div className='flex justify-between items-center pb-3 border-b dark:border-stone-600 px-3'>
        <span>كوبون خصم</span>
        <span className='text-main font-bold font-header'>-25 ج</span>
      </div>
      <div className='flex justify-between items-center text-xl py-3'>
        <span>الإجمالي</span>
        <span className='text-main font-bold font-header'>400 ج</span>
      </div>
    </div>
    {link&&<Link href={link} className='self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl'>{actionName}</Link>}
    {action&&<button disabled={disable != 4} onClick={()=>action(true)} className='self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50'>{actionName}</button>}
  </div>
  )
}

export default ViewActionTable