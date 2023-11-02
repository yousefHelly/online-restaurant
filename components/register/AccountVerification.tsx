import React from 'react'
import { motion } from 'framer-motion';
import { ErrorMessage, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import VerificationInput from 'react-verification-input';
import { XOctagon } from 'lucide-react';
import toast from 'react-hot-toast';

type Props = {
    loginData: {
        email: string,
        password: string
    },
    verCode: string,
    setStep: (step: 1|2|3)=>void
}

function AccountVerification({loginData, verCode, setStep}: Props) {
    const ConfirmSchema = z.object({
        confirmationCode:z.string({required_error:'رسالة التأكيد مطلوبة'}).min(6,{message:'رسالة التأكيد يجب ان تتكون من 6 ارقام'}).max(6,{message:'رسالة التأكيد يجب ان تتكون من 6 ارقام'})
    })
    type Confirm = z.infer<typeof ConfirmSchema>
  return (
    <motion.div key={2} initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} exit={{opacity:0, x:25}} className='w-4/5 mx-auto'>
                <h3 className='text-3xl font-bold text-header dark:text-stone-300 font-header'>تأكيد الحساب</h3>
                <p className='text-lighterText dark:text-stone-400 text-sm font-bold my-2'>لقد تم ارسال رمز مكون من 6 ارقام الي بريدك الإلكتروني. الرجاء مراجعة بريدك و ادخال الرمز لتتمكن من المتابعة</p>
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
                    ({errors,touched, setValues})=>{
                        return <Form className='grid grid-cols-2 gap-4 mt-6'>
                            <div className='flex flex-col items-center col-span-full my-4 gap-3'>
                                <label className='text-header dark:text-stone-300 font-bold' htmlFor='firstName'>رسالة التأكيد</label>
                                <bdi>
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
                            <button className='col-span-2 px-3 py-2  rounded-2xl boder border-transparent bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold font-header w-48 mx-auto border hover:!border-main hover:bg-transparent hover:text-main transition duration-150' type='submit'>تأكيد</button>
                        </Form>
                    }
                }
                </Formik>
                </motion.div>
  )
}

export default AccountVerification