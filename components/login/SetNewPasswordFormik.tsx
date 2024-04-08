"use client";
import { useResetPassword } from "@/lib/api/useAuth";
import { ResetPassword, ResetPasswordSchema } from "@/model/ResetPassword";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { XOctagon } from "lucide-react";
import React, { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ShowHidePassword from "../input/ShowHidePassword";
import toast from "react-hot-toast";

type Props = {
  token: string;
};

function SetNewPasswordFormik({ token }: Props) {
  const [eyeSign, setEyeSign] = useState<boolean>(false);
  const [eyeSignVerify, setEyeSignVerify] = useState<boolean>(false);
  const resetPassword = useResetPassword();
  return (
    <Formik<ResetPassword>
      initialValues={{
        email: "",
        token: token,
        newPassword: "",
        verifyPassword: "",
      }}
      validationSchema={toFormikValidationSchema(ResetPasswordSchema)}
      onSubmit={({ verifyPassword, ...vals }, { setSubmitting }) => {
        if (verifyPassword != vals.newPassword) {
          toast.error("تأكيد كلمة المرور لا تطابق كلمة المرور الجديدة");
          setSubmitting(false);
        } else {
          resetPassword.mutate(vals);
        }
      }}
    >
      {({ errors, touched, isSubmitting, values }) => {
        return (
          <Form className='grid gap-4 mt-6'>
            <div className='flex flex-col gap-5'>
              <label
                className='text-stone-300  lg:text-header lg:dark:text-stone-300 font-bold'
                htmlFor='email'
              >
                البريد الإلكتروني
              </label>
              <Field
                className={`border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`}
                type='email'
                name='email'
                id='email'
              />
              {errors.email && touched.email && (
                <span
                  title='خطأ'
                  className='flex items-center gap-1 text-xs text-red-500 dark:text-red-600 font-bold'
                >
                  <XOctagon size={16} className='mt-1' />
                  <ErrorMessage name='email' id='email' />
                </span>
              )}
            </div>
            <div className='flex flex-col gap-5'>
              <label
                className='text-stone-300  lg:text-header lg:dark:text-stone-300 font-bold'
                htmlFor='newPassword'
              >
                كلمة المرور الجديدة
              </label>
              <div className='w-full relative'>
                <Field
                  className={`w-full border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`}
                  type={!eyeSign ? "password" : "text"}
                  name='newPassword'
                  id='newPassword'
                />
                <ShowHidePassword eyeSign={eyeSign} setEyeSign={setEyeSign} />
              </div>
              {errors.newPassword && touched.newPassword && (
                <span
                  title='خطأ'
                  className='flex items-center gap-1 text-xs text-red-500 dark:text-red-600 font-bold'
                >
                  <XOctagon size={16} className='mt-1' />
                  <ErrorMessage name='newPassword' id='newPassword' />
                </span>
              )}
            </div>
            <div className='flex flex-col gap-5'>
              <label
                className='text-stone-300  lg:text-header lg:dark:text-stone-300 font-bold'
                htmlFor='verifyPassword'
              >
                أعد كتابة كلمة المرور الجديدة
              </label>
              <div className='w-full relative'>
                <Field
                  className={`w-full border dark:text-stone-300 dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main focus-within:outline-none`}
                  type={!eyeSignVerify ? "password" : "text"}
                  name='verifyPassword'
                  id='verifyPassword'
                />
                <ShowHidePassword
                  eyeSign={eyeSignVerify}
                  setEyeSign={setEyeSignVerify}
                />
              </div>
              {errors.verifyPassword && touched.verifyPassword && (
                <span
                  title='خطأ'
                  className='flex items-center gap-1 text-xs text-red-500 dark:text-red-600 font-bold'
                >
                  <XOctagon size={16} className='mt-1' />
                  <ErrorMessage name='verifyPassword' id='verifyPassword' />
                </span>
              )}
            </div>
            <button
              disabled={
                isSubmitting ||
                errors.email != undefined ||
                errors.newPassword != undefined ||
                errors.verifyPassword != undefined
              }
              className={`mx-auto my-4 w-40 py-2 text-slate-50 dark:text-stone-900 ${
                isSubmitting ? "text-sm px-2" : "px-8"
              } dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50`}
              type='submit'
            >
              إعادة تعيين
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SetNewPasswordFormik;
