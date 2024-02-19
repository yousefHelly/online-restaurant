import React from 'react'
import { motion } from 'framer-motion';
import { ErrorMessage, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import VerificationInput from 'react-verification-input';
import { XOctagon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Confirm, ConfirmSchema } from '@/model/Confirmation';

type Props = {
    loginData: {
        email: string,
        password: string
    },
    verCode: string,
    setStep: (step: 1|2|3)=>void
}

function AccountVerification({loginData, verCode, setStep}: Props) {

  return (
    <motion.div key={2} initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} exit={{opacity:0, x:25}} className='lg:w-4/5 mx-auto'>
                <h3 className='text-2xl text-center lg:text-start lg:text-3xl font-bold text-stone-300 lg:text-header dark:text-stone-300 font-header'>تأكيد الحساب</h3>
                <p className='text-main/75 lg:text-lighterText dark:text-stone-400 text-center lg:text-start text-sm font-bold my-2'>لقد تم ارسال رمز مكون من 6 ارقام الي بريدك الإلكتروني. الرجاء مراجعة بريدك و ادخال الرمز لتتمكن من المتابعة.</p>
                <Formik<Confirm>
                initialValues={{
                    confirmationCode:'',
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(ConfirmSchema)}
                onSubmit={(vals)=>{
                    if(vals.confirmationCode === verCode) {
                        async()=>  await signIn("credentials",{ email: loginData.email, password: loginData.password, redirect:false })
                        setStep(3)
                    }else{
                        toast.error('كود تأكيد الحساب خاطئ !');
                    }     
                }}
                >{
                    ({errors,touched, setValues, values})=>{
                        return <Form className='grid grid-cols-2 gap-4 mt-6'>
                            <div className='flex flex-col items-center col-span-full my-4 gap-3'>
                                <label className='text-stone-300 lg:text-header dark:text-stone-300 font-bold' htmlFor='firstName'>رسالة التأكيد</label>
                                <bdi dir='ltr'>
                                <VerificationInput
                                autoFocus
                                classNames={{
                                    character: "w-full flex items-center justify-center character rounded-2xl border border-main",
                                    characterInactive: "character--inactive",
                                    characterSelected: " outline-main text-main font-bold",
                                }}
                                onChange={(val)=>setValues({confirmationCode:val})}
                                />
                                </bdi>
                                {(errors.confirmationCode && touched.confirmationCode)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='confirmationCode' id='confirmationCode'/></span>}
                            </div>
                            <button disabled={errors.confirmationCode !=undefined || values.confirmationCode=='' || values.confirmationCode.length<6} className='col-span-2 px-3 py-2  rounded-2xl boder border-transparent text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold font-header w-48 mx-auto border hover:!border-main hover:bg-transparent disabled:text-header bg-main dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-slate-400  disabled:hover:text-header hover:text-main transition duration-150' type='submit'>تأكيد</button>
                        </Form>
                    }
                }
                </Formik>
                </motion.div>
  )
}

export default AccountVerification