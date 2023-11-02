import React from 'react'
import { motion } from 'framer-motion';
import { Trash2Icon } from 'lucide-react';
import { axiosAuth } from '@/lib/api/axios';
import toast from 'react-hot-toast';

type Props = {
    address: Address,
    i: number,
    setIsOpen: (val:boolean)=>void,
    setSelectedAddress: (val: Address | undefined)=>void
}

function AddressItem({address, i, setIsOpen, setSelectedAddress}: Props) {
  return (
    <motion.div key={i} initial={{opacity:0, y:15}} animate={{opacity:1,y:0, transition:{duration:0.7}}} exit={{opacity:0, y:15}} className='flex items-center gap-3' >
        <Trash2Icon onClick={()=>{axiosAuth.delete(`api/address/${address.id}`).then((res)=>toast.success(res.data.message)).catch((err)=>toast.error(err.data.message))}} className='text-red-500 cursor-pointer hover:bg-red-500 hover:text-slate-50 dark:hover:text-stone-900 transition duration-150 p-2 rounded-full w-10 h-10 flex items-center justify-center'/>
            <div onClick={()=>{setSelectedAddress(address); setIsOpen(true)}} className={`my-4 cursor-pointer hover:bg-main/20 py-2 px-3 rounded-2xl`}>
                <div className='flex flex-col gap-3'>
                    <span className={`px-3 py-2 rounded-2xl transition duration-150`}>عنوان<span className='text-sm font-bold text-main'>{i+1}#</span></span>
                    <p className='px-6 text-lighterText dark:text-stone-400 text-sm font-bold'>شقة رقم {address.departmentNum}، {address.street}، {address.city}، هاتف :{address.phoneNumber}</p>
                </div>
            </div>
    </motion.div>
  )
}

export default AddressItem