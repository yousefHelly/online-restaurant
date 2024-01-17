'use client'
import { Dialog } from '@headlessui/react'
import React from 'react'
import { motion } from 'framer-motion';
import { AlertCircleIcon, XCircleIcon } from 'lucide-react';

type Props = {
    isOpen: boolean,
    setIsOpen: (val: boolean)=>void,
    title: string, 
    description: string,
    action: ()=>void
}

function ActionModal({isOpen, setIsOpen, title, description, action}: Props) {
  return (
    <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className='relative z-[999]'
  >
    <div className="fixed inset-0 dark:bg-stone-950/30 bg-black/30 backdrop-blur-md" aria-hidden="true" />
    <motion.div initial={{y:25, opacity:0}} animate={{y:0,opacity:1}} exit={{y:25, opacity:0}} className="fixed inset-0 flex w-screen items-center justify-center p-4">
      <Dialog.Panel className='bg-stone-100 dark:bg-stone-800 border dark:border-stone-600 rounded-2xl p-4'>
        <Dialog.Title className={`text-xl font-bold text-heaader pb-4 border-b dark:border-stone-600 dark:text-stone-300 font-header flex items-center gap-3`}>
        <AlertCircleIcon className='text-main mt-1'/>
        {
            title
        }
        </Dialog.Title>
        <Dialog.Description>
            <p className='mt-4 text-sm font-bold text-lighterText dark:text-stone-400 '>
            {
                description
            }
            </p>
        </Dialog.Description>
        <div className='flex justify-end w-full items-center gap-3 mt-4'>
            <button onClick={()=>setIsOpen(false)}  className='flex gap-1 items-center px-4 py-2 bg-zinc-500 text-slate-50 font-bold text-sm rounded-2xl transition duration-150 hover:bg-zinc-600'>الغاء</button>
            <button onClick={()=>{action();setIsOpen(false)}} className='flex gap-1 items-center px-3 py-2 bg-red-500 text-slate-50 font-bold text-sm rounded-2xl transition duration-150 hover:bg-red-600'>
                حذف
                <XCircleIcon size={18}/>
            </button>
        </div>
      </Dialog.Panel>
    </motion.div>
  </Dialog>
  )
}

export default ActionModal