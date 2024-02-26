import ActionModal from '@/components/layout/ActionModal'
import { DeleteChef } from '@/lib/api/useChefs'
import { AnimatePresence } from 'framer-motion'
import Link  from 'next/link'
import { PenBox, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'


function AdminChef({id, name, image, mealsCount, category, rating, rateNum}:{id: number, name: string, image: string, mealsCount: number, category: string, rating: number, rateNum: number}){
    const [isOpen, setIsOpen] =  useState<boolean>(false)
    const deleteChef = DeleteChef()
    return (
    <>
    <div className='flex flex-col h-[325px]'>
    <Link href={`/menu/all-dishes?f=chef&n=${name}`} className='group col-span-full md:col-span-1 h-full'>
    <div className='h-full rounded-t-md overflow-hidden relative after:content-[""] after:absolute after:inset-0 after:bg-main/25 after:transition after:duration-150 group-hover:after:backdrop-blur-[2px]'>
        <Image
        src={image}
        alt={`الشيف ${name}`}
        width={400}
        height={400}
        className='rounded-t-md h-full object-cover transition w-full duration-150 group-hover:scale-105' 
        />
        <span className='absolute inset-0 font-bold font-header z-10 flex flex-col items-center justify-center w-full h-full gap-3 top-[100%] transition transform duration-150 group-hover:top-[0%]'>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>الشيف : {name}</p>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>عدد الأطباق : {mealsCount>0?<>{mealsCount}+</>:'لا توجد أطباق'}</p>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>ضمن تصنيف : {category}</p>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>التقييم  : {rating}/5 ({rateNum})</p>
        </span>
    </div>
    </Link>
    <div className='flex w-full'>
            <Link href={`/admin/chefs/`+id} className='flex-1 flex gap-1 justify-center items-center px-3 py-2 bg-stone-600 text-center text-slate-50 font-bold text-sm rounded-br-md transition duration-150 hover:bg-stone-700'>
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
            isOpen&& <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} title={`هل انت متأكد من حذف الشيف ${name}؟`} description={`لن يمكنك إعادة أي أطباق تقدم عن طريق الشيف ${name} في حالة الحذف`} action={()=>deleteChef.mutate({id:id})}/>
        }
    </AnimatePresence>
    </>
  )
}

export default AdminChef