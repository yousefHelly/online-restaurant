'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Eye, EyeOff, Facebook, XOctagon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Link  from 'next/link';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import ShowHidePassword from '../input/ShowHidePassword';
type Props = {
    searchParams?: Record<'callbackUrl' | 'error', string>;
}

function LoginForm({searchParams}: Props) {
    const LoginSchema = z.object({
        email: z.string({required_error:`البريد الإلكتروني مطلوب`}).email({message:'بريد إلكتروني خاطئ'}),
        password: z.string({required_error:`كلمة المرور مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
    })
    type Login = z.infer<typeof LoginSchema>
    useEffect(()=>{
        searchParams?.error&&toast.error(searchParams?.error,{id:'LoginError'})
    },[])
    const [eyeSign, setEyeSign] = useState<boolean>(false)
  return (
    <div className='col-span-8 flex flex-col items-start gap-3 p-2 overflow-hidden'>
    <div className='flex flex-col gap-3 mx-auto mt-20 w-2/3 overflow-y-scroll px-5'>
        <h3 className='text-3xl font-bold text-header dark:text-stone-300 font-header'>تسجيل الدخول</h3>
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
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='email'>البريد الإلكتروني</label>
                        <Field className={`border px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`} type='email' name='email' id='email'/>
                        {(errors.email && touched.email)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='email' id='email'/></span>}

                    </div>
                    <div className='flex flex-col gap-3 relative'>
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='password'>كلمة المرور</label>
                        <Field className={`border px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`} type={eyeSign?'text':'password'} name='password' id='password'/>
                        <ShowHidePassword eyeSign={eyeSign} setEyeSign={setEyeSign} condition={(errors.password && touched.password)!=undefined}/>
                        {(errors.password && touched.password)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='password' id='password'/></span>}
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
                    <Link href={`/register`} className='font-nold text-sm text-lighterText dark:text-stone-400 mx-auto hover:underline'>لا تمتلك حساباً؟</Link>
                </Form>
            }
        }
        </Formik>
        <span className='text-sm mx-auto font-bold text-lighterText relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-4 before:mt-[1px] before:w-28 before:h-[1px] before:bg-lighterText after:absolute after:mt-[1px]  after:top-1/2 after:-translate-y-1/2 after:right-4 after:w-28 after:h-[1px] after:bg-lighterText'>او</span>
        <button onClick={()=>signIn('google', { redirect: true, callbackUrl:searchParams?.callbackUrl||'' })} className='rounded-2xl border border-zinc-400 text-zinc-400 py-3 text-sm font-bold hover:text-slate-50 hover:bg-zinc-400 transition duration-150 self-center px-3 w-80 flex items-center justify-center flex-row-reverse'>
            <span>تسجيل الدخول مع Google</span>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" className='ml-7'>
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
        </button>
        <button onClick={()=>signIn('facebook', { redirect: true, callbackUrl:searchParams?.callbackUrl||'' })} className='group rounded-2xl border border-blue-500 py-3 text-sm font-bold text-blue-500 self-center px-3 w-80 flex items-center justify-center gap-3 hover:text-slate-50 hover:bg-blue-500 transition duration-150'>
        <Facebook className='fill-blue-500 group-hover:fill-slate-50 text-transparent transition duration-150'/>
            تسجيل الدخول مع Facebook
        </button>
    </div>
    </div>
  )
}

export default LoginForm