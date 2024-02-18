import React from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import UpdateProfileForm from './UpdateProfileForm'
import Addresses from './Addresses'
import ProfileImage from './ProfileImage'

type Props = {}

function ProfileContent({}: Props) { 
  return (
    <div className='flex flex-col gap-5 w-full my-5'>
        <div className='flex justify-between items-center'>
            <h2 className='text-2xl lg:text-3xl dark:text-stone-300'>صورتي الشخصية</h2>
        </div>
        <ProfileImage/>
        <div className='flex justify-between items-center'>
            <h2 className='text-2xl lg:text-3xl dark:text-stone-300'>معلومات حسابي</h2>
        </div>
        <UpdateProfileForm/>
        <div className='flex justify-between items-center'>
        <h2 className='text-2xl lg:text-3xl dark:text-stone-300'>تغيير كلمة المرور</h2>
        </div>
        <ChangePasswordForm/>
        <div className='flex justify-between items-center'>
        <h2 className='text-2xl lg:text-3xl dark:text-stone-300'>عناويني</h2>
        </div>
        <Addresses/>
    </div>
  )
}

export default ProfileContent