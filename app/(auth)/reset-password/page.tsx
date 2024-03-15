import React from 'react'
import SideInformativeImg from '@/components/layout/SideInformativeImg'
import { Metadata } from 'next'
import ResetPasswordForm from '@/components/login/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'إعادة تعيين كلمة المرور',
  description: 'سجل الان في جو فاست فوود لتتمتع بكل خدماتنا من طلب و توصيل و تقييم اطباقنا المميزة',
}

function ResetPasswordPage() {
    return (
      <main className='grid grid-cols-12 lg:p-1 h-screen overflow-y-hidden overflow-x-hidden '>
        <SideInformativeImg header='إعادة تعيين كلمة المرور' description='نسيت كلمة مرورك؟ لا مشكلة يمكنك إعادة تعيينها الان بمنتهي السهولة!'/>
        <ResetPasswordForm/>
    </main>
  )
}

export default ResetPasswordPage