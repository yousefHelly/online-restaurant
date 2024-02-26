'use client'
import { Dialog } from '@headlessui/react'
import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {ActionIcon} from '@mantine/core'
import useCart from '@/lib/api/useCart';
import ItemCart from './ItemCart';
import NotFound from './NotFound';
type Props = {
    isOpen: boolean,
    setIsOpen: (val: boolean)=>void,
}
function CartModal({isOpen, setIsOpen}: Props) {
    const cart = useCart()
    const router = useRouter()
    const [subTotal, setSubTotal] = useState<number>(0)
    useEffect(()=>{
      let totalDishes = 0
      cart.data?.forEach((el)=>{
      totalDishes += el.price * el.amount
      })
      setSubTotal(totalDishes)
    },[cart.data])
  return (
    <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className='relative z-[999]'
  >
    <div className="fixed inset-0 dark:bg-stone-950/30 bg-black/30 backdrop-blur-md" aria-hidden="true" />
    <motion.div initial={{x:-25, opacity:0}} animate={{x:0,opacity:1}} exit={{x:-25, opacity:0}} className="fixed left-0 top-0 p-4 h-screen flex w-4/5 lg:w-2/5 items-start justify-start bg-stone-100 dark:bg-stone-800 border-r dark:border-stone-600">
      <Dialog.Panel className='py-2 px-2 lg:px-5 w-full h-full flex flex-col gap-5'>
        <div className='w-full flex items-center justify-between'>
            <strong className='dark:text-stone-300'>سلة التسوق</strong>
            <ActionIcon size="lg" variant="subtle" color="#ffa006" onClick={() => setIsOpen(false)}>
                    <X/>
            </ActionIcon>
        </div>
        <div className='w-full flex flex-col gap-2 lg:px-5'>
          {
            subTotal<250?
            <h4 className='text-center dark:text-stone-300'>انت علي بعد {250-subTotal}ج من الحصول علي توصيل مجاني!</h4>
            :
            <h4 className='text-center dark:text-stone-300'>لقد حصلت علي توصيل مجاني عند إتمام الطلبية 🎉</h4>
          }
            <meter className='w-full h-6' min='0' value={`${subTotal}`} max='250'/>
        </div>
        <div className='w-full flex flex-col overflow-y-auto pl-3'>
          {
            cart.data&&cart.data.length>0?cart.data.map((item)=>
            <ItemCart key={item.id} page='cart' name={item.name} image={item.mealImgUrl} quantity={item.amount} status={item.additions} totalPrice={item.totalPrice}/>
            ):<NotFound name='أطباق'/>
          }
        </div>
        <div className='w-full mt-auto flex flex-col md:flex-row items-center justify-center gap-3'>
            <button
            className={`py-2 text-slate-50 dark:text-stone-900 px-5 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50`}
            onClick={()=>{
                router.push('/cart')
                setIsOpen(false)
            }}
            >
                متابعة الي سلة التسوق
            </button>
            <button
            className={`py-2 text-slate-50 dark:text-stone-900 px-5 dark:hover:text-stone-300 bg-stone-800 dark:bg-stone-300 dark:hover:bg-transparent hover:text-stone-800 hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50`}
            onClick={()=>{
                router.push('/checkout')
                setIsOpen(false)
            }}
            >
                إتمام الطلبية
            </button>
        </div>
      </Dialog.Panel> 
    </motion.div>
  </Dialog>
  )
}

export default CartModal