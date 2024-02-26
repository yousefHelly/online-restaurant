'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import {MinusCircle, PlusCircle} from 'lucide-react'
import Quantity from './Quantity'
import Link from 'next/link'
import useCart, { DeleteCartItem, UpdateAmountCart } from '@/lib/api/useCart'

type Props = {
    image: string,
    name: string,
    status: { id: number, val:string }[] | undefined,
    quantity: number,
    totalPrice: number,
    page?:'cart'|'nav',
    close?: () => void
}

function ItemCart({image, name, status, quantity, totalPrice, page='nav', close = ()=>null}: Props) {
    const item = useRef<HTMLDivElement>(null)
    const [quantityChange, setQuantityChange] = useState<number>(quantity)
    const mutateAmount = UpdateAmountCart()
    const deleteItem = DeleteCartItem()
    useEffect(()=>{
        mutateAmount.mutate({name:name, amount:quantityChange})
    },[quantityChange, quantity])
  return (
    <div ref={item} className={`flex items-start rounded-2xl border dark:border-stone-600 shadow-md my-2 transition duration-150 hover:bg-main/5 h-[150px]`}>
    <Link onClick={()=>close!()} href={`/menu/${name}`} className={`self-stretch ${page==='cart'?'w-[100px] h-full md:w-[150px]':'w-[75px]'}`}>
    <Image
    src={image}
    alt={name}
    width={150}
    height={150}
    className={`object-cover rounded-r-2xl h-full ${page==='cart'?'w-full md:w-[150px]':'w-[75px]'}`}
    />
    </Link>
    <div className='flex flex-col h-full justify-evenly flex-1 m-1 px-2 lg:p-1 '>
        <div className='flex justify-between items-center'>
            <Link  onClick={()=>close()} href={`/menu/${name}`} className={`${page==='cart'?'text-xl':'text-sm'} text-header dark:text-stone-300 font-bold hover:text-main transition duration-150`}>
                {name}
            </Link>
            <button onClick={()=>{deleteItem.mutate({name:name})}} className={`text-red-500 dark:text-red-600 bg-red-200 dark:bg-red-300 rounded-2xl px-2 py-1 ${page==='cart'?'text-sm':'text-xs'} transition duration-150 hover:bg-red-300 dark:hover:bg-red-400`}> حذف</button>
        </div>
        {status&&<div className={`text-lighterText flex flex-col dark:text-stone-400 ${page==='cart'?'text-md py-1 my-2':'text-xs my-1'} font-bold`}>
            {status.map((st)=>{
                return(
                    <span key={st.id}>{st.val.slice(0,st.val.indexOf('+')!=-1?st.val.indexOf('+'):undefined)}</span>
                )
            })}
        </div>
        }
        <Quantity type='row' quantityChange={quantityChange} setQuantityChange={setQuantityChange} price={totalPrice} page={page}/>
    </div>
</div>
  )
}

export default ItemCart