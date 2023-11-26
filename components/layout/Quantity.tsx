'use client'
import { MinusCircle, PlusCircle } from 'lucide-react'
import React from 'react'

type Props = {
    quantityChange: number,
    price?: number,
    page?:'cart'|'nav',
    setQuantityChange: (q: number)=>void
    action?: ()=>void,
    enableZero?: boolean
}

function Quantity({quantityChange, price, setQuantityChange, page, action, enableZero= false}: Props) {
  return (
    <div className='flex items-center justify-between'>
            {price&&
                <div className={`text-main font-bold ${page==='cart'?'text-lg py-1':''}`}>
                    {price} ج
                </div>
            }
            <div className='flex items-center gap-2 text-xs dark:text-stone-300'>
                <PlusCircle className={`cursor-pointer dark:text-stone-300`} onClick={()=>{setQuantityChange(quantityChange+1);action}}/>
                {quantityChange}
                <MinusCircle className={((!enableZero && quantityChange-1!=0)||(enableZero))?'cursor-pointer dark:text-stone-300':'cursor-not-allowed text-lighterText dark:text-stone-400'} onClick={()=>{((!enableZero && quantityChange-1!=0)||(enableZero))&&setQuantityChange(quantityChange-1); action;}}/>
            </div>
        </div>
  )
}

export default Quantity