'use client'
import React, { useEffect, useState } from 'react'
import { Trash2, XOctagon } from 'lucide-react';
import DropZoneUpload from '../DropZoneUpload';
import { PostFixedAddition, UpdateFixedAddition, useFixedAddition } from '@/lib/api/UseFixedAdditions';
import { SideDishForm, SideDishSchema } from '@/model/SideDish';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

type Props = {
    id?: string,
    sideDish?: FixedAddition
}

function SideDishForm({id, sideDish}: Props) {
    const [preview, setPreview] = useState<{url: null | string}>({url:sideDish?.additionUrl||null})
    const postSideDish = PostFixedAddition()
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const updateSideDish = UpdateFixedAddition()
    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      watch,
      reset,
      formState: {errors, isSubmitting, isSubmitted, touchedFields, defaultValues}
    } = useForm<SideDishForm>({
      resolver: zodResolver(SideDishSchema),
      defaultValues: {
        name:sideDish?.name || '',
        image:sideDish?.additionUrl || null,
        price:sideDish?.price ||0,
        },
    })
    useEffect(() => {
      if (sideDish) {
        reset(
          {
            name:sideDish.name || '',
            image:sideDish.additionUrl || null,
            price:sideDish.price ||0,
          });
          setPreview({url:sideDish.additionUrl || null})
      }
    }, [sideDish, reset]);
    const watchAllFields = watch();
    const isFormChanged = () => {
      return (watchAllFields.name !== undefined && watchAllFields.image !== null &&  watchAllFields.price !==0) && (watchAllFields.name !== sideDish?.name || watchAllFields.price !==sideDish?.price  || watchAllFields.image  !==  sideDish?.additionUrl);
    };
    const onSubmit: SubmitHandler<SideDishForm> = (vals)=>{
      setIsDisabled(true)
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
          AdditionImg:vals.image!=sideDish?.additionUrl?vals.image:undefined,
          Price:vals.price
        })
      }
      setTimeout(()=>{
        setIsDisabled(false)
      }, 1500)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 mt-6'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-3'>
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='name'>
                            اسم الطبق الجانبي
                        </label>
                        <input {...register("name")} value={watch("name")} className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='name' name='name' />
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
                        <label className='text-header dark:text-stone-300 font-bold' htmlFor='price'>
                            سعر الطبق الجانبي
                        </label>
                        <input type='number' {...register("price",{valueAsNumber:true})} value={watch("price")} className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='price' name='price' />
                        {(errors.price) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                            <XOctagon size={16} className='mt-1' />
                            {
                              errors.price.message
                            }
                            </span>
                        )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor='image'>
                        الصورة
                      </label>
                      <input type="file" hidden {...register('image',{required:true})} />
                      {
                        !!preview.url?<div className='flex items-center gap-3'> <Image
                        className='w-24 h-24 rounded-md object-cover'
                        src={preview.url}
                        alt={"صورة الطبق الجانبي"}
                        width={96}
                        height={96}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(preview.url!) }}
                      />
                      <button onClick={()=>{setValue('image', null); setPreview({url:null})}} className='w-10 h-10 rounded-full flex justify-center items-center p-2 text-slate-50 bg-red-400 hover:bg-red-500 transition duration-150'>
                        <Trash2/>
                      </button>
                      </div>: <DropZoneUpload<SideDishForm> setPreview={setPreview} setValue={setValue as any}/>
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
                        setValue('name', sideDish?.name || '');
                        setValue('price', sideDish?.price || 0);
                        setValue('image', sideDish?.additionUrl || null);
                        setPreview({ url: sideDish?.additionUrl || null });
                      }
                    }} className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
                    <button disabled={isDisabled || !isFormChanged()} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-700 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                  </form>
              </>
  )
}


export default SideDishForm