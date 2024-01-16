'use client'
import Quantity from '@/components/layout/Quantity'
import { convert } from '@/lib/ConvertArabicURL'
import RatingStars from '@/lib/RatingStars'
import { Tab } from '@headlessui/react'
import { ChefHat, Heart, Loader2, LucidePizza, ShoppingCart, XOctagon } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment, useState, useEffect } from 'react'
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
import useCart from '@/lib/api/useCart'
import { PostComment } from '@/lib/api/comments'
import Loading from '@/app/loading'
import Image from 'next/image'

type Props = {
    params:{
        dishName: string
    }
}

function DishViewPage({params:{dishName}}: Props) {
        const arabicName = convert(dishName)
        const dish = useDish(arabicName)
        const cart = useCart()
        const [quantityChange, setQuantityChange] = useState<number>(1)
        const [price, setPrice] = useState<number>(dish?.data?.price!||0)
        const [updateReview, setUpdateReview] = useState<{update: true, rating: number, reviewText: string, id: number} | {update:false}>({update:false})
        const {data:session} = useSession();
        useAxiosAuth()
        useEffect(()=>{
            dish?.data?.price&&setPrice(dish?.data?.price)
        },[dish?.data?.price])
        const [rating, setRating] = useState<number>(0)
        const ReviewSchema = z.object({
            rating:z.number({required_error:'إختار تقييم الطبق من بين 1 الي 5'}).min(0.5,'يجب ان يكون التقييم اكبر من او يساوي 0.5').max(5),
            review:z.string({required_error:'اضف مراجعتك للطبق'})
        })
        type Review = z.infer<typeof ReviewSchema>
        const clientQuery = useQueryClient()
        const post = PostComment(dish?.data?.name)
  return (
    <main className='flex min-h-screen flex-col items-start pb-10 px-24 overflow-hidden'>
        <div className='grid grid-cols-4 items-start justify-center gap-5'>
            <div className='h-[325px]'>
                <Image
                src={dish?.data?.image || ""}
                alt={dish?.data?.name || ""}
                className='object-cover rounded-2xl h-full w-[400px]'
                width={400}
                height={325}
                />
            </div>
            <div className='col-span-2 flex flex-col gap-5'>
               <h3 className='text-2xl font-bold font-header text-header dark:text-stone-300'>{dish?.data?.name}</h3>
               <p className='text-lighterText text-sm font-bold'>{dish?.data?.description}</p>
               <div className='flex items-center gap-3'>
                <ChefHat className='text-main dark:fill-main dark:text-stone-800'/>
                <Link href={`/menu/all-dishes?f=chef&n=${dish?.data?.chefName}`} className='text-lighterText text-sm font-bold cursor-pointer hover:text-header dark:hover:text-main transition duration-150'>{dish?.data?.chefName}</Link>
               </div>
               <div className='flex items-center gap-3'>
               <LucidePizza className='text-main dark:fill-main dark:text-stone-800'/>
               <Link href={`/menu/all-dishes?f=category&n=${dish?.data?.categoryName}`} className='text-lighterText text-sm font-bold cursor-pointer hover:text-header dark:hover:text-main transition duration-150'>{dish?.data?.categoryName}</Link>
               </div>
            <div className={`flex dark:text-stone-400`}>
               <RatingStars rating={dish?.data?.rate || 0}/>
               ({dish?.data?.numOfRates||0})
            </div>
            <button 
            onClick={()=>{
                session?.user?
                dish?.data?.isFavourite!='false'?
                axiosAuth.delete(`/api/wishlist/${dish?.data?.id}`).then((res)=>{toast.success(res.data.message);clientQuery.invalidateQueries(['dish'])})
                :axiosAuth.post(`/api/wishlist/${dish?.data?.id}`).then((res)=>{toast.success(res.data.message);clientQuery.invalidateQueries(['dish'])})
                :toast.error('يجب عليك تسجيل الدخول لتتمكن من إضافة الطبق الي المفضلة', {id:'signinRequired'})    
            }
            } className={`group self-start flex px-3 py-2 rounded-2xl gap-1 items-center bg-transparent dark:bg-red-500 dark:text-stone-300 border border-red-500 text-red-500 font-bold font-header`}>
            {
                <Heart className={`${(dish?.data?.isFavourite!='false' && dish?.data?.isFavourite!=undefined)?'fill-red-500  dark:fill-stone-300':'text-red-500 dark:text-stone-300 dark:group-hover:fill-stone-300 group-hover:fill-red-500'}  transition duration-150`}/>
            }
            {
                (dish?.data?.isFavourite!='false' && dish?.data?.isFavourite!=undefined)?'إزالة من المفضلة':'اضف الي المفضلة'
            }
            </button>
            {dish?.data?.name&&<ShareButtons mealName={dish?.data?.name}/>}
            </div>
            <div className='p-1 rounded-2xl border dark:border-stone-600 dark:text-stone-300 h-fit pb-5 flex flex-col items-center relative'>
                <div className='p-2 flex flex-col gap-3 w-full'>
                    {
                        dish?.data?.mealAdditions?.map((addition, i)=>{
                          return(
                            <Addition key={i} name={addition.name} choices={addition.choices} setPrice={setPrice}/>
                        )})
                    }
                    <div className='flex flex-col gap-3 mx-5 my-2'>
                        <h4 className='font-bold font-header'>الكمية</h4>
                        <div className='flex justify-between items-center px-1'>
                            <Quantity quantityChange={quantityChange} setQuantityChange={setQuantityChange}/>
                            <div className='text-2xl font-bold font-header text-main'>
                                {quantityChange* price}ج
                            </div>
                        </div>
                    </div>
                </div>
                <button 
                onClick={
                    ()=>{
                        if(cart.data?.cartMeals.filter((el)=>el.name===dish?.data?.name)&&cart.data?.cartMeals.filter((el)=>el.name===dish?.data?.name).length>0){
                            axios.delete(`/api/cart/${dish?.data?.id}`).then((res)=>toast.success(res.data.message))
                            clientQuery.invalidateQueries(['cart'])
                        }else{
                            axios.post(`/api/cart/${dish?.data?.id}`).then((res)=>toast.success(res.data.message))
                            clientQuery.invalidateQueries(['cart'])
                        }
                    }
                } 
                className={`flex items-center border border-transparent transition duration-150 gap-3 ${cart.data?.cartMeals.filter((el)=>el.name===dish?.data?.name)&&cart.data?.cartMeals.filter((el)=>el.name===dish?.data?.name).length>0?'border-main bg-slate-50 text-main':'bg-main text-slate-50'} px-3 py-2 rounded-2xl  font-bold absolute bottom-0 translate-y-1/2 shadow-md`}
                >
                    {
                       cart.data?.cartMeals.filter((el)=>el.name===dish?.data?.name)&&cart.data?.cartMeals.filter((el)=>el.name===dish?.data?.name).length>0?
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
            <div className='col-span-4'>
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
                        التقييمات({dish?.data?.numOfRates || 0})
                    </button>
                )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel as='div' className={`grid grid-cols-4 gap-5 p-10`}>
                    {
                        dish?.data?.staticMealAdditions?.map((addition, i)=>{
                            return(
                                i<4&&<FixedAddition key={i} id={addition.id} name={addition.name} image={addition.additionUrl} price={addition.price}/>
                            )
                        })
                    }
                </Tab.Panel>
                <Tab.Panel as='div' className={`flex flex-col gap-5 p-10`}>
                    {
                        dish?.data?.reviews&&dish?.data?.reviews.length>0?dish?.data?.reviews.map((review, i)=>{
                            return(
                                <Review key={i} id={review.id} userName={review.userName} userImg={review.userImg} rate={review.rate} text={review.text} date={review.createdDate} setUpdateReview={setUpdateReview} name={dish?.data?.name || ""}/>
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
                            post.mutate({id:dish?.data!.id!, rating:vals.rating, review:vals.review})
                        }else if(updateReview.update===true){
                            axiosAuth.put(`/api/mealReview/${updateReview.id}`,{
                                text:vals.review,
                                rate: vals.rating
                            }).then((res)=>toast.success(res.data.message)).catch((err)=>toast.error(err.response?.data as string,{id:'FailedToUpdateReview'}))
                            clientQuery.invalidateQueries(['dish', dish?.data?.name])
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
                                        <div className='flex gap-3 items-center'>
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
                                        <div className='flex gap-3 items-center'>
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
                                            (session?.user && !updateReview.update && dish?.data?.reviews&&dish?.data?.reviews.filter((rev)=>rev.userName === session.user.userName).length>0)&&<div className='absolute inset-0 bg-slate-300/25 dark:bg-stone-800/25 dark:text-stone-300 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-5 p-5 text-header font-bold'>
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
            dish?.isLoading&&<Loading/>
        }
    </main>
  )
}

export default DishViewPage