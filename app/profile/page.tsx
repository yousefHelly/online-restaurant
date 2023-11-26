'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Plus, Trash2Icon, XOctagon, PlusCircle, Loader2, AlertOctagon } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import useAddress from '@/lib/api/UseAddress'
import NotFound from '@/components/layout/NotFound'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import { axiosAuth } from '@/lib/api/axios'
import toast from 'react-hot-toast'
import AddressModal from '@/components/(User)/profile/AddressModal'
import { useQueryClient } from 'react-query';
import AddressItem from '@/components/(User)/profile/AddressItem'

type Props = {}

function ProfilePage({}: Props) {
  const UserDataSchema = z.object({
    firstName: z.string({required_error:`الاسم الاول مطلوب`}).min(2,{message:'يجب ان يكون الاسم الاول حرفين علي الاقل'}),
    lastName: z.string({required_error:`اسم العائلة مطلوب`}).min(2,{message:'يجب ان يكون اسم العائلة حرفين علي الاقل'}),
    userName: z.string({required_error:`اسم المستخدم مطلوب`}).min(3,{message:'يجب ان يكون اسم المستخدم 3 احرف علي الاقل'}),
  })
  type User = z.infer<typeof UserDataSchema>
  const PasswordUpdateSchema = z.object({
    oldPassword:z.string({required_error:`كلمة المرور القديمة مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'}),
    newPassword:z.string({required_error:`كلمة المرور الجديدة مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
  })
  type PasswordUpdate = z.infer<typeof PasswordUpdateSchema>
  const {data:session, update} = useSession()
  const [image, setImage] = useState<FileList | null>()
  useEffect(()=>{
    if(image!=null){
      updateImg(image)
    }
  },[image])
  useAxiosAuth()
  const {data, isLoading, isError} = useAddress()
  async function updateImg(img:FileList | null) {
    session?.user.provider==='credentials'&&axiosAuth.put<UpdateAuth>('https://localhost:7166/api/Auth/updateAccount',{UserImg:img?img.item(0):session?.user.userImgUrl},{headers: { "Content-Type": "multipart/form-data" }}).then(async(res)=>{await update({...session,user:res.data.user});toast.success(res.data.message)}).catch((err)=>toast.error(err.data.message))
  }
  const queryClient = useQueryClient()
  useEffect(()=>{
    queryClient.resetQueries(['profile', 'address'])
  },[])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedAddress, setSelectedAddress] = useState<Address>()
  return (
    <>
    <main className="flex min-h-screen flex-col items-start pb-20 px-24 overflow-x-hidden">
        <div className='flex flex-col gap-5 w-full my-5'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-4xl dark:text-stone-300'>صفحتي الشخصية</h2>
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl dark:text-stone-300'>صورتي الشخصية</h2>
          </div>
          <div className='flex flex-col items-center justify-center my-2'>
            {
              session?.user.provider==='credentials'&&
                <div className='group relative overflow-hidden'>
                    <input onChange={(e)=>{e.target.files&&setImage(e.target.files);}} type="file" hidden id='profile' name='profile' accept='image/png, image/jpeg' />
                      <label htmlFor="profile" className='z-30'>
                        <img src={session?.user.userImgUrl?`https://localhost:7166`+session?.user.userImgUrl:image&&URL.createObjectURL(image[0]) ||'/static/default-user-icon.jpg'} alt={session?.user.userName} className='rounded-full h-[75px] w-[75px] object-cover'></img>
                        <span className='absolute h-[75px] w-[75px] rounded-full bg-main/75 backdrop-blur-md flex justify-center items-center -bottom-[100%] group-hover:bottom-0 text-slate-50 font-bold text-xs cursor-pointer'>رفع صورة</span>
                    </label>
                </div>
            }
            {
              session?.user.provider==='google'&&
                <div className='group relative overflow-hidden'>
                        <img src={session?.user.userImgUrl?session?.user.userImgUrl:'/static/default-user-icon.jpg'} alt={session?.user.userName} className='rounded-full h-[75px] w-[75px] object-cover'></img>
                </div>
            }
                <p className='text-lighterText font-bold text-sm my-2'>{session?.user.userName}</p>
              {session?.user.provider==='credentials'&&session?.user.userImgUrl&&<Trash2Icon onClick={()=>updateImg(null)} className='text-red-500 cursor-pointer hover:bg-red-500 hover:text-slate-50 dark:hover:text-stone-900 transition duration-150 p-2 rounded-full w-10 h-10 flex items-center justify-center'/>}
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl dark:text-stone-300'>معلومات حسابي</h2>
          </div>
          <Formik<User>
                initialValues={{
                    firstName:session?.user.firstName || '',
                    lastName:session?.user.lastName || '',
                    userName:session?.user.userName || '',
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(UserDataSchema)}
                onSubmit={async(vals)=>{
                    const bodyFormData = new FormData();
                    bodyFormData.append('FirstName', vals.firstName)
                    bodyFormData.append('LastName', vals.lastName)
                    bodyFormData.append('UserName', vals.userName)
                    await axiosAuth.put<UpdateAuth>('https://localhost:7166/api/Auth/updateAccount',bodyFormData,{headers: { "Content-Type": "multipart/form-data" }}).then(async(res)=>{await update({...session,user:res.data.user});toast.success(res.data.message)}).catch((err)=>toast.error(err.data.message))
                }}
                >{
                    ({errors,touched, values, initialValues})=>{
                        return <Form className='grid grid-cols-2 gap-4 mt-6'>
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
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl dark:text-stone-300'>تغيير كلمة المرور</h2>
          </div>
          <Formik<PasswordUpdate>
                initialValues={{
                  oldPassword:'',
                  newPassword:''
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(PasswordUpdateSchema)}
                onSubmit={async(vals)=>{
                  axiosAuth.put(`/api/Auth/UpdatePassword`,{
                    oldPassword:vals.oldPassword,
                    password:vals.newPassword
                  }).then((res)=>toast.success(res.data)).catch((err)=>toast.error(err.data))
                }}
                >{
                    ({errors,touched, values, initialValues})=>{
                    return <Form className='grid grid-cols-2 gap-4 mt-6'>
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
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl dark:text-stone-300'>عناويني</h2>
          </div>
          <div className='w-full flex flex-col justify-start items-start gap-3 px-8'>
            <AnimatePresence mode='wait'>
            {
              data&&data.length>0?data.map((address, i)=>{
                return (
                  <AddressItem key={address.id} address={address} i={i} setIsOpen={setIsOpen} setSelectedAddress={setSelectedAddress}/>
                )
              }):isLoading?<span className='w-full flex flex-col items-center justify-center gap-3 dark:text-stone-400 text-lighterText'>جاري التحميل ...<Loader2 className='text-main animate-spin'/></span>:!isLoading&&!isError&&<NotFound name='عناوين'/>
            }
            </AnimatePresence>
            <button onClick={()=>{setSelectedAddress(undefined);setIsOpen(true)}} className='flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:bg-transparent hover:text-main transition duation-150'>
              <Plus/>
              عنوان جديد
            </button>
          </div>
        </div>
    </main>
    <AnimatePresence mode='wait'>
        {isOpen&&<AddressModal isOpen={isOpen} setIsOpen={setIsOpen} address={selectedAddress}/>
        }
    </AnimatePresence>  
    </>
  )
}

export default ProfilePage