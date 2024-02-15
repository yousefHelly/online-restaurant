'use client'
import { Tab } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import FixedAddition from './FixedAddition'
import NotFound from '../layout/NotFound'
import Review from './Review'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Rating } from 'react-simple-star-rating'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { fillColorArray } from '@/Data'
import { PostComment, UpdateComment } from '@/lib/api/comments'
import { useQueryClient } from 'react-query'
import { ReviewType, ReviewSchema } from '@/model/Review'
import { XOctagon } from 'lucide-react'

type Props = {
    dish?:{
        data?:Dish
    }
}

function DishTabs({dish}: Props) {
    const [updateReview, setUpdateReview] = useState<{update: true, rating: number, reviewText: string, id: number} | {update:false}>({update:false})
    const {data:session} = useSession();
    const post = PostComment(dish?.data?.name)
    const update = UpdateComment(dish?.data?.name)
  return (
    <div className='mt-5 xl:mt-2 col-span-full md:col-span-3 xl:col-span-4'>
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
        <Tab.Panel as='div' className={`grid md:grid-cols-2 xl:grid-cols-4 gap-5 py-10 px-3 md:px-10`}>
            {
                dish?.data?.staticMealAdditions?.length!>0?dish?.data?.staticMealAdditions?.map((addition, i)=>{
                    return(
                        i<4&&<FixedAddition key={i} id={addition.id} name={addition.name} image={addition.additionUrl} price={addition.price}/>
                    )
                }):<NotFound name='أطباق جانبية'/>
            }
        </Tab.Panel>
        <Tab.Panel as='div' className={`flex flex-col gap-5 py-10 px-3 md:px-10`}>
            {
                dish?.data?.reviews&&dish?.data?.reviews.length>0?dish?.data?.reviews.map((review, i)=>{
                    return(
                        <Review key={i} id={review.id} userName={review.userName} userImg={review.userImg} rate={review.rate} text={review.text} date={review.createdDate} setUpdateReview={setUpdateReview} name={dish?.data?.name || ""}/>
                    )
                }):<NotFound name='تقييمات'/>
            }
            <Formik<ReviewType>
            enableReinitialize
            initialValues={{
                rating: updateReview.update===true&&updateReview.rating || 0,
                review: updateReview.update===true&&updateReview.reviewText || ''
            }}
            onSubmit={(vals)=>{
                if(updateReview.update===false){
                    post.mutate({id:dish?.data!.id!, rating:vals.rating, review:vals.review})
                }else if(updateReview.update===true){
                    update.mutate({id:updateReview.id, rating:vals.rating, review:vals.review},{
                        onSuccess(){
                            setUpdateReview({update:false})
                        }
                    })
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
                                    (session?.user && !updateReview.update && dish?.data?.reviews&&dish?.data?.reviews.filter((rev)=>rev.userName === session.user.userName).length>0)&&<div className='absolute inset-0 bg-slate-300/25 dark:bg-stone-800/25 dark:text-stone-300 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-5 p-5 text-header font-bold text-center lg:text-start'>

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
  )
}

export default DishTabs