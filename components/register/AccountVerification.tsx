'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { ErrorMessage, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import VerificationInput from 'react-verification-input';
import { XOctagon } from 'lucide-react';
import { Confirm, ConfirmSchema } from '@/model/Confirmation';
import { useResendEmail, useVerify } from '@/lib/api/useAuth';

type Props = {
    loginData: {
        email: string,
        password: string
    },
    setStep: (step: 1|2|3)=>void
}

function AccountVerification({ loginData, setStep }: Props) {
    const {email, password} = loginData
    const verify = useVerify()
    const emailResender = useResendEmail()
    const [resendDisabled, setResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(90);
    useEffect(()=>{
        const timer = setTimeout(() => {
            setResendDisabled(false);
            clearTimeout(timer);
        }, 90000);
    },[])
    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const resend = () => {
        emailResender.mutate({email});        
        setResendDisabled(true);
        setCountdown(90);
        const timer = setTimeout(() => {
            setResendDisabled(false);
            clearTimeout(timer);
        }, 90000);
    };
    const formatCountdown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  return (
    <motion.div key={2} initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} exit={{opacity:0, x:25}} className='lg:w-4/5 mx-auto'>
                <h3 className='text-2xl text-center lg:text-start lg:text-3xl font-bold text-stone-300 lg:text-header dark:text-stone-300 font-header'>تأكيد الحساب</h3>
                <p className='text-main/75 lg:text-lighterText dark:text-stone-400 text-center lg:text-start text-sm font-bold my-2'>لقد تم ارسال رمز مكون من 6 ارقام الي بريدك الإلكتروني. الرجاء مراجعة بريدك و ادخال الرمز لتتمكن من المتابعة.</p>
                <Formik<Confirm>
                initialValues={{
                    verificationCode:'',
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(ConfirmSchema)}
                onSubmit={({verificationCode})=>{
                    verify.mutate({email, password,verificationCode}, {
                        onSuccess(data, variables, context) {
                            setStep(3)
                        },
                    })
                }}
                >{
                    ({errors,touched, setValues, values})=>{
                        return <Form className='grid grid-cols-2 gap-4 mt-6'>
                        <div className='flex flex-col items-center col-span-full my-4 gap-3'>
                            <label className='text-stone-300 lg:text-header dark:text-stone-300 font-bold' htmlFor='verificationCode'>رسالة التأكيد</label>
                            <bdi dir='ltr'>
                                <VerificationInput
                                    autoFocus
                                    classNames={{
                                        character: "w-full flex items-center justify-center character rounded-2xl border border-main",
                                        characterInactive: "character--inactive",
                                        characterSelected: " outline-main text-main font-bold",
                                    }}
                                    onChange={(val) => setValues({verificationCode: val})}
                                />
                            </bdi>
                            {(errors.verificationCode && touched.verificationCode) && <span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='verificationCode' id='verificationCode'/></span>}
                        </div>
                        <button disabled={errors.verificationCode !== undefined || values.verificationCode === '' || values.verificationCode.length < 6} className='col-span-2 px-3 py-2  rounded-2xl boder border-transparent text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold font-header w-48 mx-auto border hover:!border-main hover:bg-transparent disabled:text-header bg-main dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-slate-400  disabled:hover:text-header hover:text-main transition duration-150' type='submit'>تأكيد</button>
                        <button disabled={resendDisabled} onClick={resend} className={`col-span-2 px-3 py-2 rounded-2xl boder border-transparent text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold font-header w-48 mx-auto border hover:!border-main hover:bg-transparent ${resendDisabled ? 'disabled:text-header bg-main dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-slate-400 disabled:hover:text-header' : 'bg-main dark:bg-stone-800 dark:hover:bg-main hover:text-main hover:border-main dark:hover:text-header dark:hover:border-main'} transition duration-150`} type='button'>{resendDisabled ? `إعادة الإرسال (${formatCountdown(countdown)})` : 'إعادة الإرسال'}</button>
                    </Form>
                    }
                }
                </Formik>
                </motion.div>
  )
}

export default AccountVerification