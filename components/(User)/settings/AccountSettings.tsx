'use client'
import ActionModal from '@/components/layout/ActionModal'
import { DeleteAccount } from '@/lib/api/useUser'
import { AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

function AccountSettings({}: Props) {
  const [isOpen, setIsOpen] =  useState<boolean>(false)
  const deleteAccount = DeleteAccount()
  return (
    <>
    <div className='flex flex-col gap-5 w-full mb-5 px-8'>
      <h2 className='text-2xl lg:text-3xl dark:text-stone-300'>حذف الحساب</h2>
        <button onClick={()=>setIsOpen(true)} className='mx-auto flex gap-2 items-center justify-center bg-red-500 text-slate-50 transition duration-150 hover:bg-red-600 rounded-md px-2 py-1 my-1 text-xs' type="submit">
            <Trash2/>
            حذف الحساب
        </button>
    </div>
    <AnimatePresence mode='wait'>
       {
           isOpen&& <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} title={`هل انت متأكد من حذف حسابك ؟`} description={`لن يمكنك إعادة اي بيانات تخص حسابك في حالة الحذف`} action={()=>deleteAccount.mutate()}/>
       }
    </AnimatePresence>
   </>
  )
}

export default AccountSettings