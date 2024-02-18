'use client'
import { UpdatePassword } from '@/lib/api/useUser'
import { PasswordUpdate, PasswordUpdateSchema } from '@/model/PasswordUpdate'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { AlertOctagon, XOctagon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'

type Props = {}

function ChangePasswordForm({}: Props) {
    const {data:session} = useSession()
    const updatePassword = UpdatePassword()
  return (
        <Formik<PasswordUpdate>
            initialValues={{
                oldPassword:'',
                newPassword:''
            }}
            enableReinitialize
            validationSchema={toFormikValidationSchema(PasswordUpdateSchema)}
            onSubmit={async(vals)=>{updatePassword.mutate({vals})}}
            >{
                ({errors,touched, values, initialValues})=>{
                return <Form className='grid grid-cols-2 gap-4 lg:mt-6'>
                    {
                        session?.user.provider==='google'&&<span className='col-span-full flex items-center gap-1 text-xs text-main font-bold'><AlertOctagon size={16} className='mt-1'/>لا يمكنك تغيير بيانات حسابك إلا في حالة التسجيل ب بريد إلكتروني و كلمة مرور.</span>
                    }
                    <div className='flex flex-col gap-3'>
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='oldPassword'>كلمة المرور القديمة</label>
                        <Field disabled={session?.user.provider==='google'} className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none disabled:text-stone-400`} type='password' name='oldPassword' id='oldPassword'/>
                        {(errors.oldPassword && touched.oldPassword)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='oldPassword' id='oldPassword'/></span>}
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='newPassword'>كلمة المرور الجديدة</label>
                        <Field disabled={session?.user.provider==='google'} className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none disabled:text-stone-400`} type='password' name='newPassword' id='newPassword'/>
                        {(errors.newPassword && touched.newPassword)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='newPassword' id='newPassword'/></span>}

                    </div>
                    <button disabled={ values.oldPassword === initialValues.oldPassword  || values.newPassword === initialValues.newPassword || errors.newPassword!=undefined || errors.oldPassword!=undefined} className='col-span-2 w-40 mx-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                </Form>
                }
            }
        </Formik>
  )
}

export default ChangePasswordForm