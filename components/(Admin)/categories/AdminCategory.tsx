import ActionModal from '@/components/layout/ActionModal'
import { AnimatePresence } from 'framer-motion'
import { PenBox, XCircleIcon } from 'lucide-react'
import { DeleteCategory } from '@/lib/api/useCategories'
import Link from 'next/link'
import React, { useState } from 'react'


function AdminCategory({id,image, name, amount, chefs}:{id: number, image: string, name: string, amount: number, chefs: number}) {
    const [isOpen, setIsOpen] =  useState<boolean>(false)
    const deleteCategory = DeleteCategory()
  return (
    <>
    <span>
        <Link href={`/menu/all-dishes?f=category&n=`+name} className='group relative flex flex-col gap-3 justify-center items-center bg-main/20 p-5 rounded-t-md transition duration-150 hover:bg-transparent dark:text-stone-300 dark:hover:text-main hover:text-main cursor-pointer overflow-hidden'>
            <img
            src={`${`https://localhost:7166`}${image}`}
            alt={name}
            className="w-[75px] h-[75px]"
            />
            <p className='text-xl font-bold font-header'>{name}</p>
            <span className='group-hover:left-0 text-xs absolute -left-[100%] top-5 bg-main/75 backdrop-blur-md rounded-r-2xl px-4 py-2 text-slate-50 '>
                {
                    amount>0?
                    <>
                    عدد الأطباق المتوفرة {amount}+
                    </>:
                    <>
                    لا توجد اطباق متوفرة
                    </>

                }
            </span>
            <span className='group-hover:right-0 text-xs absolute -right-[100%] top-16 bg-slate-50/75 dark:bg-stone-800 backdrop-blur-md rounded-l-2xl px-4 py-2 text-main border border-main '>
                {
                    chefs>0?
                    <>
                    عدد الشيفات {chefs}+
                    </>:
                    <>
                    لا توجد شيفات متوفرة
                    </>

                }
            </span>
        </Link>
        <div className='flex w-full'>
            <Link href={`/admin/categories/`+id} className='flex-1 flex gap-1 justify-center items-center px-3 py-2 bg-stone-600 text-center text-slate-50 font-bold text-sm rounded-br-md transition duration-150 hover:bg-stone-700'>
                تعديل
                <PenBox size={18}/>
            </Link>
            <button onClick={()=>{setIsOpen(true)}} className='flex-1 flex gap-1 justify-center items-center px-3 py-2 bg-red-500 text-center text-slate-50 font-bold text-sm rounded-bl-md  transition duration-150 hover:bg-red-600'>
                حذف
                <XCircleIcon size={18}/>
            </button>
        </div>
    </span>
    <AnimatePresence mode='wait'>
        {
            isOpen&& <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} title={`هل انت متأكد من حذف تصنيف ${name}؟`} description={`لن يمكنك إعادة أي أطباق أو شيفات بداخل القسم في حالة الحذف`} action={()=>deleteCategory.mutate({id:id})}/>
        }
    </AnimatePresence>
    </>
  )
}

export default AdminCategory