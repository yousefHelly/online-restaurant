'use client'
import Quantity from '@/components/layout/Quantity'
import { convert } from '@/lib/ConvertArabicURL'
import { ShoppingCart } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import useDish from '@/lib/api/useDish'
import Addition from '@/components/menu/Addition'
import { AddCartItem, DeleteCartItem, UpdateAmountCart, useCartItem } from '@/lib/api/useCart'
import Loading from '@/app/loading'
import DishTabs from './DishTabs'
import DishDetails from './DishDetails'

export default function DishPageContent({dishName, initialData}: {dishName: string, initialData: Dish}) {
        const arabicName = convert(dishName)
        const dish = useDish(arabicName, initialData)
        const cart = useCartItem(arabicName)
        const [price, setPrice] = useState<number>(dish?.data?.price!||0)
        const updateAmount = UpdateAmountCart()
        const updateAddition = AddCartItem()
        const deleteItem = DeleteCartItem()
        const [quantityChange, setQuantityChange] = useState<number>(cart.quriedItem?.amount || 1)
        const [selectedAdditions, setSelectedAdditions] = useState<{ id: number, val:string }[]>([])
        useEffect(()=>{
            setPrice(dish?.data.price!)
        },[dish.data?.price])
        useEffect(()=>{
            cart.quriedItem?.amount&&setQuantityChange(cart.quriedItem?.amount)
        },[cart.quriedItem])
        useEffect(()=>{
            (cart.quriedItem?.amount!=quantityChange && cart.quriedItem?.amount)&&updateAmount.mutate({name:arabicName, amount:quantityChange})
        },[quantityChange])
        useEffect(()=>{
            selectedAdditions.map((add)=>{
                if(add.val.includes('ج')){
                    const addCost = add.val.slice(add.val.indexOf('+')+1, add.val.lastIndexOf('ج'))
                    setPrice(+addCost)
                }
            })
        })
  return (
    <main className='flex min-h-screen flex-col items-start pt-5 md:pt-0 md:pb-10 px-8 md:px-24 overflow-hidden'>
    <div className='grid grid-cols-4 items-start justify-center gap-5'>
        <DishDetails dish={dish as any}/>
        <div className='col-span-full md:col-span-3 xl:col-span-1 p-1 rounded-2xl border dark:border-stone-600 dark:text-stone-300 h-fit pb-5 flex flex-col items-center relative'>
            <div className='p-2 flex flex-col gap-3 w-full'>
                {
                    (dish?.data?.mealAdditions&&dish?.data?.mealAdditions.length>0)&&dish?.data?.mealAdditions.map((addition, i)=>{
                      return(
                        <Addition dishName={arabicName} key={i} name={addition.name} choices={addition.choices} setPrice={setPrice} selectedAdditions={selectedAdditions} setSelectedAdditions={setSelectedAdditions} cart={cart.quriedItem}/>
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
                            id:dish?.data?.id!,
                            name:dish?.data?.name || arabicName,
                            price: price,
                            image:dish?.data?.image!,
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
        <DishTabs dish={dish as any}/>
    </div>
    {
        dish?.isLoading&&<Loading/>
    }
</main>
  )
}