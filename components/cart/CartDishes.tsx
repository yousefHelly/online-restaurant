'use client'
import useCart from '@/lib/api/useCart'
import React from 'react'
import ItemCart from '../layout/ItemCart'
import NotFound from '../layout/NotFound'

type Props = {}

function CartDishes({}: Props) {
    const cart = useCart()
  return (
    <div className='col-span-3 flex flex-col'>
    <div className='border-b dark:border-stone-600 py-3 text-xl font-bold font-header text-header dark:text-stone-300'>
      سلة التسوق 
    </div>
    {
      cart.data&&cart.data.length>0?cart.data.map((cartItem)=>{
        return(
            <ItemCart key={cartItem.name} page='cart' image={'https://localhost:7166'+cartItem.mealImgUrl} name={cartItem.name} totalPrice={cartItem.totalPrice} status={cartItem.additions} quantity={cartItem.amount}/>
        )
      }):!cart.isLoading&&<NotFound name='أطباق ، أضف بعضاً منها'/>
    }
  </div>
  )
}

export default CartDishes