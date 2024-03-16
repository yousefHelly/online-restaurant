'use client'
import { DeleteProfileImage, UpdateProfileImage } from '@/lib/api/useUser';
import { Info, Trash2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props = {}

function ProfileImage({}: Props) {
    const {data:session} = useSession()
    const [image, setImage] = useState<FileList | null>()
    const updateImage = UpdateProfileImage()
    const deleteImage = DeleteProfileImage()
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
            <p className='text-lighterText font-bold text-sm my-1'>{session?.user.userName}</p>
            {session?.user.provider!='google'&&<span className='flex items-center gap-2 mt-2 pb-1 text-xs font-bold text-lighterText dark:text-stone-400'><Info size={14}/> إضغط علي الصورة لتفوم بتحديثها</span>}
            {session?.user.provider!='google'&&session?.user.userImgUrl&&<button onClick={()=>{
                deleteImage.mutate(undefined,{
                    onSuccess(data, variables, context) {
                        setImage(null)
                    },
                })
                }} className='mx-auto flex gap-2 items-center justify-center bg-red-500 text-slate-50 transition duration-150 hover:bg-red-600 rounded-md px-2 py-1 my-1 text-xs' type="submit">
                <Trash2Icon/>
                حذف الصورة الشخصية
            </button>}
        </div>
  )
}

export default ProfileImage