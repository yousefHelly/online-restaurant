'use client'
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import AddressItem from './AddressItem';
import { Loader2, Plus } from 'lucide-react';
import AddressModal from './AddressModal';
import useAddress from '@/lib/api/UseAddress';
import NotFound from '@/components/layout/NotFound';

type Props = {}

function Addresses({}: Props) {
    const {data, isLoading, isError} = useAddress()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedAddress, setSelectedAddress] = useState<Address>()
  return (
    <>
    <div className='w-full flex flex-col justify-start items-start gap-3 lg:px-8'>
        <AnimatePresence mode='wait'>
        {
        data&&data.length>0?data.map((address, i)=>{
            return (
            <AddressItem key={address.id} address={address} i={i} setIsOpen={setIsOpen} setSelectedAddress={setSelectedAddress}/>
            )
        }):isLoading?<span className='w-full flex flex-col items-center justify-center gap-3 dark:text-stone-400 text-lighterText'>جاري التحميل ...<Loader2 className='text-main animate-spin'/></span>:!isLoading&&!isError&&<NotFound name='عناوين'/>
        }
        </AnimatePresence>
        <button onClick={()=>{setSelectedAddress(undefined);setIsOpen(true)}} className='self-center lg:self-start flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:bg-transparent hover:text-main transition duation-150'>
        <Plus/>
        عنوان جديد
        </button>
    </div>
    <AnimatePresence mode='wait'>
        {isOpen&&<AddressModal isOpen={isOpen} setIsOpen={setIsOpen} address={selectedAddress}/>
        }
    </AnimatePresence>  
  </>
  )
}

export default Addresses