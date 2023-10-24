import React from 'react'
import { motion } from 'framer-motion';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import axios from '@/lib/api/axios';
import  emailjs  from 'emailjs-com';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { XOctagon } from 'lucide-react';
import { z } from 'zod';
import  Link  from 'next/link';

type Props = {
    setVerCode: (verCode: string)=>void,
    setLoginData: ({email, password}:{email: string, password: string})=>void,
    setStep: (step: 1|2|3)=>void
}

function DataRegisteration({setVerCode, setLoginData, setStep}: Props) {
    const RegisterSchema = z.object({
        firstName: z.string({required_error:`الاسم الاول مطلوب`}).min(2,{message:'يجب ان يكون الاسم الاول حرفين علي الاقل'}),
        lastName: z.string({required_error:`اسم العائلة مطلوب`}).min(2,{message:'يجب ان يكون اسم العائلة حرفين علي الاقل'}),
        userName: z.string({required_error:`اسم المستخدم مطلوب`}).min(3,{message:'يجب ان يكون اسم المستخدم 3 احرف علي الاقل'}),
        email: z.string({required_error:`البريد الإلكتروني مطلوب`}).email({message:'بريد إلكتروني خاطئ'}),
        password: z.string({required_error:`كلمة المرور مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
    })
    type Register = z.infer<typeof RegisterSchema>
  return (
    <motion.div key={1} exit={{opacity:0, x:25}} className='w-4/5 mx-auto'>
                <h3 className='text-3xl font-bold text-header dark:text-stone-300 font-header'>إنشاء حساب جديد</h3>
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
                    console.log(vals);
                    const bodyFormData = new FormData();
                    bodyFormData.append('FirstName', vals.firstName)
                    bodyFormData.append('LastName', vals.lastName)
                    bodyFormData.append('UserName', vals.userName)
                    bodyFormData.append('Email', vals.email)
                    bodyFormData.append('Password', vals.password)
                    await axios.post<{
                        message: string | null,
                        isAuthenticated: boolean,
                        userName: string,
                        email: string,
                        roles: ("User" | "Admin")[],
                        token: string,
                        expiresOn: string,
                        userImgUrl: string | null,
                        verificationCode: string
                    }>('https://localhost:7166/api/Auth/register',bodyFormData,{headers: { "Content-Type": "multipart/form-data" }})
                    .then(async(res)=>{
                        setVerCode(res.data.verificationCode)
                        await emailjs.send(
                            process.env.EMAIL_SERVICE_ID!,
                            process.env.EMAIL_TEMPLATE_ID!,
                            {
                                from_name: "GO fast food",
                                to_name: vals.firstName,
                                message: `${res.data.verificationCode} : رمز تأكيد بريدك الإلكتروني هو`,
                                reply_to: vals.email
                            },
                            process.env.EMAIL_USER_ID!
                        );   
                    }).then(()=>{setLoginData({email:vals.email, password:vals.password});setStep(2);}).catch((err: AxiosError)=>toast.error(err.response?.data as string))
                }}
                >{
                    ({errors,touched})=>{
                        return <Form className='grid grid-cols-2 gap-4 mt-6'>
                            <div className='flex flex-col gap-3'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='firstName'>الاسم الاول</label>
                                <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='text' name='firstName' id='firstName'/>
                                {(errors.firstName && touched.firstName)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='firstName' id='firstName'/></span>}
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='lastName'>اسم العائلة</label>
                                <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='text' name='lastName' id='lastName'/>
                                {(errors.lastName && touched.lastName)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='lastName' id='lastName'/></span>}
    
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='userName'>اسم المستخدم</label>
                                <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='text' name='userName' id='userName'/>
                                {(errors.userName && touched.userName)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage  name='userName' id='userName'/></span>}
    
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='email'>البريد الإلكتروني</label>
                                <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='email' name='email' id='email'/>
                                {(errors.email && touched.email)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='email' id='email'/></span>}
    
                            </div>
                            <div className='flex flex-col gap-3 relative'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='password'>كلمة المرور</label>
                                <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} type='password' name='password' id='password'/>
                                {(errors.password && touched.password)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='password' id='password'/></span>}
                            </div>
                            <button className='col-span-2 px-3 py-2  rounded-2xl bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold font-header w-48 mx-auto border border-transparent hover:!border-main hover:bg-transparent hover:text-main transition duration-150' type='submit'>تسجيل</button>
                            <Link href={`/login`} className='col-span-2 font-nold text-sm text-lighterText dark:text-slate-400 mx-auto hover:underline'>لديك حساب بالفعل ؟</Link>
                        </Form>
                    }
                }
                </Formik>
                </motion.div>
  )
}

export default DataRegisteration