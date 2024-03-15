import React from 'react'
import SideInformativeImg from '@/components/layout/SideInformativeImg'
import { Metadata } from 'next'
import SetNewPasswordForm from '@/components/login/SetNewPasswordForm'

export const metadata: Metadata = {
  title: 'تعيين كلمة مرور جديدة',
  description: 'سجل الان في جو فاست فوود لتتمتع بكل خدماتنا من طلب و توصيل و تقييم اطباقنا المميزة',
}

type Props = {
    params: {
        token: string
    }
}


function ResetPasswordPage({params:{token}}:Props) {
    return (
      <main className='grid grid-cols-12 lg:p-1 h-screen overflow-y-hidden overflow-x-hidden '>
        <SideInformativeImg header='تعيين كلمة المرور جديدة' description='حافظ علي كلمة مرورك جيداً هذه المرة 😉'/>
        <SetNewPasswordForm token={token}/>
    </main>
  )
}

export default ResetPasswordPage