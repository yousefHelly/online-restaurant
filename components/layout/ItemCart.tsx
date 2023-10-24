'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import {MinusCircle, PlusCircle} from 'lucide-react'
import Quantity from './Quantity'
import Link from 'next/link'

type Props = {
    image: string,
    name: string,
    status: string,
    price: number,
    quantity: number,
    page?:'cart'|'nav',
    close?: () => void
}

function ItemCart({image, name, status, price, quantity, page='nav', close = ()=>null}: Props) {
    const item = useRef<HTMLDivElement>(null)
    const [quantityChange, setQuantityChange] = useState<number>(quantity)
  return (
    <div ref={item} className='flex items-start rounded-2xl border dark:border-stone-600 shadow-md my-2 transition duration-150 hover:bg-main/5'>
    <Link onClick={()=>close!()} href={`/menu/${name}`} className='self-stretch'>
    <Image
    src={image}
    alt={name}
    width={page==='cart'?75:50}
    height={page==='cart'?75:50}
    className='object-cover rounded-r-2xl h-full w-full'
    />
    </Link>
    <div className='flex flex-col flex-1 m-1 p-1 '>
        <div className='flex justify-between items-center'>
            <Link  onClick={()=>close()} href={`/menu/${name}`} className={`${page==='cart'?'text-xl':'text-sm'} text-header dark:text-stone-300 font-bold hover:text-main transition duration-150`}>
                {name}
            </Link>
            <button className={`text-red-500 bg-red-200 rounded-2xl px-2 py-1 ${page==='cart'?'text-sm':'text-xs'} transition duration-150 hover:bg-red-300`}> حذف</button>
        </div>
        <div className={`text-lighterText dark:text-stone-400 ${page==='cart'?'text-md py-1':'text-sm'} font-bold`}>
            {status}
        </div>
        <Quantity quantityChange={quantityChange} setQuantityChange={setQuantityChange} price={price} page={page}/>
    </div>
</div>
  )
}

export default ItemCart