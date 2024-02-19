import React from 'react'
import LoginFormik from './LoginFormik';
import GoogleLoginBtn from './GoogleLoginBtn';
import { Alert } from '@mantine/core';
import { AlertTriangleIcon } from 'lucide-react';
import Logo from '../layout/Logo';
import Image from 'next/image';

type Props = {
    searchParams?: Record<'callbackUrl' | 'error', string>;
}

function LoginForm(props: Props) {
  return (
    <>
    <div className='hidden col-span-full lg:col-span-8 lg:flex flex-col items-start gap-3 p-2 overflow-hidden'>
    <div className='flex flex-col gap-3 mx-auto lg:mt-20 lg:w-2/3 overflow-y-scroll px-5'>
        <h3 className='text-center lg:text-start text-2xl lg:text-3xl font-bold text-header dark:text-stone-300 font-header'>تسجيل الدخول</h3>
        {
            props.searchParams?.error&&<Alert color='red' icon={<AlertTriangleIcon className='pt-1'/>}>
                <h4 className='text-lg'>
                    {props.searchParams?.error.includes('ECONNREFUSED')?'لا يوجد إتصال بالإنترنت':props.searchParams?.error}
                </h4>
            </Alert>
        }
        <LoginFormik {...props}/>
        <span className='text-sm mx-auto font-bold text-lighterText relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-4 before:mt-[1px] before:w-28 before:h-[1px] before:bg-lighterText after:absolute after:mt-[1px]  after:top-1/2 after:-translate-y-1/2 after:right-4 after:w-28 after:h-[1px] after:bg-lighterText'>او</span>
        <GoogleLoginBtn {...props}/>
        {/* <button onClick={()=>signIn('facebook', { redirect: true, callbackUrl:searchParams?.callbackUrl||'' })} className='group rounded-2xl border border-blue-500 py-3 text-sm font-bold text-blue-500 self-center px-3 w-80 flex items-center justify-center gap-3 hover:text-slate-50 hover:bg-blue-500 transition duration-150'>
        <Facebook className='fill-blue-500 group-hover:fill-slate-50 text-transparent transition duration-150'/>
            تسجيل الدخول مع Facebook
        </button> */}
    </div>
    </div>
    <div className='col-span-full lg:hidden w-full'>
    <Image
        src={`https://images.unsplash.com/photo-1574936145840-28808d77a0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
        alt={''}
        width={400}
        height={800}
        className='w-full h-full object-cover absolute inset-0'
        />
        <div className='w-full h-full flex flex-col gap-2 mx-auto p-5 relative bg-stone-900/20 backdrop-blur-lg'>
            <Logo fontSize='text-2xl pb-1' color='text-stone-300' iconSize='28'/>
            <span className='text-lg mx-auto font-bold text-lighterText relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-4 before:mt-[1px] before:w-28 before:h-[1px] before:bg-lighterText after:absolute after:mt-[1px]  after:top-1/2 after:-translate-y-1/2 after:right-4 after:w-28 after:h-[1px] after:bg-lighterText'>X</span>
            <h3 className='text-center lg:text-start text-2xl lg:text-3xl font-bold text-stone-300 lg:text-header lg:dark:text-stone-300 font-header mb-2'>تسجيل الدخول</h3>
            {
                props.searchParams?.error&&<Alert color='orange' py={"lg"} icon={<AlertTriangleIcon className='pt-1'/>}>
                    <h4 className='text-lg  text-stone-300 lg:text-header'>
                        {props.searchParams?.error.includes('ECONNREFUSED')?'لا يوجد إتصال بالإنترنت':props.searchParams?.error}
                    </h4>
                </Alert>
            }
            <LoginFormik {...props}/>
            <span className='text-lg mx-auto font-bold text-zinc-100 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-6 before:mt-[1px] before:w-28 before:h-[1px] before:bg-zinc-100 after:absolute after:mt-[1px]  after:top-1/2 after:-translate-y-1/2 after:right-6 after:w-28 after:h-[1px] after:bg-zinc-100 my-5'>او</span>
            <GoogleLoginBtn {...props}/>
        </div>
    </div>
    </>
  )
}

export default LoginForm