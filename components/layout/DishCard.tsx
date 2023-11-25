'use client'
import RatingStars from '@/lib/RatingStars'
import { ChefHat, Heart, LucidePizza } from 'lucide-react'
import React from 'react'
import  Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
    name: string,
    image: string,
    chef: string,
    category: string,
    rating: number,
    ratingCount: number,
    price: number,
    oldPrice?: number,
    cardView: 'grid' | 'row',
    favourate?: boolean,
    i: number
}

function DishCard({name, image, chef, category, rating, ratingCount, price, oldPrice, cardView, favourate=false, i}: Props) {
  return (
    <motion.div initial={{opacity:0, y:15}} whileInView={{opacity:1, y:0, transition:{duration:0.15}}} viewport={{amount:0.4, once:true}} className={`group border dark:border-stone-600 bg-slate-50/40 dark:bg-stone-600/40 dark:hover:bg-main/20 transition duration-300 hover:bg-main/20 relative flex ${cardView==='grid'?'flex-col':''} gap-2 shadow-md max-h-[400px] overflow-x-hidden`}>
    <figure className={`${cardView==='grid'?'w-full h-[175px]':' w-[200px] h-full'} overflow-hidden relative`}>
        <Link href={`/menu/${name}`} >
        <img 
        src={`${`https://localhost:7166`}${image}`}
        alt={name}
        width={400}
        height={400}
        className='w-full h-full object-cover transition duration-300 group-hover:scale-105'
        />
        </Link>
        <span className='absolute -left-20 transition duration-300 group-hover:left-5 top-5 '>
            <Heart className={`${favourate?'fill-red-500 dark:text-stone-900':'text-red-500 hover:fill-red-500'}  transition duration-150`}/>
        </span>
    </figure>
    <div className='flex-1 flex flex-col gap-2 justify-center'>
        <Link href={`/menu/${name}`} className='font-header dark:text-stone-300 dark:hover:text-main font-bold text-xl px-4 mt-2 hover:text-main transition duration-150'>{name}</Link>
        <div className='w-full flex justify-between items-center px-4'>
            <div className='flex items-center gap-1 '>
                <ChefHat size={18} className='text-main dark:fill-main dark:text-stone-800'/>
                <Link href={`/menu/all-dishes?f=chef&n=${chef}`} className='text-lighterText  text-sm font-bold cursor-pointer hover:text-header  dark:hover:text-main transition duration-150'>{chef}</Link>
            </div>
            <div className='flex items-center justify-center gap-1'>
                <LucidePizza size={18} className='text-main dark:fill-main dark:text-stone-800'/>
                <Link href={`/menu/all-dishes?f=category&n=${category}`} className='text-lighterText  text-sm font-bold cursor-pointer hover:text-header dark:hover:text-main  transition duration-150'>{category}</Link>
            </div>
        </div>
        <div className='flex items-center justify-between px-4  py-4'>
        <div className='flex items-center gap-0 text-sm dark:text-stone-400'>
            <RatingStars rating={rating}/>
            ({ratingCount})
        </div>
        </div>

        <div className='flex items-center justify-between px-4 py-4'>
            <div className='relative'>
                {
                    oldPrice&& <p className='absolute -top-7 font-header font-bold text-md text-red-500 line-through w-24'>{oldPrice}{' '}ج</p>
                }
                <p className='font-header font-bold text-xl text-main'>{price}{' '}ج</p>
            </div>
            <button className='bg-main hover:bg-main/80 text-slate-50 dark:text-stone-200 dark:bg-stone-700 dark:hover:border-main dark:border dark:border-transparent dark:hover:bg-stone-800 dark:hover:text-main px-3 py-2 rounded-2xl'>اضف إلي السلة</button>
        </div>
    </div>
</motion.div>
  )
}

export default DishCard