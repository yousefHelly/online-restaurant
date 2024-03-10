import Image from 'next/image'
import React from 'react'
import { ChefHat, LucidePizza } from 'lucide-react';
import RatingStars from '@/lib/RatingStars';
import ShareButtons from './ShareButtons';
import Link from 'next/link';
import WishlistButton from './WishlistButton';

type Props = {
    dish?:{
        data?:Dish,
        isLoading?: boolean
    }
}

function DishDetails({dish}: Props) {
  return (
    <>
        <div className='col-span-full md:col-span-1 h-[325px]'>
            <Image
            src={dish?.data?.image||''}
            alt={dish?.data?.name || ""}
            className='object-cover rounded-2xl h-full w-[400px]'
            width={400}
            height={325}
            />
        </div>
        <div className='col-span-full md:col-span-2 flex flex-col gap-3 lg:gap-5'>
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
        <WishlistButton dish={dish}/>
        {dish?.data?.name&&<ShareButtons mealName={dish?.data?.name}/>}
        </div>
    </>
  )
}

export default DishDetails