'use client'
import useCategories from '@/lib/api/useCategories'
import { Asterisk, Minus, Plus, Trash2, X, XOctagon } from 'lucide-react'
import React, { useEffect, useState, useMemo } from 'react'
import DropZoneUpload from '../DropZoneUpload'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'
import { GetChefsInCategory } from '@/lib/api/useChefs'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DishSchema, DishFormType } from '@/model/Dish'
import { DeleteAdditions, DeleteChoices, PostDish, UpdateDish, useAdminDish } from '@/lib/api/useDish'
import { Checkbox } from '@mantine/core'
import Select from 'react-select'
import { convert } from '@/lib/ConvertArabicURL'
import Image from 'next/image'
type Props = {
  name?: string,
  initialData?: Dish
}
type Addition = {
  name: string;
  choices: {
      name: string;
      hasPrice: boolean;
      id?: number | undefined;
      price?: number | undefined;
  }[];
  id?: number | undefined;
} | undefined
type Choice = {
  name: string;
  hasPrice: boolean;
  id?: number | undefined;
  price?: number | undefined;
}
function DishForm({name, initialData:DishData}: Props) {
  const arabicName = name ? convert(name) : undefined
    const [preview, setPreview] = useState<{url: null | string}>({url:DishData?.image||null})
    const categories = useCategories()
    const postDish = PostDish()
    const updateDish =  UpdateDish(arabicName || "")
    const deleteAdds = DeleteAdditions()
    const deleteChoices = DeleteChoices()
    const [catoptions, setCatOptions] = useState<{value: number, label: string}[]>([])
    //category options
    const options = useMemo(() => {
      return categories.data?.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })) || [];
    }, [categories.isLoading]);
    useEffect(() => {
      setCatOptions(options);
    }, [options]);
    const {
      register,
      handleSubmit,
      trigger,
      setValue,
      getValues,
      control,
      reset,
      watch,
      formState: {errors, isSubmitting, isSubmitted}
    } = useForm<DishFormType>({
      resolver: zodResolver(DishSchema),
      defaultValues: {
        additions: undefined,
      },
    })
    const chefsInCategory: number = watch("categoryId")
    const getChefs = GetChefsInCategory()
    //chefs option
    const [chefsOptions, setChefsOptions] = useState<{value: number, label: string}[]>([])
    useEffect(() => {
      const chefsInCategoryOptions =  getChefs.mutateAsync({categoryId:chefsInCategory}) as any
      chefsInCategoryOptions.then((res: Chef[])=>{
        const chOptions = res.map((chef) => ({
          value: chef.id,
          label: chef.name,
        }))
        setChefsOptions(chOptions)
      })
    }, [chefsInCategory]);

    useEffect(() => {
      if (DishData?.categoryId) {
        reset(
          {
            name:DishData.name || undefined,
            image:DishData.image || null,
            categoryId:DishData.categoryId|| undefined,
            chefId:DishData.chefId || undefined,
            Price:DishData.price || undefined,
            description:DishData.description || undefined,
            oldPrice:DishData.oldPrice || undefined,
            additions:DishData.mealAdditions as any || undefined
          });
          DishData.description&&setAddDescription(true)
          DishData.oldPrice&&setAddOldPrice(true)
          DishData?.mealAdditions?.length?DishData?.mealAdditions?.length>0&&setAddAdditions(true):setAddAdditions(false)
          setPreview({url:DishData?.image || null})
      }
    }, [DishData, reset]);
    const watchAllFields = watch();
    const [additions, setAdditions] = useState<DishFormType['additions']>(DishData?.mealAdditions as any|| []);
    const [addsToBeDeleted, setAddsToBeDeleted] = useState<number[]>([])
    const [choicesToBeDeleted, setChoicesToBeDeleted] = useState<{addId: number, choiceId: number}[]>([])
    useEffect(() => {
      setValue('additions', additions);
    }, [additions, setValue]);
    console.log(getValues());
    
    const handleAdditionNameChange = (additionIndex: number, newName: string) => {
      setAdditions((prevAdditions) =>
        prevAdditions?.map((addition, index) =>
          index === additionIndex ? { ...addition, name: newName } : addition
        )
      );
    };
  
    const handleChoiceNameChange = (additionIndex: number, choiceIndex: number, newName: string) => {
      setAdditions((prevAdditions) =>
        prevAdditions?.map((addition, index) =>
          index === additionIndex
            ? {
                ...addition,
                choices: addition.choices.map((choice, choiceIdx) =>
                  choiceIdx === choiceIndex ? { ...choice, name: newName } : choice
                ),
              }
            : addition
        )
      );
    };
  
    const handleChoicePriceChange = (additionIndex: number, choiceIndex: number, newPrice: number) => {
      setAdditions((prevAdditions) =>
        prevAdditions?.map((addition, index) =>
          index === additionIndex
            ? {
                ...addition,
                choices: addition.choices.map((choice, choiceIdx) =>
                  choiceIdx === choiceIndex ? { ...choice, price: newPrice } : choice
                ),
              }
            : addition
        )
      );
    };
  
    const handleTogglePriceCheckbox = (additionIndex: number, choiceIndex: number) => {
      setAdditions((prevAdditions) =>
        prevAdditions?.map((addition, index) =>
          index === additionIndex
            ? {
                ...addition,
                choices: addition.choices.map((choice, choiceIdx) =>
                  choiceIdx === choiceIndex ? { ...choice, hasPrice: !choice.hasPrice } : choice
                ),
              }
            : addition
        )
      );
    };
  
    const handleAddChoice = (additionIndex: number) => {
      setAdditions((prevAdditions) =>
        prevAdditions?.map((addition, index) =>
          index === additionIndex
            ? {
                ...addition,
                choices: [...addition.choices, { name: '', hasPrice: false }],
              }
            : addition
        )
      );
    };
  
    const handleRemoveChoice = (addition: Addition, choice: Choice ,additionIndex: number, choiceIndex: number) => {
      setAdditions((prevAdditions) =>
        prevAdditions?.map((addition, index) =>
          index === additionIndex
            ? {
                ...addition,
                choices: addition.choices.filter((_, choiceIdx) => choiceIdx !== choiceIndex),
              }
            : addition
        )
      );
     if(addition?.id&&choice.id){
      setChoicesToBeDeleted((prevchoices)=>[...prevchoices, {addId:addition.id!, choiceId:choice.id!}])
     } 
    };
  
    const handleAddAddition = () => {
      setAdditions((prevAdditions) => [...prevAdditions!, { name: '', choices: [] }]);
    };
  
    const handleRemoveAddition = (addition: Addition, additionIndex: number) => {
      setAdditions((prevAdditions) => prevAdditions?.filter((_, index) => index !== additionIndex));
      if(addition?.id){
        setAddsToBeDeleted((prevAdds)=>[...prevAdds, addition.id!])
      }
    };
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [addOldPrice,setAddOldPrice] = useState(false)
    const [addDescription,setAddDescription] = useState(false)
    const [addAdditions,setAddAdditions] = useState(false)
    const onSubmit: SubmitHandler<DishFormType> = (data)=>{
      setIsDisabled(true)
      if(name){
        updateDish.mutate({
          name:data.name,
          chefId:data.chefId,
          categoryId:data.categoryId,
          Price:data.Price,
          oldPrice:data.oldPrice,
          mealImg:data.image,
          description:data.description,
          additions: additions
        })
        if(addsToBeDeleted.length>0){
          deleteAdds.mutate({
            additions:addsToBeDeleted
          })
        }
        if(choicesToBeDeleted.length>0){
          deleteChoices.mutate({
            choices:choicesToBeDeleted
          })
        }
      }else{
        postDish.mutate({
          name:data.name,
          chefId:data.chefId,
          categoryId:data.categoryId,
          Price:data.Price,
          oldPrice:data.oldPrice,
          mealImg:data.image,
          description:data.description,
          additions: additions
        })
      }
      setTimeout(()=>{
        setIsDisabled(false)
      },2000)
    }
    const isFormChanged = () => {
      return (
        watchAllFields.name !== undefined && 
        watchAllFields.image !== null &&
        preview.url !== null &&
        watchAllFields.Price != undefined && 
        watchAllFields.Price != 0 && 
        watchAllFields.categoryId != undefined && 
        watchAllFields.chefId != undefined&&
        (addDescription ? (watchAllFields.description! != "") : true)&&      
        (addOldPrice ? (watchAllFields.oldPrice != undefined) : true)&&      
        (addAdditions ? (watchAllFields.additions != undefined) : true)      
        ) && (
          watchAllFields.name !== DishData?.name || 
          watchAllFields.image !== DishData?.image ||
          watchAllFields.Price != DishData?.price || 
          watchAllFields.categoryId != DishData?.categoryId ||
          watchAllFields.chefId != DishData?.chefId ||
          ((watchAllFields.description&&addDescription) ? (watchAllFields.description != DishData.description) : (!watchAllFields.description&&!addDescription && DishData.description)? true : false) ||     
          ((watchAllFields.oldPrice!>0&&addOldPrice) ? (watchAllFields.oldPrice != DishData.oldPrice) :  (!watchAllFields.oldPrice&&!addOldPrice && DishData.oldPrice!>0)? true : false) ||
          ((watchAllFields.additions&&addAdditions) ? (watchAllFields.additions != DishData.mealAdditions) : (!watchAllFields.additions&&!addAdditions && DishData.mealAdditions)? true : false)  
        )
    };
    return (
      <>
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4 mt-6'>
                      <div className='flex flex-col gap-5'>
                        {/* dish name */}
                        <div className='flex flex-col gap-3'>
                          <label className='text-header w-fit dark:text-stone-300 font-bold relative' htmlFor='name'>
                            اسم الطبق
                            <Asterisk size={12} className='text-red-500 absolute top-1 -left-3'/>
                          </label>
                          <input {...register('name', {min:2})} value={watch('name') || ''} type='text' className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='name' name='name' />
                          {(errors.name) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                              <XOctagon size={16} className='mt-1' />
                              {errors.name.message}
                            </span>
                          )}
                        </div>
                        {/* dish description (optional) */}
                        <div className='flex flex-col gap-3'>
                          <Checkbox
                            defaultChecked={false}
                            checked={addDescription}
                            onChange={(e)=>{setAddDescription(!addDescription); setValue('description', undefined);trigger('description')}}
                            label="إضافة وصف"
                            description="إختياري ( لتسهيل البحث عن الطبق في محركات البحث )"
                            color="#ffa006"
                            />
                            <AnimatePresence mode='wait'>
                          {addDescription&&
                          <LazyMotion features={domAnimation}>
                          <m.div key={'description'} initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className='mr-5 flex flex-col gap-3'><label className='text-header text-sm dark:text-stone-300 font-bold' htmlFor='description'>
                            وصف الطبق
                          </label>
                          <textarea {...register('description')} value={watch('description') || ''} minLength={25} className={`border dark:border-stone-600 dark:text-stone-300 min-h-[3rem] px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='description' name='description' />
                          {(errors.description) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                              <XOctagon size={16} className='mt-1' />
                              {errors.description.message}
                            </span>
                          )}</m.div>
                          </LazyMotion>
                          }
                            </AnimatePresence>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3'>
                        <label className='text-header dark:text-stone-300 font-bold  w-fit relative' htmlFor='image'>
                          الصورة
                          <Asterisk size={12} className='text-red-500 absolute top-1 -left-3'/>
                        </label>
                        <input type="file" hidden {...register('image',{required:true})}  />
                        {
                          !!preview.url?<div className='flex items-center gap-3'> <Image
                          className='w-24 h-24 rounded-md object-cover'
                          src={preview.url}
                          width={96}
                          height={96}
                          alt='صورة للطبق'
                          // Revoke data uri after image is loaded
                          onLoad={() => { URL.revokeObjectURL(preview.url!) }}
                        />
                        <button onClick={()=>{setValue('image', undefined); setPreview({url:null})}} className='w-10 h-10 rounded-full flex justify-center items-center p-2 text-slate-50 bg-red-400 hover:bg-red-500 transition duration-150'>
                          <Trash2/>
                        </button>
                        </div>: <DropZoneUpload<DishFormType> setPreview={setPreview} setValue={setValue as any}/>
                        }
                        {(errors.image) && (
                          <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                            <XOctagon size={16} className='mt-1' />
                            {typeof errors.image.message ==='string' && errors.image.message}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          {/* category selection */}
                          <div className='flex flex-col gap-3'>
                          <label className='text-header dark:text-stone-300 font-bold w-fit relative' htmlFor='categoryId'>
                            التصنيف
                            <Asterisk size={12} className='text-red-500 absolute top-1 -left-3'/>
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
                              onChange={(cat)=>{onChange(cat?.value); setValue("chefId", undefined as any)}}
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
                        {/*  chef selection  */}
                        <div className='flex flex-col gap-3'>
                          <label className='text-header dark:text-stone-300 font-bold w-fit relative' htmlFor='chefId'>
                            الشيف
                            <Asterisk size={12} className='text-red-500 absolute top-1 -left-3'/>
                          </label>
                          <Controller 
                            name='chefId'
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Select 
                              options={chefsOptions} 
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
                              value={chefsOptions.find((ch)=>ch.value===value) || (chefsOptions.find((ch)=>ch.value===watch("chefId")?watch("chefId").valueOf():undefined)?chefsOptions.find((ch)=>ch.value===watch("chefId")?watch("chefId").valueOf():undefined):null)}
                              isLoading={categories.isLoading}
                              loadingMessage={(ob)=>ob.inputValue="جاري تحميل الشيفات..."}
                              noOptionsMessage={(ob)=>ob.inputValue="لا يوجد شيفات"}
                              placeholder="إختار شيف..." 
                              id='chefId'
                              ref={ref}
                              />
                            )}
                          />

                          {(errors.chefId) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                              <XOctagon size={16} className='mt-1' />
                              {
                                errors.chefId.message
                              }
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {/* price */}
                        <div className='flex flex-col gap-3'>
                          <label className='text-header dark:text-stone-300 font-bold w-fit relative' htmlFor='Price'>
                            {addOldPrice?'السعر بعد العرض':'السعر'}
                            <Asterisk size={12} className='text-red-500 absolute top-1 -left-3'/>
                          </label>
                          <input {...register('Price', {valueAsNumber:true})} value={watch('Price') || ''} type='number' min={0} className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='Price' name='Price' />
                          {(errors.Price) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                              <XOctagon size={16} className='mt-1' />
                              {errors.Price.message}
                            </span>
                          )}
                        </div>
                        {/* price before sale (optional) */}
                        <div className='flex flex-col gap-3'>
                          <Checkbox
                            defaultChecked={false}
                            checked={addOldPrice}
                            onChange={(e)=>{setAddOldPrice(!addOldPrice); setValue('oldPrice', undefined);}}
                            label="إضافة عرض"
                            description="إختياري"
                            color="#ffa006"
                            />
                            <AnimatePresence mode='wait'>
                          {addOldPrice&&
                          <LazyMotion features={domAnimation}>
                          <m.div key={'description'} initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className='mr-5 flex flex-col gap-3'><label className='text-header text-sm dark:text-stone-300 font-bold' htmlFor='oldPrice'>
                            السعر قبل العرض
                          </label>
                          <input {...register('oldPrice', {valueAsNumber:true})} value={watch('oldPrice') || ''} type='number' min={0} className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='oldPrice' name='oldPrice' />
                          {(errors.oldPrice) && (
                            <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                              <XOctagon size={16} className='mt-1' />
                              {errors.oldPrice.message}
                            </span>
                          )}</m.div>
                          </LazyMotion>
                          }
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="flex flex-col col-span-full">
                      <div className='flex flex-col gap-3'>
                          <Checkbox
                            defaultChecked={false}
                            checked={addAdditions}
                            onChange={(e)=>{
                              if(!e.target.checked){
                                DishData?.mealAdditions?.map((add)=>{
                                  if(add.id){
                                    setAddsToBeDeleted((prevAdd)=>[...prevAdd, add.id])
                                  }
                                })
                              } else{
                                setAddsToBeDeleted([])
                              }
                              setAddAdditions(!addAdditions); 
                              setValue('additions', undefined);
                              !addAdditions&&trigger('additions')
                            }}
                            label="إضافات الطبق"
                            description="إختياري"
                            color="#ffa006"
                            />
                            <AnimatePresence mode='wait'>
                          {addAdditions&&
                          <LazyMotion features={domAnimation}>
                          <m.div key={'additions'} initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className='mr-5 flex flex-col gap-3'>
                          <div className='mr-5 flex flex-col gap-3'>
                          <h4 className='text-header text-sm dark:text-stone-300 font-bold'>
                            الإضافات
                          </h4>
                          <div className='grid grid-cols-2 gap-3 items-start justify-evenly p-2'>
                          {additions?.map((addition, additionIndex) => (
                            <div key={additionIndex} className='bg-slate-200 dark:bg-stone-700 p-2 rounded-md grid grid-cols-2'>
                              <div className='col-span-2 flex flex-col gap-2'>
                                <label htmlFor={addition.name} className="text-header text-xs dark:text-stone-300 font-bold">اسم الإضافة</label>
                                <input
                                  value={addition.name}
                                  {...register(`additions.${additionIndex}.name`)}
                                  id={addition.name}
                                  className='text-xs border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none'
                                  onChange={(e) => handleAdditionNameChange(additionIndex, e.target.value)}
                                />
                              </div>
                              {((errors as any)?.additions?.at(additionIndex)?.name) && (
                                <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                                  <XOctagon size={16} className='mt-1' />
                                  {
                                    (errors as any).additions?.at(additionIndex)?.name?.message
                                  }
                                </span>)
                              }
                              <div className='my-2 col-span-2 grid grid-cols-2 gap-2'>
                                {addition.choices.map((choice, choiceIndex) => (
                                  <div key={choiceIndex} className='flex flex-col gap-2  border border-stone-300 dark:border-stone-600 rounded-md p-2'>
                                  <label htmlFor={choice.name} className="text-header text-xs dark:text-stone-300 font-bold">اسم الإختيار</label>
                                  <input
                                    id={choice.name}
                                    value = {choice.name}
                                    {...register(`additions.${additionIndex}.choices.${choiceIndex}.name`)}
                                    className='text-xs dark:text-stone-300  border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none'
                                    onChange={(e) => handleChoiceNameChange(additionIndex, choiceIndex, e.target.value)}
                                  />
                                  {(Array.isArray((errors as any).additions?.at(additionIndex)?.choices)&&(errors as any).additions?.at(additionIndex)?.choices?.at(choiceIndex)?.name) && (
                                    <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                                      <XOctagon size={16} className='mt-1' />
                                      {
                                         (errors as any).additions?.at(additionIndex)?.choices?.at(choiceIndex)?.name?.message
                                      }
                                    </span>)
                                  }
                                  <Checkbox
                                    defaultChecked={choice.hasPrice || choice.price!>0}
                                    onChange={(e)=>{
                                      // handleTogglePriceCheckbox(additionIndex, choiceIndex)
                                      if(!e.target.checked){
                                        choice.price = 0
                                        choice.hasPrice = false
                                        setValue(`additions.${additionIndex}.choices.${choiceIndex}.price`, 0)
                                        setValue(`additions.${additionIndex}.choices.${choiceIndex}.hasPrice`, false)
                                      } else{
                                        choice.price = DishData?.price || getValues().Price
                                        setValue(`additions.${additionIndex}.choices.${choiceIndex}.price`, choice.price)
                                        setValue(`additions.${additionIndex}.choices.${choiceIndex}.hasPrice`, true)
                                        choice.hasPrice = true
                                      }
                                      }}
                                    label="إضافة سعر"
                                    description="إختياري"
                                    color="#ffa006"
                                  /> 
                                <div  className='flex flex-col gap-2 mx-10'>
                                {((choice.hasPrice!=undefined && choice.price!>0) || (choice.hasPrice===undefined && choice.price!>0) )&&<><label htmlFor={choice.price+ 'CHOICE'} className="text-header text-xs dark:text-stone-300 font-bold">سعر الإختيار</label>
                                <input
                                  id={choice.price+ 'CHOICE'}
                                  defaultValue={choice.price || ''}
                                  value = {choice.price}
                                  {...register(`additions.${additionIndex}.choices.${choiceIndex}.price`, {valueAsNumber: true})}
                                  type="number"
                                  disabled={!(choice.hasPrice || choice.price)}
                                  min={1} className={`border dark:border-stone-600 dark:text-stone-300 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`}                    
                                  onChange={(e) => {
                                    if(+e.target.value<1){
                                      setValue(`additions.${additionIndex}.choices.${choiceIndex}.hasPrice`, false)
                                      choice.hasPrice = false
                                    }
                                    handleChoicePriceChange(additionIndex, choiceIndex, +e.target.value)
                                  }}
                                /></>}
                                {((errors as any).additions?.at(additionIndex)?.choices?.length>0&&(errors as any).additions?.at(additionIndex)?.choices?.at(choiceIndex)?.price) && (
                                  <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                                    <XOctagon size={16} className='mt-1' />
                                    {
                                      (errors as any).additions?.at(additionIndex)?.choices?.at(choiceIndex)?.price?.message
                                    }
                                  </span>)
                                }
                                </div>
                                <button className='self-center mx-auto flex gap-2 items-center justify-center bg-red-500 text-slate-50 transition duration-150 hover:bg-red-600 rounded-md px-2 py-1 my-1 text-xs' type="button" onClick={() => handleRemoveChoice(addition, choice, additionIndex, choiceIndex)}>
                                <Minus/>
                                حذف الاختيار
                                </button>
                                </div>
                              ))}
                               {((errors as any).additions?.at(additionIndex)?.choices?.root) && (
                                <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                                  <XOctagon size={16} className='mt-1' />
                                  {
                                    (errors as any).additions?.at(additionIndex)?.choices?.root.message
                                  }
                                </span>)
                              }                               
                              {((errors as any).additions?.at(additionIndex)?.choices && !(errors as any).additions?.at(additionIndex)?.choices?.root) && (
                                <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                                  {(errors as any).additions?.at(additionIndex)?.choices?.message&&<XOctagon size={16} className='mt-1' />}
                                  {
                                    (errors as any).additions?.at(additionIndex)?.choices?.message
                                  }
                                </span>)
                              }
                            <button className='col-span-full self-center mx-auto flex gap-2 items-center justify-center bg-green-500 text-slate-50 transition duration-150 hover:bg-green-600 rounded-md px-2 py-1 my-1 text-xs' type="button" onClick={() => handleAddChoice(additionIndex)}>
                              <Plus/>
                              اختيار جديد
                            </button>
                          </div>
                          <button className='col-span-full self-center mx-auto flex gap-2 items-center justify-center bg-red-500 text-slate-50 transition duration-150 hover:bg-red-600 rounded-md px-2 py-1 my-2 text-xs' type="button" onClick={() => handleRemoveAddition(addition, additionIndex)}>
                            <Minus/>
                            حذف الإضافة
                          </button>
                        </div>
                          ))}
                        <button className='col-span-full self-center mx-auto  w-48 flex gap-2 items-center justify-center bg-green-500 text-slate-50 transition duration-150 hover:bg-green-600 rounded-md px-2 py-1 text-xs' type="button" onClick={handleAddAddition}>
                          <Plus/>
                          إضافة جديدة
                        </button>
                      </div>
                    </div>
                      </m.div>
                      </LazyMotion>
              }
              </AnimatePresence>
            </div>
            </div>
            <button onClick={() => {
              if (!DishData) {
                setPreview({ url: null })
                setAddAdditions(false)
                setAddDescription(false)
                setAddOldPrice(false)
                setAddsToBeDeleted([])
                setChoicesToBeDeleted([])
                reset()
              } else {
                setValue("name", DishData?.name? DishData?.name : "")
                setValue("image", DishData?.image || null)
                setValue("categoryId", DishData?.categoryId? DishData.categoryId : 0)
                setValue("chefId", DishData?.chefId?DishData.chefId : 0)
                setValue("Price", DishData?.price? DishData.price : 0)
                setValue("description", DishData?.description || undefined)
                setValue("oldPrice", DishData?.oldPrice || undefined)
                setValue("additions", DishData?.mealAdditions as any || undefined)
                setAdditions(DishData?.mealAdditions as any || [])
                setAddAdditions(DishData?.mealAdditions?.length?DishData.mealAdditions?.length>0?true:false:false)
                setAddDescription((DishData?.description || getValues().description)?true:false)
                setAddOldPrice((DishData?.oldPrice || getValues().oldPrice)?true:false)
                setAddsToBeDeleted([])
                setChoicesToBeDeleted([])
                setPreview({ url: DishData?.image || null })
              }
            }}  className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset'>إعادة البيانات</button>
            <button disabled={isDisabled || !isFormChanged() } className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-700 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
          </form>
      </>
  )
}


export default DishForm