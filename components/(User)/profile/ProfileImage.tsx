'use client'
import { UpdateProfileImage } from '@/lib/api/useUser';
import { Trash2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props = {}

function ProfileImage({}: Props) {
    const {data:session} = useSession()
    const [image, setImage] = useState<FileList | null>()
    const updateImage = UpdateProfileImage()
    useEffect(()=>{
        if(image!=null){
          updateImg(image)
        }
      },[image])
    async function updateImg(img:FileList | null) {
        img&&updateImage.mutate({img})
    }
  return (
        <div className='flex flex-col items-center justify-center my-2'>
            {
            !session?.user.provider&&
                <div className='group relative overflow-hidden'>
                    <input onChange={(e)=>{e.target.files&&setImage(e.target.files);}} type="file" hidden id='profile' name='profile' accept='image/png, image/jpeg' />
                    <label htmlFor="profile" className='z-30'>
                        <Image src={session?.user.userImgUrl?session?.user.userImgUrl:image&&URL.createObjectURL(image[0]) ||'/static/default-user-icon.jpg'} alt={session?.user.userName!} width={400} height={400} className='rounded-full h-[75px] w-[75px] object-cover'></Image>
                        <span className='absolute h-[75px] w-[75px] rounded-full bg-main/75 backdrop-blur-md flex justify-center items-center -bottom-[100%] group-hover:bottom-0 text-slate-50 font-bold text-xs cursor-pointer'>رفع صورة</span>
                    </label>
                </div>
            }
            {
            session?.user.provider==='google'&&
                <div className='group relative overflow-hidden'>
                        <Image 
                        src={session?.user.userImgUrl?session?.user.userImgUrl:'/static/default-user-icon.jpg'} 
                        alt={session?.user.userName} 
                        width={400} 
                        height={400} 
                        className='rounded-full h-[75px] w-[75px] object-cover'
                        onError={(e)=>e.currentTarget.src='/static/default-user-icon.jpg'}
                        />
                </div>
            }
                <p className='text-lighterText font-bold text-sm my-2'>{session?.user.userName}</p>
            {session?.user.provider==='credentials'&&session?.user.userImgUrl&&<Trash2Icon onClick={()=>updateImg(null)} className='text-red-500 cursor-pointer hover:bg-red-500 hover:text-slate-50 dark:hover:text-stone-900 transition duration-150 p-2 rounded-full w-10 h-10 flex items-center justify-center'/>}
        </div>
  )
}

export default ProfileImage