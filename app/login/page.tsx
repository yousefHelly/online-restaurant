'use client'
import SideInformativeImg from '@/components/layout/SideInformativeImg'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Facebook, XOctagon } from 'lucide-react';
import React from 'react'
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Link  from 'next/link';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

type Props = {}

function LoginPage({}: Props) {
    const LoginSchema = z.object({
        email: z.string({required_error:`البريد الإلكتروني مطلوب`}).email({message:'بريد إلكتروني خاطئ'}),
        password: z.string({required_error:`كلمة المرور مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
    })
    type Login = z.infer<typeof LoginSchema>
    const searchParams = useSearchParams()
  return (
    <main className='grid grid-cols-12 p-1 h-screen'>
        <SideInformativeImg header='سجل دخولك الأن' description='لتتمكن من إكمال طلباتك و تستمتع بالحصول علي وجباتك في خلال دقائق'/>
        <div className='col-span-8 flex flex-col items-start gap-3 p-2 overflow-hidden'>
            <div className='flex flex-col gap-3 mx-auto mt-20 w-1/2'>
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
                    callbackUrl:searchParams.get(`callbackUrl`)||''
                }
                )}
                >{
                    ({errors,touched})=>{
                        return <Form className='grid gap-4 mt-6'>
                            <div className='flex flex-col gap-5'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='email'>البريد الإلكتروني</label>
                                <Field className={`border px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`} type='email' name='email' id='email'/>
                                {(errors.email && touched.email)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='email' id='email'/></span>}

                            </div>
                            <div className='flex flex-col gap-3 relative'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='password'>كلمة المرور</label>
                                <Field className={`border px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`} type='password' name='password' id='password'/>
                                {(errors.password && touched.password)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='password' id='password'/></span>}
                            </div>
                            <button className='px-3 py-2  rounded-2xl bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold font-header w-48 mx-auto border border-transparent hover:!border-main hover:bg-transparent hover:text-main transition duration-150' type='submit'>تسجيل الدخول</button>
                            <Link href={`/register`} className='font-nold text-sm text-lighterText dark:text-stone-400 mx-auto hover:underline'>لا تمتلك حساباً؟</Link>
                        </Form>
                    }
                }
                </Formik>
                <span className='text-sm mx-auto font-bold text-lighterText relative before:absolute before:top-1/2 before:-translate-y-1/2 before:left-4 before:mt-[1px] before:w-28 before:h-[1px] before:bg-lighterText after:absolute after:mt-[1px]  after:top-1/2 after:-translate-y-1/2 after:right-4 after:w-28 after:h-[1px] after:bg-lighterText'>او</span>
                <button className='rounded-2xl border border-zinc-400 text-zinc-400 py-3 text-sm font-bold hover:text-slate-50 hover:bg-zinc-400 transition duration-150 self-center px-3 w-80'>
                    تسجيل الدخول مع Google

                </button>
                <button className='group rounded-2xl border border-blue-500 py-3 text-sm font-bold text-blue-500 self-center px-3 w-80 flex items-center justify-center gap-3 hover:text-slate-50 hover:bg-blue-500 transition duration-150'>
                <Facebook className='fill-blue-500 group-hover:fill-slate-50 text-transparent transition duration-150'/>
                    تسجيل الدخول مع Facebook
                </button>
            </div>
        </div>
    </main>
  )
}

export default LoginPage