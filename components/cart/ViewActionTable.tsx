'use client'
import useCart from '@/lib/api/useCart'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NotFound from '../layout/NotFound'
import { Table } from '@mantine/core'

function OrderItem({name, quantity, price}:{name: string, quantity: number, price: number}){
    return(
      <Table.Tr key={name} className='dark:border-stone-600 transition duration-150'>
        <Table.Td className='dark:text-stone-300'>{name}</Table.Td>
        <Table.Td className='dark:text-stone-300'>{quantity}</Table.Td>
        <Table.Td className='dark:text-stone-300'>{price} ج</Table.Td>
      </Table.Tr>
    )
  }

function ViewActionTable({link, action, actionName, disable=4}: {link?: string, actionName: string, action?: (x: boolean)=>void, disable?: number}) {
  const cart = useCart()
  const [subTotal, setSubTotal] = useState<number>(0)
  const [deliveryTax, setDeliveryTax] = useState<number>(25)
  const [total, setTotal] = useState<number>(0)

  useEffect(()=>{
    let totalDishes = 0
    cart.data?.forEach((el)=>{
    totalDishes += el.price * el.amount
    })
    setSubTotal(totalDishes)
  },[cart.data])
  useEffect(()=>{
    setTotal(subTotal+deliveryTax)
  },[subTotal, deliveryTax])
  if(cart.data?.length===0){
    return <></>
  }
  return (
    <div className='p-3 rounded-2xl border dark:border-stone-600 flex flex-col items-center shadow-md mt-12 min-h-[200px]'>
      <Table>
      <Table.Thead>
        <Table.Tr className='dark:border-stone-600'>
          <Table.Th className='dark:text-stone-300'>اسم الطبق</Table.Th>
          <Table.Th className='dark:text-stone-300'>الكمية</Table.Th>
          <Table.Th className='dark:text-stone-300'>السعر</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
      {
      cart.data&&cart.data.map((cartItem)=>{
        return(
          <OrderItem key={cartItem.id} name={cartItem.name} quantity={cartItem.amount} price={cartItem.price * cartItem.amount}/>
        )
      })
      }
      </Table.Tbody>
    </Table>
    <div className='mt-auto flex pt-3 pb-2 text-header dark:text-stone-300 font-bold font-header gap-1 text-sm flex-col w-full px-2'>
      <div className='flex justify-between items-center mx-3 pt-3 border-t dark:border-stone-600'>
        <span>إجمالي سعر الأطباق</span>
        <span className='text-main font-bold font-header'>{subTotal} ج</span>
      </div>
      <div className='flex justify-between items-center px-3'>
        <span>التوصيل</span>
        <span className='text-main font-bold font-header'>{deliveryTax} ج</span>
      </div>
      {/* <div className='flex justify-between items-center pb-3 border-b dark:border-stone-600 px-3'>
        <span>كوبون خصم</span>
        <span className='text-main font-bold font-header'>-25 ج</span>
      </div> */}
      <div className='flex justify-between items-center text-xl py-3'>
        <span>الإجمالي</span>
        <span className='text-main font-bold font-header'>{total} ج</span>
      </div>
    </div>
    {link&&<Link href={link} className='self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl'>{actionName}</Link>}
    {action&&<button disabled={disable != 4} onClick={()=>action(true)} className='self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50'>{actionName}</button>}
  </div>
  )
}

export default ViewActionTable