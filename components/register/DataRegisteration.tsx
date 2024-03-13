'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import axios from '@/lib/api/axios';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { XOctagon } from 'lucide-react';
import  Link  from 'next/link';
import ShowHidePassword from '../input/ShowHidePassword';
import { Register, RegisterSchema } from '@/model/Register';

type Props = {
    setVerCode: (verCode: string)=>void,
    setLoginData: ({email, password}:{email: string, password: string})=>void,
    setStep: (step: 1|2|3)=>void
}

function DataRegisteration({setVerCode, setLoginData, setStep}: Props) {
    
    const [eyeSign, setEyeSign] = useState<boolean>(false)

  return (
    <motion.div key={1} exit={{opacity:0, x:25}} className='w-full lg:w-4/5 lg:px-5 lg:mx-auto'>
                <h3 className='hidden lg:block text-3xl font-bold text-header dark:text-stone-300 font-header'>إنشاء حساب جديد</h3>
                <Formik<Register>
                initialValues={{
                    firstName:'',
                    lastName:'',
                    userName:'',
                    email:'',
                    password:'',
                }}
                validationSchema={toFormikValidationSchema(RegisterSchema)}
                onSubmit={async(vals)=>{
                    const bodyFormData = new FormData();
                    bodyFormData.append('FirstName', vals.firstName)
                    bodyFormData.append('LastName', vals.lastName)
                    bodyFormData.append('UserName', vals.userName)
                    bodyFormData.append('Email', vals.email)
                    bodyFormData.append('Password', vals.password)
                    await axios.post<AuthResponse&{
                        verificationCode: string
                    }>('/api/Auth/register',bodyFormData,{headers: { "Content-Type": "multipart/form-data" }})
                    .then(async(res)=>{
                        setVerCode(res.data.verificationCode)
                          
                    }).then(()=>{setLoginData({email:vals.email, password:vals.password});setStep(2);}).catch((err: AxiosError)=>toast.error(err.response?.data as string))
                }}
                >{
                    ({errors,touched, isSubmitting, values, initialValues})=>{
                        return <Form className='w-full grid lg:grid-cols-2 gap-4 mt-6 overflow-y-auto h-[55vh] pl-3 lg:h-full'>
                            <div className='flex flex-col gap-3'>
                                <label className='text-stone-300 lg:text-header dark:text-stone-300 font-bold' htmlFor='firstName'>الاسم الاول</label>
                                <Field className={`border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='text' name='firstName' id='firstName'/>
                                {(errors.firstName && touched.firstName)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-600 lg:text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='firstName' id='firstName'/></span>}
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className='text-stone-300 lg:text-header dark:text-stone-300 font-bold' htmlFor='lastName'>اسم العائلة</label>
                                <Field className={`border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='text' name='lastName' id='lastName'/>
                                {(errors.lastName && touched.lastName)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-600 lg:text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='lastName' id='lastName'/></span>}
    
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className='text-stone-300 lg:text-header dark:text-stone-300 font-bold' htmlFor='userName'>اسم المستخدم</label>
                                <Field className={`border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='text' name='userName' id='userName'/>
                                {(errors.userName && touched.userName)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-600 lg:text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage  name='userName' id='userName'/></span>}
    
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className='text-stone-300 lg:text-header dark:text-stone-300 font-bold' htmlFor='email'>البريد الإلكتروني</label>
                                <Field className={`border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='email' name='email' id='email'/>
                                {(errors.email && touched.email)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-600 lg:text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='email' id='email'/></span>}
    
                            </div>
                            <div className='flex flex-col gap-3 relative'>
                                <label className='text-stone-300 lg:text-header dark:text-stone-300 font-bold' htmlFor='password'>كلمة المرور</label>
                                <div className='w-full relative'>
                                    <Field className={`w-full border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type={eyeSign?'text':'password'} name='password' id='password'/>
                                    <ShowHidePassword eyeSign={eyeSign} setEyeSign={setEyeSign}/>
                                </div>

                                {(errors.password && touched.password)&&<span title='خطأ' className='flex items-center gap-1 text-xs text-red-600 lg:text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='password' id='password'/></span>}
                            </div>
                            <button 
                            disabled={
                                values.firstName === initialValues.firstName || 
                                values.lastName === initialValues.lastName || 
                                values.email === initialValues.email || 
                                values.password === initialValues.password || 
                                values.userName === initialValues.userName || 
                                isSubmitting || 
                                errors.email!=undefined || 
                                errors.firstName!=undefined || 
                                errors.lastName!=undefined || 
                                errors.userName!=undefined || 
                                errors.password!=undefined
                            } 
                            className='col-span-full mx-auto my-4 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' 
                            type='submit'
                            >
                                {
                                    isSubmitting?
                                    'جاري التسجيل ..':
                                    'تسجيل'
                                }
                            </button>
                            <Link href={`/login`} className='lg:col-span-2 font-nold text-sm text-lighterText dark:text-stone-400 mx-auto hover:underline'>لديك حساب بالفعل ؟</Link>
                        </Form>
                    }
                }
                </Formik>
                </motion.div>
  )
}

export default DataRegisteration