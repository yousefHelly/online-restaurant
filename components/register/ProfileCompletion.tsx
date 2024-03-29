'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import useAddress from '@/lib/api/UseAddress';
import Image from 'next/image';
import Addresses from '../(User)/profile/Addresses';
import { UpdateProfileImage } from '@/lib/api/useUser';


function ProfileCompletion() {
    const router = useRouter()
    const [image, setImage] = useState<FileList | null>(null)
    useAxiosAuth()
    const updateImage = UpdateProfileImage()
    const {data:session} = useSession()
    async function updateImg(img:FileList) {
        if(img.item(0)){
            updateImage.mutate({img})
        }
    }
    useEffect(()=>{
    if(image!=null){
        updateImg(image)
    }
    },[image])
    const {data:addresses} = useAddress()
  return (
    <motion.div key={3} initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} className='w-4/5 mx-auto'>
        <h3 className='text-2xl text-center lg:text-start lg:text-3xl font-bold text-stone-300 lg:text-header dark:text-stone-300 font-header'>إكمال بيانات الحساب</h3>
        <div className='flex flex-col w-full my-10'>
        { 
        session?.user.provider != 'google'&&<div className='flex flex-col w-full '>
                <h4 className='text-stone-300 lg:text-header dark:text-stone-300 font-header text-xl font-bold'>ارفع صورة لملفك الشخصي !</h4>
                <div className='flex flex-col items-center justify-center my-2'>
                    <div className='group relative overflow-hidden'>
                        <input onChange={(e)=>{e.target.files&&setImage(e.target.files);}} type="file" hidden id='profile' name='profile' accept='image/png, image/jpeg' />
                        <label htmlFor="profile" className='z-30'>
                            <Image src={image&&URL.createObjectURL(image[0]) ||'/static/default-user-icon.jpg'} alt={session?.user.userName || 'صورة المستخدم'} height={75} width={75} className='rounded-full h-[75px] w-[75px] object-cover'></Image>
                            <span className='absolute h-[75px] w-[75px] rounded-full bg-main/75 backdrop-blur-md flex justify-center items-center -bottom-[100%] group-hover:bottom-0 text-slate-50 font-bold text-xs cursor-pointer'>رفع صورة</span>
                        </label>
                    </div>
                    <p className='text-lighterText font-bold text-sm my-2'>{session?.user.userName}</p>
                </div>
            </div>
        }
            <div className='w-full flex flex-col justify-start items-start gap-3'>
                <p className='text-stone-300 lg:text-header text-xl font-bold font-header dark:text-stone-300'>اضف عنوان :</p>
                <Addresses/>
            </div>
            <div className='flex flex-row-reverse mt-8 mx-auto gap-3'> 
                <button onClick={()=>router.replace(`/`)} className='self-center flex gap-1 items-center px-3 py-2 rounded-2xl text-lighterText dark:text-stone-400 font-bold bg-transparent dark:hover:bg-stone-700 hover:bg-slate-200 transition duation-150'>
                    تخطي
                </button> 
            </div>
        </div>
    </motion.div>
  )
}

export default ProfileCompletion