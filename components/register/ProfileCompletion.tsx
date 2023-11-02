'use client'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import NotFound from '../layout/NotFound';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { axiosAuth } from '@/lib/api/axios';
import { useSession } from 'next-auth/react';
import useAddress from '@/lib/api/UseAddress';
import toast from 'react-hot-toast';
import AddressItem from '../profile/AddressItem';

type Props = {
    setIsOpen: (val:boolean)=>void,
    setSelectedAddress: (val: Address | undefined)=>void
}

function ProfileCompletion({ setIsOpen, setSelectedAddress }: Props) {
    const router = useRouter()
    const [image, setImage] = useState<FileList | null>(null)
    useAxiosAuth()
    const {data:session, update} = useSession()
    async function updateImg(img:FileList) {
        axiosAuth.put<UpdateAuth>('https://localhost:7166/api/Auth/updateAccount',{UserImg:img.item(0)},{headers: { "Content-Type": "multipart/form-data" }}).then(async(res)=>{await update({...session,user:res.data.user});toast.success(res.data.message)}).catch((err)=>toast.error(err.data.message))
    }
    useEffect(()=>{
    if(image!=null){
        updateImg(image)
    }
    },[image])
    const {data:addresses, isError, isLoading} = useAddress()
  return (
    <motion.div key={3} initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} className='w-4/5 mx-auto'>
                <h3 className='text-3xl font-bold text-header dark:text-stone-300 font-header'>إكمال بيانات الحساب</h3>
                <div className='flex flex-col w-full my-10'>
                    <div className='flex flex-col w-full '>
                        <h4 className='text-header dark:text-stone-300 font-header text-xl font-bold'>ارفع صورة لملفك الشخصي !</h4>
                        <div className='flex flex-col items-center justify-center my-2'>
                            <div className='group relative overflow-hidden'>
                                <input onChange={(e)=>{e.target.files&&setImage(e.target.files);}} type="file" hidden id='profile' name='profile' accept='image/png, image/jpeg' />
                                <label htmlFor="profile" className='z-30'>
                                    <img src={image&&URL.createObjectURL(image[0]) ||'/static/default-user-icon.jpg'} alt={session?.user.userName} className='rounded-full h-[75px] w-[75px] object-cover'></img>
                                    <span className='absolute h-[75px] w-[75px] rounded-full bg-main/75 backdrop-blur-md flex justify-center items-center -bottom-[100%] group-hover:bottom-0 text-slate-50 font-bold text-xs cursor-pointer'>رفع صورة</span>
                                </label>
                            </div>
                            <p className='text-lighterText font-bold text-sm my-2'>{session?.user.userName}</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className='text-xl font-bold font-header dark:text-stone-300'>اضف عنوان :</p>
                      <AnimatePresence mode='wait'>
                        {
                            addresses&&addresses.length>0?addresses.map((address, i)=>{
                                return (
                                <AddressItem address={address} i={i} setIsOpen={setIsOpen} setSelectedAddress={setSelectedAddress}/>
                                )
                            }):isLoading?<span className='w-full flex flex-col items-center justify-center gap-3 dark:text-stone-400 text-lighterText'>جاري التحميل ...<Loader2 className='text-main animate-spin'/></span>:!isLoading&&!isError&&<NotFound name='عناوين'/>
                        }
                        </AnimatePresence>
                        <button onClick={()=>{setSelectedAddress(undefined);setIsOpen(true)}} className='flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:bg-transparent hover:text-main transition duation-150'>
                            <Plus/>
                            عنوان جديد
                        </button>
                    </div>
                    <div className='flex flex-row-reverse mt-8 mx-auto gap-3'>
                        <button disabled={addresses?.length===0} onClick={()=>router.replace(`/`)} className={`'self-center flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 disabled:text-header bg-main dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-slate-400  disabled:hover:text-header transition duation-150`}>
                            حفظ
                        </button>  
                        <button onClick={()=>router.replace(`/`)} className='self-center flex gap-1 items-center px-3 py-2 rounded-2xl text-lighterText dark:text-stone-400 font-bold bg-transparent dark:hover:bg-stone-700 hover:bg-slate-200 transition duation-150'>
                            تخطي
                        </button> 
                    </div>
                </div>
                </motion.div>
  )
}

export default ProfileCompletion