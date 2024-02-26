'use client'
import RatingStars from '@/lib/RatingStars'
import { ChefHat, Heart, LucidePizza } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import  Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AddCartItem, DeleteCartItem, UpdateAmountCart, useCartItem } from '@/lib/api/useCart';
import { useQueryClient } from 'react-query';
import useDish from '@/lib/api/useDish';
import Quantity from './Quantity';
import { ToggleWishlist } from '@/lib/api/useWishlist';

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
    id: number
}

function DishCard({name, image, chef, category, rating, ratingCount, price, oldPrice, cardView, favourate=false, id}: Props) {
    const cart = useCartItem(name)
    const addCartItem = AddCartItem()
    const deleteCartItem = DeleteCartItem()
    const updateCartItemAmount = UpdateAmountCart()
    const dish = useDish(name)
    const clientQuery = useQueryClient()
    useEffect(()=>{
        setTimeout(()=>{
            clientQuery.invalidateQueries(['dish', name])
        },500)
    },[])
    const selectedAdditions: { id: number, val:string }[] = []
    const [priceFromAdd, setPriceFromAdd] = useState<number>(cart.quriedItem?.price || dish.data?.price!)

    dish.data?.mealAdditions&&dish.data?.mealAdditions.map((add)=>{
        const additionPattern = `${add.name}:${add.choices[0].name}${add.choices[0].price?'+'+add.choices[0].price+'ج':''}`.trim()
        selectedAdditions.push({
            id:add.id,
            val:additionPattern
        })
    })
    useEffect(()=>{
        dish.data?.mealAdditions&&dish.data?.mealAdditions.map((add)=>{
            if(add.choices[0].price){
                setPriceFromAdd(add.choices[0].price)
            }
        })
    },[selectedAdditions])
    const [quantityChange, setQuantityChange] = useState<number>(cart.quriedItem?.amount||1)
    useEffect(()=>{
        if(quantityChange>0){
            updateCartItemAmount.mutate({name:name, amount:quantityChange})
        }else{
            deleteCartItem.mutate({name})
            setQuantityChange(1)
        }
    },[quantityChange])
    const toggleWishlist = ToggleWishlist()
  return (
    <motion.div initial={{opacity:0, y:15}} whileInView={{opacity:1, y:0, transition:{duration:0.15}}} viewport={{amount:0.4, once:true}} className={`group border dark:border-stone-600 bg-slate-50/40 dark:bg-stone-600/40 dark:hover:bg-main/20 transition duration-300 hover:bg-main/20 relative flex ${cardView==='grid'?'flex-col max-h-[400px]':' h-[225px]'} gap-2 shadow-md overflow-x-hidden`}>
    <figure className={`${cardView==='grid'?'w-full h-[175px]':'w-2/6 lg:w-[200px] h-full'} overflow-hidden relative`}>
        <Link href={`/menu/${name}`} >
        <Image 
        src={image}
        alt={name}
        width={400}
        height={400}
        className='w-full h-full object-cover transition duration-300 group-hover:scale-105'
        />
        </Link>
        <span onClick={()=>toggleWishlist.mutate({id:(dish.data?.id || id), isFavourite:(dish.data?.isFavourite||favourate)})} className='absolute -left-20 transition duration-300 group-hover:left-5 top-5 cursor-pointer '>
            <Heart className={`${(dish.data?.isFavourite||favourate)?'fill-red-500 dark:text-stone-900':'text-red-500 hover:fill-red-500'}  transition duration-150`}/>
        </span>
    </figure>
    <div className={`flex-1 flex flex-col gap-2 ${cardView==='row'?'justify-evenly pl-1 lg:pl-0 lg:justify-center':'justify-center'}`}>
        <Link href={`/menu/${name}`} className={`font-header dark:text-stone-300 dark:hover:text-main font-bold ${cardView==='grid'?'text-xl px-4':'text-md lg:text-xl px-1 lg:px-4'} mt-2 hover:text-main transition duration-150`}>{name}</Link>
        <div className={`w-full flex justify-between items-center ${cardView==='grid'?'px-4':' px-1 lg:px-4'}`}>
            <div className='flex items-center gap-1 '>
                <ChefHat size={18} className='text-main dark:fill-main dark:text-stone-800'/>
                <Link href={`/menu/all-dishes?f=chef&n=${chef}`} className={`text-lighterText ${cardView==='grid'?'text-sm':' text-xs md:text-sm'} font-bold cursor-pointer hover:text-header  dark:hover:text-main transition duration-150`}>{chef}</Link>
            </div>
            <div className='flex items-center justify-center gap-1'>
                <LucidePizza size={18} className='text-main dark:fill-main dark:text-stone-800'/>
                <Link href={`/menu/all-dishes?f=category&n=${category}`} className={`text-lighterText ${cardView==='grid'?'text-sm':' text-xs md:text-sm'} font-bold cursor-pointer hover:text-header dark:hover:text-main  transition duration-150`}>{category}</Link>
            </div>
        </div>
        <div className={`flex items-center justify-between  ${cardView==='grid'?'px-4 py-4':'px-1 lg:px-4 py-1 lg:py-4'} `}>
        <div className={`flex items-center gap-0  ${cardView==='grid'?'text-sm':' text-xs md:text-sm'} dark:text-stone-400`}>
            <RatingStars rating={rating}/>
            ({ratingCount})
        </div>
        </div>

        <div className={`flex items-center justify-between ${cardView==='grid'?'px-4 py-4':'px-1 lg:px-4 py-3 lg:py-4'} `}>
            <div className='relative'>
                {
                    oldPrice!>0&&<p className={`absolute ${cardView==='grid'?'-top-7 text-md':'-top-5 lg:-top-7  text-sm md:text-md'}  font-header font-bold  text-red-500 line-through w-24`}>{oldPrice}{' '}ج</p>
                }
                <p className='font-header font-bold text-xl text-main'>{cart.quriedItem?cart.quriedItem.totalPrice: price}{' '}ج</p>
            </div>
                {
                    !cart.quriedItem&&<button 
                    onClick={
                        ()=>{
                            addCartItem.mutate({
                                id:dish.data?.id || id,
                                name:name,
                                image:image,
                                price:priceFromAdd || price,
                                selectedAdditions:selectedAdditions
                            })
                        }
                    } 
                    className={`flex items-center border border-transparent gap-3 bg-main text-slate-50 hover:text-main dark:hover:text-main ${cardView==='grid'?' px-3 py-2 ':'px-2 lg:px-3 py-1 lg:py-2'} rounded-2xl hover:bg-slate-50 dark:hover:bg-stone-950  transition duration-150 font-bold`}
                    >
                        اضف الي السلة
                    </button>
                }

                {
                    cart.quriedItem&&<button className={`flex items-center border border-transparent transition duration-150 gap-3 border-main bg-slate-100 dark:bg-stone-800 text-main px-3 py-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-stone-950  font-bold`}>
                    <Quantity type={cardView} quantityChange={cart.quriedItem.amount || quantityChange} setQuantityChange={setQuantityChange} enableZero={true}/>
                    </button>
                }

        </div>
    </div>
</motion.div>
  )
}

export default DishCard