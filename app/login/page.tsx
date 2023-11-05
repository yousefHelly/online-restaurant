import SideInformativeImg from '@/components/layout/SideInformativeImg'
import LoginForm from '@/components/login/LoginForm';
import { Metadata } from 'next';
import React from 'react'
import { Toaster } from 'react-hot-toast';

type Props = {
    searchParams?: Record<'callbackUrl' | 'error', string>;
}

export const metadata: Metadata = {
    title: 'جو فاست فوود | تسجيل الدخول',
    description: 'سجل دخولك الان في جو فاست فوود لتتمتع بكل خدماتنا من طلب و توصيل و تقييم اطباقنا المميزة',
}
  
function LoginPage({searchParams}: Props) {

  return (
    <main className='grid grid-cols-12 p-1 h-screen overflow-y-scroll'>
        <SideInformativeImg header='سجل دخولك الأن' description='لتتمكن من إكمال طلباتك و تستمتع بالحصول علي وجباتك في خلال دقائق'/>
        <LoginForm searchParams={searchParams}/>
        <Toaster toastOptions={{className:'dark:bg-stone-800 dark:text-stone-300 dark:border dark:border-stone-600'}}/>
    </main>
  )
}

export default LoginPage