'use client'
import Loading from '@/app/loading'
import { PostCategory, UpdateCategory, useCategory } from '@/lib/api/useCategories'
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import { Trash2, Upload, XOctagon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Dropzone, {useDropzone} from 'react-dropzone'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import DropZoneUpload from '../DropZoneUpload'

type Props = {
  id?: string
}

function CategoryForm({id}: Props) {
    const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/ico']
    const categoryData = useCategory(id)
    const [preview, setPreview] = useState<{url: null | string}>({url:categoryData?.queriedCategory?.categoryImg||null})

    const CategorySchema = z.object({
        name: z.string({ required_error:'ادخل اسم التصنيف'}),
        image: z.any().refine(
          (file: File | string)=>{
            if(typeof file != 'string'&& file.size<=1000000 || preview.url ===  categoryData?.queriedCategory?.categoryImg)
            return true
            else{
              toast.error('حجم الصورة يتخطي 1 mb', {id:'errorImageSize'})
              return false
            }
          }, {message:'حجم الصورة يتخطي 1 mb'})
          .refine(
            (file: File | string)=>{
              if (typeof file != 'string'&& ACCEPTED_IMAGE_TYPES.includes(file.type) || categoryData?.queriedCategory?.categoryImg)
               return true
              else {
                toast.error('يجب ان تكون الصورة بصيغة jpg او jpeg او png او ico', {id:'errorImageSize'})
                return false
              }
            }, {message:'يجب ان تكون الصورة بصيغة jpg او jpeg او png او ico'})
        })
    type CategoryForm = z.infer<typeof CategorySchema>
    const postCategory = PostCategory()
    const updateCategory = UpdateCategory()
    return (
      <>
      {
        categoryData?.isLoading&&<Loading/>
      }
        <Formik<CategoryForm>
                initialValues={{
                name:categoryData?.queriedCategory?.name || '',
                image:categoryData?.queriedCategory?.categoryImg || null,
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(CategorySchema)}
                onSubmit={(vals)=>{
                  if(!id){
                    postCategory.mutate({
                      Name:vals.name,
                      CategoryImg:vals.image
                    }) 
                  }else{
                    updateCategory.mutate({
                      id:id,
                      Name:vals.name,
                      CategoryImg:vals.image!=categoryData?.queriedCategory?.categoryImg?vals.image:undefined
                    }) 
                  }
                }}
                onReset={()=>{
                  if(!id)
                    setPreview({url:null})
                  else
                    setPreview({url:categoryData?.queriedCategory?.categoryImg!})
                }}
              >
                {
                  ({errors, touched, values, initialValues, setFieldValue, isSubmitting})=>{
                    return <Form className='grid grid-cols-2 gap-4 mt-6'>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor='name'>
                        اسم التصنيف
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
                      </div>: <DropZoneUpload<CategoryForm> setPreview={setPreview}/>
                      }
                      {(errors.image && touched.image) && (
                        <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                          <XOctagon size={16} className='mt-1' />
                          <ErrorMessage name='image' id='image' />
                        </span>
                      )}
                    </div>
                    <button className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
                    <button disabled={(!id?(values.name === initialValues.name || values.image === initialValues.image):(values.name === initialValues.name && values.image === initialValues.image)) || errors.name!=undefined || errors.image!=undefined || isSubmitting || !values.image} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                  </Form>
                  }
                }
              </Formik>
      </>
  )
}


export default CategoryForm