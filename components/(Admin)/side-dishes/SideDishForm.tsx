'use client'
import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Trash2, XOctagon } from 'lucide-react';
import DropZoneUpload from '../DropZoneUpload';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { PostFixedAddition, UpdateFixedAddition, useFixedAddition } from '@/lib/api/UseFixedAdditions';

type Props = {
    id?: string
}

function SideDishForm({id}: Props) {

    const SideDishData = useFixedAddition(id);
    const [preview, setPreview] = useState<{url: null | string}>({url:SideDishData?.data?.additionUrl||null})
    const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/ico']    
    const SideDishSchema = z.object({
        name: z.string({ required_error:'ادخل اسم الطبق الجانبي'}),
        image: z.any().refine(
          (file: File | string)=>{
            if(typeof file != 'string'&& file.size<=1000000 || preview.url ===  SideDishData?.data?.additionUrl )
            return true
            else{
              toast.error('حجم الصورة يتخطي 1 mb', {id:'errorImageSize'})
              return false
            }
          }, {message:'حجم الصورة يتخطي 1 mb'})
          .refine(
            (file: File | string)=>{
              if (typeof file != 'string'&& ACCEPTED_IMAGE_TYPES.includes(file.type) || preview.url ===  SideDishData?.data?.additionUrl)
               return true
              else {
                toast.error('يجب ان تكون الصورة بصيغة jpg او jpeg او png او ico', {id:'errorImageSize'})
                return false
              }
            }, {message:'يجب ان تكون الصورة بصيغة jpg او jpeg او png او ico'}),
        price: z.number({required_error:'إدخل سعر الطبق الجانبي'}).min(5,{message:'لا يمكن إضافة طبق جانبي اقل من 5 جنيهات'})
        })
    type SideDishForm = z.infer<typeof SideDishSchema>
    const postSideDish = PostFixedAddition()
    const updateSideDish = UpdateFixedAddition()        
    return (
        <>
        {
            SideDishData?.isLoading&&<Loading/>
        }
        <Formik<SideDishForm>
                initialValues={{
                name:SideDishData?.data?.name || '',
                image:SideDishData?.data?.price || null,
                price:SideDishData?.data?.price ||0,
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(SideDishSchema)}
                onSubmit={(vals)=>{
                  if(!id){
                    postSideDish.mutate({
                      Name:vals.name,
                      AdditionImg:vals.image,
                      Price:vals.price
                    }) 
                  }else{
                    updateSideDish.mutate({
                      id:id,
                      Name:vals.name,
                      AdditionImg:vals.image!=SideDishData?.data?.additionUrl?vals.image:undefined,
                      Price:vals.price
                    }) 
                  }
                }}
                onReset={()=>{
                  if(!id)
                    setPreview({url:null})
                  else
                    setPreview({url:SideDishData?.data?.additionUrl!})
                }}
              >
                {
                  ({errors, touched, values, initialValues, setFieldValue, isSubmitting})=>{
                    return <Form className='grid grid-cols-2 gap-4 mt-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-3'>
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='name'>
                            اسم الطبق الجانبي
                        </label>
                        <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='name' name='name' />
                        {(errors.name && touched.name) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                            <XOctagon size={16} className='mt-1' />
                            <ErrorMessage name='name' id='name' />
                            </span>
                        )}
                        </div>
                        <div className='flex flex-col gap-3'>
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='price'>
                            سعر الطبق الجانبي
                        </label>
                        <Field type='number' className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='price' name='price' />
                        {(errors.price && touched.price) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                            <XOctagon size={16} className='mt-1' />
                            <ErrorMessage name='price' id='price' />
                            </span>
                        )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor='image'>
                        الصورة
                      </label>
                      {
                        !!preview.url?<div className='flex items-center gap-3'> <img
                        className='w-24 h-24 rounded-md object-cover'
                        src={preview.url}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(preview.url!) }}
                      />
                      <button onClick={()=>{setFieldValue('image', null); setPreview({url:null})}} className='w-10 h-10 rounded-full flex justify-center items-center p-2 text-slate-50 bg-red-400 hover:bg-red-500 transition duration-150'>
                        <Trash2/>
                      </button>
                      </div>: <DropZoneUpload<SideDishForm> setPreview={setPreview}/>
                      }
                      {(errors.image && touched.image) && (
                        <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                          <XOctagon size={16} className='mt-1' />
                          <ErrorMessage name='image' id='image' />
                        </span>
                      )}
                    </div>
                    <button className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
                    <button disabled={(!id?(values.name === initialValues.name || values.image === initialValues.image || values.price === initialValues.price):(values.name === initialValues.name && values.image === initialValues.image && values.price === initialValues.price)) || errors.name!=undefined || errors.image!=undefined || errors.price!=undefined || isSubmitting || !values.image} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                  </Form>
                  }
                }
              </Formik>
              </>
  )
}


export default SideDishForm