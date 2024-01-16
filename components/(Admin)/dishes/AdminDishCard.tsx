'use client'
import ActionModal from '@/components/layout/ActionModal'
import RatingStars from '@/lib/RatingStars'
import { AnimatePresence } from 'framer-motion'
import { ChefHat, Heart, LucidePizza, PenBox, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Link  from 'next/link';
import { DeleteDish } from '@/lib/api/useDish'

type Props = {
    name: string,
    image: string,
    chef: string,
    category: string,
    rating: number,
    ratingCount: number,
    price: number,
    oldPrice?: number,
    id: number
}
function AdminDishCard({name, image, chef, category, rating, ratingCount, price, oldPrice, id}: Props) {
    const [isOpen, setIsOpen] =  useState<boolean>(false)
    const deleteMeal = DeleteDish()
    
    return (
    <>
      <div  className={`group border dark:border-stone-600 bg-slate-50/40 dark:bg-stone-600/40 dark:hover:bg-main/20 transition duration-300 hover:bg-main/20 relative flex flex-col gap-2 shadow-md rounded-b-md max-h-[400px] overflow-x-hidden`}>
      <figure className={`w-full h-[175px] overflow-hidden relative`}>
          <Link href={`/menu/${name}`} >
          <Image 
          src={image}
          alt={name}
          width={400}
          height={400}
          className='w-full h-full object-cover transition duration-300 group-hover:scale-105'
          />
          </Link>
      </figure>
      <div className='flex-1 flex flex-col gap-2 justify-center'>
          <Link href={`/menu/${name}`} className='font-header dark:text-stone-300 dark:hover:text-main font-bold text-xl px-4 mt-2 hover:text-main transition duration-150'>{name}</Link>
          <div className='w-full flex justify-between items-center px-4'>
              <div className='flex items-center gap-1 '>
                  <ChefHat size={18} className='text-main dark:fill-main dark:text-stone-800'/>
                  <Link href={`/menu/all-dishes?f=chef&n=${chef}`} className='text-lighterText  text-sm font-bold cursor-pointer hover:text-header  dark:hover:text-main transition duration-150'>{chef}</Link>
              </div>
              <div className='flex items-center justify-center gap-1'>
                  <LucidePizza size={18} className='text-main dark:fill-main dark:text-stone-800'/>
                  <Link href={`/menu/all-dishes?f=category&n=${category}`} className='text-lighterText  text-sm font-bold cursor-pointer hover:text-header dark:hover:text-main  transition duration-150'>{category}</Link>
              </div>
          </div>
          <div className='flex items-center justify-between px-4  py-2'>
          <div className='flex items-center gap-0 text-sm dark:text-stone-400'>
              <RatingStars rating={rating}/>
              ({ratingCount})
          </div>
          </div>
  
          <div className='flex items-center justify-start px-4 pb-2'>
                  {
                      oldPrice!>0&&<p className='order-2 px-2 font-header font-bold text-md text-red-500 line-through'>{oldPrice}{' '}ج</p>
                  }
                  <p className='font-header font-bold text-xl text-main'>{price}{' '}ج</p>
          </div>
      </div>
      <div className='flex w-full'>
            <Link href={`/admin/dishes/${name}`} className='flex-1 flex gap-1 justify-center items-center px-3 py-2 bg-stone-600 text-center text-slate-50 font-bold text-sm rounded-br-md transition duration-150 hover:bg-stone-700'>
                تعديل
                <PenBox size={18}/>
            </Link>
            <button onClick={()=>{setIsOpen(true)}} className='flex-1 flex gap-1 justify-center items-center px-3 py-2 bg-red-500 text-center text-slate-50 font-bold text-sm rounded-bl-md  transition duration-150 hover:bg-red-600'>
                حذف
                <XCircleIcon size={18}/>
            </button>
    </div>
    </div>
    <AnimatePresence mode='wait'>
    {
        isOpen&& <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} title={`هل انت متأكد من حذف الطبق ${name}؟`} description={`لن يمكنك إعادة أي تقييمات او اضافات خاصة بهذا الطبق ${name} في حالة الحذف`} action={()=>deleteMeal.mutate({name:name})}/>
    }
    </AnimatePresence>
    </>
    )
  }
  
export default AdminDishCard