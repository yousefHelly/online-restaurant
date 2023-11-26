'use client'
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import { Trash2, Upload, XOctagon } from 'lucide-react'
import React, { useState } from 'react'
import Dropzone, {useDropzone} from 'react-dropzone'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

type Props = {}



function CategoryForm({}: Props) {
    const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/ico']
    const CategorySchema = z.object({
        name: z.string({ required_error:'ادخل اسم التصنيف'}),
        image: z.any().refine(
          (file: File)=>{
            if(file.size<=1000000)
            return true
            else{
              toast.error('حجم الصورة يتخطي 1 mb', {id:'errorImageSize'})
              return false
            }
          }, {message:'حجم الصورة يتخطي 1 mb'})
          .refine(
            (file: File)=>{
              if (ACCEPTED_IMAGE_TYPES.includes(file.type))
               return true
              else {

                toast.error('يجب ان تكون الصورة بصيغة jpg او jpeg او png او ico', {id:'errorImageSize'})
                return false
              }
            }, {message:'يجب ان تكون الصورة بصيغة jpg او jpeg او png او ico'})
        })
    type CategoryForm = z.infer<typeof CategorySchema>
    const [preview, setPreview] = useState<{url: null | string}>({url:null})

    const MyDropzone: React.FC = () => {
      const { setFieldValue } = useFormikContext<CategoryForm>();
    
      const onDrop = (acceptedFiles: File[]) => {
        setFieldValue('image', acceptedFiles[0]);
        try{
          setPreview({url:URL.createObjectURL(acceptedFiles[0])})

        } catch{
          toast.error('فشل تحميل الصورة تأكد من نوع الملف ثم اعد المحاولة')
          setFieldValue('image', null)
        }
        console.log(acceptedFiles[0]);

      };
    
      const { getRootProps, getInputProps } = useDropzone({
        maxFiles:1,
        onDrop,
        multiple:false,
        accept:{'image/png': ['.png'],'image/jpg': ['.jpg'],'image/jpeg': ['.jpeg'],'image/ico': ['.ico']}
      });
    
      return (
        <section>
          <div {...getRootProps({ className: 'bg-slate-100 border border-dotted border-main flex flex-col gap-3 items-center justify-center p-5 cursor-pointer hover:bg-slate-200 transition duration-150'})}>
            <input {...getInputProps()} />
            <Upload className='text-lighterText'/>
            <p className='text-sm font-bold text-lighterText dark:text-stone-400'>ضع صورة هنا ، او اضغط لاختيار صورة</p>
          </div>
        </section>
      );
    };
    
    return (
        <Formik<CategoryForm>
                initialValues={{
                name:'',
                image:null,
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(CategorySchema)}
                onSubmit={(vals)=>{
                 console.log(vals);
                 
                }}
                onReset={()=>{
                  setPreview({url:null})
                }}
              >
                {
                  ({errors, touched, values, initialValues, setFieldValue})=>{
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
                      </div>: <MyDropzone />
                      }
                      {(errors.image && touched.image) && (
                        <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                          <XOctagon size={16} className='mt-1' />
                          <ErrorMessage name='image' id='image' />
                        </span>
                      )}
                    </div>
                    <button className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
                    <button disabled={values.name === initialValues.name || values.image === initialValues.image || errors.name!=undefined || errors.image!=undefined} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                  </Form>
                  }
                }
              </Formik>
  )
}


export default CategoryForm