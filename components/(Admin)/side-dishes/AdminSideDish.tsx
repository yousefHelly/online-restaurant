import ActionModal from '@/components/layout/ActionModal'
import { DeleteFixedAddition } from '@/lib/api/UseFixedAdditions'
import { AnimatePresence } from 'framer-motion'
import { PenBox, XCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
    id: number,
    name: string,
    image: string,
    price: number
}


export default function AdminSideDish({id, name, image, price}: Props) {
    const [isOpen, setIsOpen] =  useState<boolean>(false)
    const deleteSideDish = DeleteFixedAddition()
  return (
    <>
    <div className='bg-slate-200 dark:bg-stone-900 dark:border-stone-600 rounded-md shadow-md border flex flex-col items-center pt-2'>
    <div className='w-[100px] h-[100px] rounded-full top-0 -translate-y-1/2'>
        <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className='rounded-full object-cover w-full h-full'
        />
    </div>
    <p className='font-bold font-header text-xl text-header dark:text-stone-300 -translate-y-1/2'>{name}</p>
    <p className='font-bold font-header text-xl text-main -translate-y-1/2'>{price}ج</p>
    <div className='flex w-full'>
            <Link href={`/admin/side-dishes/`+id} className='flex-1 flex gap-1 justify-center items-center px-3 py-2 bg-stone-600 text-center text-slate-50 font-bold text-sm rounded-br-md transition duration-150 hover:bg-stone-700'>
                تعديل
                <PenBox size={18}/>
            </Link>
            <button onClick={()=>{setIsOpen(true)}} className='flex-1 flex gap-1 justify-center items-center px-3 py-2 bg-red-500 text-center text-slate-50 font-bold text-sm rounded-bl-md  transition duration-150 hover:bg-red-600'>
                حذف
                <XCircle size={18}/>
            </button>
        </div>
    </div>
    <AnimatePresence mode='wait'>
        {
            isOpen&& <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} title={`هل انت متأكد من حذف الطبق الجانبي ${name}؟`} description={`لن يتمكن المستخدمين من إضافة هذا الطبق الي السلة في حالة الحذف`} action={()=>deleteSideDish.mutate({id:id})}/>
        }
    </AnimatePresence>
    </>
  )
}
