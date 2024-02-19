'use client'
import React, { useState } from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter';
import ShowHidePassword from '../input/ShowHidePassword';
import { Login, LoginSchema } from '@/model/Login';
import { XOctagon } from 'lucide-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { PasswordInput } from '@mantine/core';

type Props = {
    searchParams?: Record<'callbackUrl' | 'error', string>;
}

function LoginFormik({searchParams}: Props) {
    const [eyeSign, setEyeSign] = useState<boolean>(false)
  return (
    <Formik<Login>
    initialValues={{
        email:'',
        password:'',    
    }}
    validationSchema={toFormikValidationSchema(LoginSchema)}
    onSubmit={async(vals)=>  signIn("credentials",{ 
        email: vals.email, 
        password: vals.password,
        redirect: true,
        callbackUrl:searchParams?.callbackUrl||''
    }
    ).then((res)=>console.log(res?.error))
    }
    >{
        ({errors,touched, isSubmitting, values, initialValues})=>{
            return <Form className='grid gap-4 mt-6'>
                <div className='flex flex-col gap-5'>
                    <label className='text-zinc-200  lg:text-header lg:dark:text-stone-300 font-bold' htmlFor='email'>البريد الإلكتروني</label>
                    <Field className={`border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`} type='email' name='email' id='email'/>
                    {(errors.email && touched.email)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-500 dark:text-red-600 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='email' id='email'/></span>}
                </div>
                <div className='flex flex-col gap-3 relative'>
                    <label className='text-zinc-200 lg:text-header lg:dark:text-stone-300 font-bold' htmlFor='password'>كلمة المرور</label>
                    <div className='w-full relative'>
                        <Field className={`w-full border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`} type={eyeSign?'text':'password'} name='password' id='password'/>
                        <ShowHidePassword eyeSign={eyeSign} setEyeSign={setEyeSign}/>
                    </div>
                    {(errors.password && touched.password)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-500 dark:text-red-600 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='password' id='password'/></span>}
                </div>
                <button 
                disabled={
                    isSubmitting || 
                    errors.email!=undefined || 
                    errors.password!=undefined
                }
                className={`mx-auto my-4 w-40 py-2 text-slate-50 dark:text-stone-900 ${isSubmitting?'text-sm px-2':'px-8'} dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50`}
                type='submit'
                >
                    {
                        isSubmitting?
                        'جاري تسجيل الدخول...':
                        'تسجيل الدخول'
                    }
                </button>
                <Link href={`/register`} className='font-nold text-sm text-stone-300 dark:text-stone-300 lg:text-lighterText lg:dark:text-stone-400 mx-auto hover:underline'>لا تمتلك حساباً؟</Link>
            </Form>
        }
    }
    </Formik>
  )
}

export default LoginFormik