'use client'
import { PostCategory, UpdateCategory } from '@/lib/api/useCategories'
import { Trash2, XOctagon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DropZoneUpload from '../DropZoneUpload'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryForm, CategorySchema } from '@/model/Category'
import Image from 'next/image'

type Props = {
  id?: string,
  categoryData?: CategoryById
}

function CategoryForm({id, categoryData}: Props) {
    const [preview, setPreview] = useState<{url: null | string}>({url:categoryData?.categoryUrl||null})
    const postCategory = PostCategory()
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const updateCategory = UpdateCategory()
    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      watch,
      reset,
      formState: {errors, isSubmitting, isSubmitted, touchedFields, defaultValues}
    } = useForm<CategoryForm>({
      resolver: zodResolver(CategorySchema),
      defaultValues: {
        name:categoryData?.name || undefined,
        image:categoryData?.categoryUrl || null,
        },
    })
    useEffect(() => {
      if (categoryData) {
        reset(
          {
            name: categoryData.name || undefined,
            image: categoryData.categoryUrl || null,
          });
          setPreview({url:categoryData.categoryUrl || null})
      }
    }, [categoryData, reset]);
    const watchAllFields = watch();
    const isFormChanged = () => {
      return (watchAllFields.name !== undefined && watchAllFields.image !== null) && (watchAllFields.name !== categoryData?.name || watchAllFields.image  !==  categoryData?.categoryUrl);
    };
    const onSubmit: SubmitHandler<CategoryForm> = (vals)=>{
      setIsDisabled(true)
      if(!id){
        postCategory.mutate({
          Name:vals.name,
          CategoryImg:vals.image
        }) 
      }else{
        updateCategory.mutate({
          id:id,
          Name:vals.name,
          CategoryImg:vals.image!=categoryData?.categoryUrl?vals.image:undefined
        })
      }
      setTimeout(()=>{
        setIsDisabled(false)
      },1500)
    }
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 mt-6'>
        <div className='flex flex-col gap-3'>
          <label className='text-header dark:text-stone-300 font-bold' htmlFor='name'>
            اسم التصنيف
          </label>
          <input {...register('name')} value={watch('name') || ''} className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='name' name='name' />
          {(errors.name) && (
            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
              <XOctagon size={16} className='mt-1' />
              {
                errors.name.message
              }
            </span>
          )}
        </div>
        <div className='flex flex-col gap-3'>
          <label className='text-header dark:text-stone-300 font-bold' htmlFor='image'>
            الصورة
          </label>
          <input type="file" hidden {...register('image',{required:true})} />
          {
            !!preview.url?<div className='flex items-center gap-3'> <Image
            className='w-24 h-24 rounded-md object-cover'
            width={94}
            height={96}
            alt='صورة للتصنيف'
            src={preview.url}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(preview.url!) }}
          />
          <button onClick={()=>{setValue('image', null); setPreview({url:null})}} className='w-10 h-10 rounded-full flex justify-center items-center p-2 text-slate-50 bg-red-400 hover:bg-red-500 transition duration-150'>
            <Trash2/>
          </button>
          </div>: <DropZoneUpload<CategoryForm> setPreview={setPreview} setValue={setValue}/>
          }
          {(errors.image) && (
            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
              <XOctagon size={16} className='mt-1' />
              {
                errors.image.message?.toString()
              }
            </span>
          )}
        </div>
        <button onClick={() => {
          if (!id) {
            setPreview({ url: null });
            reset();
          } else {
            setValue('name', categoryData?.name || '');
            setValue('image', categoryData?.categoryUrl || null);
            setPreview({ url: categoryData?.categoryUrl || null });
          }
        }} className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
        <button disabled={isDisabled || !isFormChanged()} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-600 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
      </form>         
      </>
  )
}


export default CategoryForm