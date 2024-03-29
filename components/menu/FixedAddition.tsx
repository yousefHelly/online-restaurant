'use client'
import React,{useState, useEffect} from 'react'
import Quantity from './../layout/Quantity';
import Image from 'next/image';
import { AddCartItem, DeleteCartItem, UpdateAmountCart, useCartItem } from '@/lib/api/useCart';

type Props = {
    id: number,
    name: string,
    image: string,
    price: number
}

function FixedAddition({id, name, image, price}: Props) {
    const cartItem  = useCartItem(name)
    const [added, setAdded] = useState<boolean>(cartItem.quriedItem?true:false)
    const [quantity, setQuantity]= useState<number>(cartItem.quriedItem?.amount || 1)
    const [updatedHere, setUpdatedHere] = useState<boolean>(false)
    const addCartItem = AddCartItem()
    const updateAmount = UpdateAmountCart()
    const deleteCartItem = DeleteCartItem()
    useEffect(()=>{
        if(cartItem.quriedItem && !updatedHere){            
            (cartItem.quriedItem?.amount!=quantity)&&setQuantity(cartItem.quriedItem?.amount)
        }
    },[cartItem.quriedItem?.amount])
    useEffect(()=>{
        added?
        addCartItem.mutate({
            id: id,
            type:'side dish',
            name:name,
            price:price,
            image:image,
            selectedAdditions:[],
            amount:quantity
        }):
        deleteCartItem.mutate({name:name})
    },[added])
    useEffect(()=>{
        if(cartItem.quriedItem){
            if(quantity===0){
                setAdded(false)
                setQuantity(1)
            }else{
                setUpdatedHere(true)
                updateAmount.mutate({
                    name:name,
                    amount:quantity
                })
                setUpdatedHere(false)
            }
        } else{
            setAdded(false)
            setQuantity(1)
        }
    },[quantity, cartItem.quriedItem])
  return (
    <div className='bg-slate-200 dark:bg-stone-900 dark:border-stone-600 rounded-2xl shadow-md border flex flex-col items-center p-2'>
    <div className='w-[100px] h-[100px] rounded-full top-0 -translate-y-1/2'>
        <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className='rounded-full object-cover w-full h-full'
        />
    </div>
    <p className='font-bold font-header text-xl text-header dark:text-stone-300 -translate-y-1/2'>{name}</p>
    <p className='font-bold font-header text-xl text-main -translate-y-1/2'>{quantity>0?price * quantity:price}ج</p>
    {
        added?<div className='flex'>
            <Quantity quantityChange={quantity} setQuantityChange={setQuantity} enableZero={true}/>
        </div>:  <button onClick={()=>setAdded(true)} className='bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main w-8 h-8 rounded-full flex items-center justify-center font-bold border dark:border-stone-600 hover:bg-transparent hover:text-main hover:border-main transition duration-150'>+</button>
    }
</div>
  )
}

export default FixedAddition