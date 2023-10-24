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
                    {price * quantityChange} ج
                </div>
            }
            <div className='flex items-center gap-2 text-xs'>
                <PlusCircle className={`cursor-pointer`} onClick={()=>{setQuantityChange(quantityChange+1);action}}/>
                {quantityChange}
                <MinusCircle className={((!enableZero && quantityChange-1!=0)||(enableZero))?'cursor-pointer':'cursor-not-allowed text-lighterText'} onClick={()=>{((!enableZero && quantityChange-1!=0)||(enableZero))&&setQuantityChange(quantityChange-1); action;}}/>
            </div>
        </div>
  )
}

export default Quantity