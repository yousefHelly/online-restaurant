'use client'
import { UpdateProfile } from '@/lib/api/useUser';
import { User, UserDataSchema } from '@/model/Profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AlertOctagon, XOctagon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter';

type Props = {}

function UpdateProfileForm({}: Props) {
    const {data:session} = useSession()
    const updateProfile = UpdateProfile()
  return (
    <Formik<User>
            initialValues={{
                firstName:session?.user.firstName || '',
                lastName:session?.user.lastName || '',
                userName:session?.user.userName || '',
            }}
            enableReinitialize
            validationSchema={toFormikValidationSchema(UserDataSchema)}
            onSubmit={(vals)=>updateProfile.mutate({vals})}
            >{
                ({errors,touched, values, initialValues})=>{
                    return <Form className='grid grid-cols-2 gap-4 lg:mt-6'>
                    {
                        session?.user.provider==='google'&&<span className='col-span-full flex items-center gap-1 text-xs text-main font-bold'><AlertOctagon size={16} className='mt-1'/>لا يمكنك تغيير بيانات حسابك إلا في حالة التسجيل ب بريد إلكتروني و كلمة مرور.</span>
                    }
                        <div className='flex flex-col gap-3'>
                            <label className='text-header dark:text-stone-300 font-bold' htmlFor='firstName'>الاسم الاول</label>
                            <Field disabled={session?.user.provider==='google'} className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none disabled:text-stone-400`} type='text' name='firstName' id='firstName'/>
                            {(errors.firstName && touched.firstName)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='firstName' id='firstName'/></span>}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label className='text-header dark:text-stone-300 font-bold' htmlFor='lastName'>اسم العائلة</label>
                            <Field disabled={session?.user.provider==='google'} className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none disabled:text-stone-400`} type='text' name='lastName' id='lastName'/>
                            {(errors.lastName && touched.lastName)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='lastName' id='lastName'/></span>}

                        </div>
                        <div className='flex flex-col gap-3'>
                            <label className='text-header dark:text-stone-300 font-bold' htmlFor='userName'>اسم المستخدم</label>
                            <Field disabled={session?.user.provider==='google'} className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none disabled:text-stone-400`} type='text' name='userName' id='userName'/>
                            {(errors.userName && touched.userName)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage  name='userName' id='userName'/></span>}
                        </div>
                        <span></span>
                        <button disabled={values.firstName===initialValues.firstName && values.lastName===initialValues.lastName && values.userName===initialValues.userName} className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
                        <button disabled={values.firstName===initialValues.firstName && values.lastName===initialValues.lastName && values.userName===initialValues.userName || errors.userName!=undefined || errors.firstName!=undefined || errors.lastName!=undefined} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                        </Form>
                }
            }
    </Formik>
  )
}

export default UpdateProfileForm