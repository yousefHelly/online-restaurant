import React from 'react'
import SideInformativeImg from '@/components/layout/SideInformativeImg'
import InputSteps from '@/components/register/InputSteps'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'جو فاست فوود | إنشاء حساب جديد ',
  description: 'سجل الان في جو فاست فوود لتتمتع بكل خدماتنا من طلب و توصيل و تقييم اطباقنا المميزة',
}

function RegisterPage() {
    return (
    <main className='grid grid-cols-12 p-1 h-screen'>
        <SideInformativeImg header='سجل الأن' description='لتتمكن من إكمال طلباتك و تستمتع بالحصول علي وجباتك في خلال دقائق'/>
        <InputSteps/>
    </main>
  )
}

export default RegisterPage