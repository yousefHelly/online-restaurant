'use client'
import Quantity from '@/components/layout/Quantity'
import { convert } from '@/lib/ConvertArabicURL'
import RatingStars from '@/lib/RatingStars'
import { Tab } from '@headlessui/react'
import { ChefHat, Heart, Loader2, LucidePizza, ShoppingCart, XOctagon } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Rating } from 'react-simple-star-rating'
import {fillColorArray} from '@/Data'
import useDish from '@/lib/api/useDish'
import FixedAddition from '@/components/menu/FixedAddition'
import ShareButtons from '@/components/menu/ShareButtons'
import Addition from '@/components/menu/Addition'
import Review from '@/components/menu/Review'
import NotFound from '@/components/layout/NotFound'
import { z } from 'zod'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import axios, { axiosAuth } from '@/lib/api/axios'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react'
import { AddCartItem, DeleteCartItem, UpdateAmountCart, UpdateItemAddition, useCartItem } from '@/lib/api/useCart'
import { PostComment } from '@/lib/api/comments'
import Loading from '@/app/loading'
import { ToggleWishlist } from '@/lib/api/useWishlist'

type Props = {
    params:{
        dishName: string
    }
}

function DishViewPage({params:{dishName}}: Props) {
        const arabicName = convert(dishName)
        const {data, isLoading} = useDish(arabicName)
        const cart = useCartItem(arabicName)
        const updateAmount = UpdateAmountCart()
        const updateAddition = AddCartItem()
        const deleteItem = DeleteCartItem()
        const [quantityChange, setQuantityChange] = useState<number>(cart.quriedItem?.amount || 1)
        const [selectedAdditions, setSelectedAdditions] = useState<string[]>([])
        const [price, setPrice] = useState<number>(data?.price!)
        const [updateReview, setUpdateReview] = useState<{update: true, rating: number, reviewText: string, id: number} | {update:false}>({update:false})
        const {data:session} = useSession();
        useAxiosAuth()
        useEffect(()=>{
            cart.quriedItem?.amount&&setQuantityChange(cart.quriedItem?.amount)
        },[cart.quriedItem])
        useEffect(()=>{
            (cart.quriedItem?.amount!=quantityChange && cart.quriedItem?.amount)&&updateAmount.mutate({name:arabicName, amount:quantityChange})
        },[quantityChange])
        useEffect(()=>{
            selectedAdditions.map((add)=>{
                if(add.includes('ج')){
                    const addCost = add.slice(add.indexOf('+')+1, add.lastIndexOf('ج'))
                    setPrice(+addCost)
                }
            })
        })
        
        const ReviewSchema = z.object({
            rating:z.number({required_error:'إختار تقييم الطبق من بين 1 الي 5'}).min(0.5,'يجب ان يكون التقييم اكبر من او يساوي 0.5').max(5),
            review:z.string({required_error:'اضف مراجعتك للطبق'})
        })
        type Review = z.infer<typeof ReviewSchema>
        const clientQuery = useQueryClient()
        const post = PostComment(data?.name)
        const toggleWishlist  = ToggleWishlist()
  return (
    <main className='flex min-h-screen flex-col items-start px-12 xl:px-24 overflow-hidden'>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 items-start justify-center gap-5'>
            <div className='col-span-1 h-[325px]'>
                <img
                src={`${`https://localhost:7166`}${data?.image}`}
                alt={data?.name}
                className='object-cover rounded-2xl h-full w-[400px]'
                />
            </div>
            <div className='md:col-span-2 flex flex-col gap-3 lg:gap-5'>
               <h3 className='text-2xl font-bold font-header text-header dark:text-stone-300'>{data?.name}</h3>
               <p className='text-lighterText text-sm font-bold'>{data?.description}</p>
               <div className='flex items-center gap-3'>
                <ChefHat className='text-main dark:fill-main dark:text-stone-800'/>
                <Link href={`/menu/all-dishes?f=chef&n=${data?.chefName}`} className='text-lighterText text-sm font-bold cursor-pointer hover:text-header dark:hover:text-main transition duration-150'>{data?.chefName}</Link>
               </div>
               <div className='flex items-center gap-3'>
               <LucidePizza className='text-main dark:fill-main dark:text-stone-800'/>
               <Link href={`/menu/all-dishes?f=category&n=${data?.categoryName}`} className='text-lighterText text-sm font-bold cursor-pointer hover:text-header dark:hover:text-main transition duration-150'>{data?.categoryName}</Link>
               </div>
            <div className={`flex dark:text-stone-400`}>
               <RatingStars rating={data?.rate || 0}/>
               ({data?.numOfRates||0})
            </div>
            <button 
            onClick={()=>{
                toggleWishlist.mutate({id:data?.id!, isFavourite:data?.isFavourite!}) 
            }
            } className={`group self-start flex px-3 py-2 rounded-2xl gap-1 items-center bg-transparent dark:bg-red-500 dark:text-stone-300 border border-red-500 text-red-500 font-bold font-header`}>
            {
                <Heart className={`${data?.isFavourite?'fill-red-500  dark:fill-stone-300':'text-red-500 dark:text-stone-300 dark:group-hover:fill-stone-300 group-hover:fill-red-500'}  transition duration-150`}/>
            }
            {
                data?.isFavourite?'إزالة من المفضلة':'اضف الي المفضلة'
            }
            </button>
            {data?.name&&<ShareButtons mealName={data?.name}/>}
            </div>
            <div className='md:col-span-3 xl:col-span-1 p-1 rounded-2xl border dark:border-stone-600 dark:text-stone-300 h-fit pb-5 flex flex-col items-center relative'>
                <div className='p-2 flex flex-col gap-3 w-full'>
                    {
                        (data?.mealAdditions&&data?.mealAdditions.length>0)&&data?.mealAdditions.map((addition, i)=>{
                          return(
                            <Addition dishName={arabicName} key={i} name={addition.name} choices={addition.choices} setPrice={setPrice} selectedAdditions={selectedAdditions} setSelectedAdditions={setSelectedAdditions}/>
                        )})
                    }
                    <div className='flex flex-col gap-3 mx-5 my-2'>
                        <h4 className='font-bold font-header'>الكمية</h4>
                        <div className='flex justify-between items-center px-1'>
                            <Quantity quantityChange={quantityChange} setQuantityChange={setQuantityChange}/>
                            <div className='text-2xl font-bold font-header text-main'>
                                {cart.quriedItem?.totalPrice || (price * quantityChange)}ج
                            </div>
                        </div>
                    </div>
                </div>
                <button 
                onClick={
                    ()=>{
                        if(cart.quriedItem){
                            deleteItem.mutate({name:arabicName})
                        }
                        else{
                            updateAddition.mutate({
                                name:data?.name || arabicName,
                                price: price,
                                image:data?.image!,
                                amount: quantityChange,
                                selectedAdditions:selectedAdditions
                            })
                        }
                    }
                } 
                className={`flex items-center border border-transparent transition duration-150 gap-3 ${cart.quriedItem?'border-main bg-slate-100 dark:bg-stone-800 text-main ':'bg-main text-slate-50 hover:text-main dark:hover:text-main'} px-3 py-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-stone-950  transition duration-150 font-bold absolute bottom-0 translate-y-1/2 shadow-md`}
                >
                    {
                       cart.quriedItem?
                        <>
                            <ShoppingCart className='fill-main text-main'/>
                            ازالة من السلة
                        </>
                        :
                        <>
                            <ShoppingCart />
                            اضف الي السلة
                        </>
                    }

                </button>
            </div>
            <div className='mt-5 xl:mt-2 md:col-span-3 xl:col-span-4'>
            <Tab.Group as={'div'} className='relative bg-slate-50 dark:bg-stone-800 w-full  p-5 my-12'>
            <Tab.List as={'div'} className='absolute flex items-center gap-5 top-0 -translate-y-1/2'>
                <Tab as={Fragment} >
                {({ selected }) => (
                    <button className={`-translate-y-1/2 py-2 px-4 font-bold font-header w-fit ${selected?'bg-slate-50 dark:bg-stone-800 dark:text-stone-300  text-header ':'text-lighterText dark:text-stone-400'}`}>
                        جربها مع
                    </button>
                )}
                </Tab>
                <Tab as={Fragment} >
                {({ selected }) => (
                    <button className={`-translate-y-1/2 py-2 px-4 font-bold font-header w-fit ${selected?'bg-slate-50 dark:bg-stone-800 dark:text-stone-300  text-header ':'text-lighterText dark:text-stone-400'}`}>
                        التقييمات({data?.numOfRates || 0})
                    </button>
                )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel as='div' className={`grid md:grid-cols-2 xl:grid-cols-4 gap-5 py-10 px-3 md:px-10`}>
                    {
                        data?.staticMealAdditions&&data?.staticMealAdditions.length>0?data?.staticMealAdditions.map((addition, i)=>{
                            return(
                                i<4&&<FixedAddition key={i} id={addition.id} name={addition.name} image={addition.additionUrl} price={addition.price}/>
                            )
                        }):<NotFound name='أطباق جانبية'/>
                    }
                </Tab.Panel>
                <Tab.Panel as='div' className={`flex flex-col gap-5 py-10 px-3 md:px-10`}>
                    {
                        data?.reviews&&data?.reviews.length>0?data?.reviews.map((review, i)=>{
                            return(
                                <Review key={i} id={review.id} userName={review.userName} userImg={review.userImg} rate={review.rate} text={review.text} date={review.createdDate} setUpdateReview={setUpdateReview} name={data?.name}/>
                            )
                        }):<NotFound name='تقييمات'/>
                    }
                    <Formik<Review>
                    enableReinitialize
                    initialValues={{
                        rating: updateReview.update===true&&updateReview.rating || 0,
                        review: updateReview.update===true&&updateReview.reviewText || ''
                    }}
                    onSubmit={(vals)=>{
                        if(updateReview.update===false){
                            post.mutate({id:data!.id, rating:vals.rating, review:vals.review})
                        }else if(updateReview.update===true){
                            axiosAuth.put(`/api/mealReview/${updateReview.id}`,{
                                text:vals.review,
                                rate: vals.rating
                            }).then((res)=>toast.success(res.data.message)).catch((err)=>toast.error(err.response?.data as string,{id:'FailedToUpdateReview'}))
                            clientQuery.invalidateQueries(['dish', data?.name])
                            setUpdateReview({update:false})
                        }
                    }}
                    validationSchema={
                        toFormikValidationSchema(ReviewSchema)
                    }
                    >
                        {
                            ({errors, touched, setFieldValue, values})=>{
                                return(
                                    <Form>
                                    <div className='bg-slate-200 dark:bg-stone-900 shadow-md p-5 text-header dark:text-stone-300 font-bold flex flex-col gap-3 relative'>
                                        <div className='flex flex-col lg:flex-row gap-3 lg:items-center'>
                                            <label className='text-header dark:text-stone-300 font-bold font-header'>التقييم :</label>
                                            <Field id='rating' name='rating' hidden/>
                                            <Rating
                                            rtl
                                            onClick={(val)=>setFieldValue('rating',val)}
                                            allowFraction
                                            initialValue={updateReview.update===true&&updateReview.rating || 0}
                                            transition
                                            fillColorArray={fillColorArray}
                                            />
                                        {(errors.rating && touched.rating)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='rating' id='rating'/></span>}
                                        </div>
                                        <div className='flex flex-col lg:flex-row gap-3 lg:items-center'>
                                        <p className='text-header dark:text-stone-300 font-bold font-header'>التعليق :</p>
                                        <Field name='review' id='review' as='textarea' className='resize-none border dark:border-stone-600 bg-slate-100 dark:bg-stone-700 rounded-2xl p-2 focus-within:outline-none w-3/4'/>
                                        {(errors.review && touched.review)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='review' id='review'/></span>}
                                        {
                                            !session?.user&&<div className='absolute inset-0 bg-slate-300/25 dark:bg-stone-800/25 dark:text-stone-300 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-5 p-5 text-header font-bold'>
                                            إنضم لينا لتتمكن من كتابة تقييم لهذا الطبق
                                            <Link href={'/login'} className='text-slate-50 font-bold bg-main px-3 py-2 hover:text-main hover:bg-transparent transition duration-150'>تسجيل الدخول</Link>
                                        </div>
                                        }
                                        {
                                            (session?.user && !updateReview.update && data?.reviews&&data?.reviews.filter((rev)=>rev.userName === session.user.userName).length>0)&&<div className='absolute inset-0 bg-slate-300/25 dark:bg-stone-800/25 dark:text-stone-300 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-5 p-5 text-header font-bold text-center lg:text-start'>
                                                لقد قمت بإضافة تقييمك لهذا الطبق من قبل !
                                        </div>
                                        }
                                    </div>
                                    <button disabled={(updateReview.update===true&&(updateReview.reviewText===values.review && updateReview.rating === values.rating) || (values.rating === 0 && values.review===''))} type='submit' className='px-8 py-2 rounded-2xl bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main hover:text-main hover:bg-transparent transition duration-150 self-center disabled:bg-slate-400 dark:disabled:bg-stone-800 dark:disabled:text-stone-400 disabled:text-slate-50 disabled:cursor-not-allowed'>حفظ</button>                    
                                    </div>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </Tab.Panel>
            </Tab.Panels>
            </Tab.Group>
            </div>
        </div>
        {
            isLoading&&<Loading/>
        }
    </main>
  )
}

export default DishViewPage