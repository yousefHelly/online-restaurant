'use client'
import Loading from '@/app/loading'
import useCategories from '@/lib/api/useCategories'
import { Trash2, XOctagon } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import DropZoneUpload from '../DropZoneUpload'
import { Listbox } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { PostChef, UpdateChef, useChef } from '@/lib/api/useChefs'
import { ChefForm, ChefSchema } from '@/model/Chef'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select';
import Image from 'next/image'
type Props = {
  id?: string,
  ChefData?: ChefById
}

function ChefForm({id, ChefData}: Props) {
    const [preview, setPreview] = useState<{url: null | string}>({url:ChefData?.chefImgUrl||null})
    const postChef = PostChef()
    const updateChef = UpdateChef()
    const categories = useCategories()
    const [catoptions, setCatOptions] = useState<{value: number, label: string}[]>([])
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const options = useMemo(() => {
      return categories.data?.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })) || [];
    }, [categories.data]);
    useEffect(() => {
      setCatOptions(options);
    }, [options]);
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
      control,
      formState: {errors, isSubmitting, isSubmitted, touchedFields, defaultValues}
    } = useForm<ChefForm>({
      resolver: zodResolver(ChefSchema),
      defaultValues: {
        name:ChefData?.name || undefined,
        image:ChefData?.chefImgUrl || null,
        categoryId:ChefData?.categoryId|| undefined,
        },
    })
    useEffect(() => {
      if (ChefData) {
        reset(
          {
            name:ChefData?.name || undefined,
            image:ChefData?.chefImgUrl || null,
            categoryId:ChefData?.categoryId|| undefined,
          });
          setPreview({url:ChefData.chefImgUrl || null})
      }
    }, [ChefData, reset]);
    const watchAllFields = watch();
    const isFormChanged = () => {
      return (watchAllFields.name !== undefined && watchAllFields.image !== null && watchAllFields.categoryId !== undefined) && (watchAllFields.name !== ChefData?.name || watchAllFields.image  !==  ChefData?.chefImgUrl || watchAllFields.categoryId !== ChefData?.categoryId);
    };
    const onSubmit: SubmitHandler<ChefForm> = (vals)=>{
      setIsDisabled(true)
      if(!id){
        postChef.mutate({
          Name:vals.name,
          ChefImg:vals.image,
          CategoryId:vals.categoryId
        }) 
      }
      else{
        updateChef.mutate({
          id:+id,
          Name:vals.name,
          CategoryId:vals.categoryId,
          ChefImg:vals.image!=ChefData?.chefImgUrl?vals.image:undefined,
        })
      }
      setTimeout(()=>{
        setIsDisabled(false)
      },1500)
    }
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 mt-6'>
                    <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor='name'>
                        اسم الشيف
                      </label>
                      <input {...register("name")} value={watch("name") || ""} className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='name' name='name' />
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
                      <label className='text-header dark:text-stone-300 font-bold ' htmlFor='categoryId'>
                        التصنيف
                      </label> 
                      <Controller 
                      name='categoryId'
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select 
                        options={catoptions} 
                        isRtl 
                        classNames={
                          {
                            loadingIndicator : (state) => "!text-main",
                            control : (state)=> `!border !rounded-2xl dark:!bg-stone-700 dark:!border-stone-600 dark:!text-stone-300 ${state.isFocused&&"!border-main dark:!bg-stone-700 dark:!text-stone-300 !border-dotted !outline-none !shadow-none"}`,
                            option: (state)=>`${state.isSelected?"!bg-main !text-slate-50 dark:!text-stone-900":"!bg-transparent hover:!bg-main/90 dark:hover:!bg-main/90 hover:text-slate-50 dark:hover:bg-main/90 dark:hover:!text-stone-900 active:!bg-main focus-within:!bg-main focus-visible:!bg-main"}`,
                            menuList:()=>"focus-within:bg-main focus-visible:bg-main dark:!bg-stone-700 dark:!text-stone-300",
                            singleValue:()=>"dark:!text-stone-300",
                            menu:(p)=>"focus-within:!bg-main focus-visible:!bg-main",
                            menuPortal:()=>'focus-within:!bg-main focus-visible:!bg-main',
                          }
                        }
                        onChange={(cat)=>onChange(cat?.value)}
                        onBlur={onBlur}
                        value={catoptions.find((cat)=>cat.value===value) || (catoptions.find((cat)=>cat.value===watch("categoryId")?watch("categoryId").valueOf():undefined)?catoptions.find((cat)=>cat.value===watch("categoryId")?watch("categoryId").valueOf():undefined):null)}
                        isLoading={categories.isLoading}
                        loadingMessage={(ob)=>ob.inputValue="جاري تحميل التصنيفات..."}
                        noOptionsMessage={(ob)=>ob.inputValue="لا يوجد تصنيفات"}
                        placeholder="إختار تصنيف..." 
                        id='categoryId'
                        ref={ref}
                        />
                      )}
                      />
                      {(errors.categoryId) && (
                        <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                          <XOctagon size={16} className='mt-1' />
                          {
                            errors.categoryId.message
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
                        alt='صورة للشيف'
                        width={96}
                        height={96}
                        // Revoke data uri after image is loaded
                        onLoad={() => { URL.revokeObjectURL(preview.url!) }}
                      />
                      <button onClick={()=>{setValue('image', null); setPreview({url:null})}} className='w-10 h-10 rounded-full flex justify-center items-center p-2 text-slate-50 bg-red-400 hover:bg-red-500 transition duration-150'>
                        <Trash2/>
                      </button>
                      </div>: <DropZoneUpload<ChefForm> setPreview={setPreview} setValue={setValue as any}/>
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
                        setValue('name', ChefData?.name || '');
                        setValue('image', ChefData?.chefImgUrl || null);
                        setValue('categoryId', ChefData?.categoryId || undefined as any);
                        setPreview({ url: ChefData?.chefImgUrl || null });
                      }
                    }} className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
                    <button disabled={isDisabled || !isFormChanged()} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-700 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                  </form>
        </>
  )
}


export default ChefForm