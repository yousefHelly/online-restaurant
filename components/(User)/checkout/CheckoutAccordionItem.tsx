import React, { Children, useState } from 'react'
import {Accordion} from '@mantine/core'
import { RadioGroup } from '@headlessui/react';
import { AlertCircle, CheckCircleIcon } from 'lucide-react';

type Props = {
    children: React.ReactNode,
    name: string
}
function CheckoutAccordionItem({name ,children}: Props) {
  return (
    <Accordion.Item key={name} value={name}>
        {
            children
        }
    </Accordion.Item>
  )
}
CheckoutAccordionItem.displayName = 'CheckoutAccordionItem'

CheckoutAccordionItem.Header = function Header({stepIsDone, children}:{stepIsDone:boolean, children:React.ReactNode}){
    return <div className='flex items-center justify-start gap-3'>
    {stepIsDone?<CheckCircleIcon className='pt-1 text-main' size={31}/>:<AlertCircle className='pt-1 text-main' size={31}/>}
    <div className='flex flex-col gap-1 justify-start items-start py-3'>
        {
            children
        }
    </div>
    </div>
}
CheckoutAccordionItem.HeaderBeforeSelection = function HeaderBeforeSelection({children}:{children:React.ReactNode}){
    return <p className={`font-bold text-xl font-header pt-2 'text-header dark:text-stone-300`}>{children}</p>
}

CheckoutAccordionItem.HeaderAfterSelection = function HeaderAfterSelection({children}:{children:React.ReactNode}){
    return <p className='font-extrabold text-xl font-header dark:text-stone-300'>{children}</p>
}

CheckoutAccordionItem.CurrentState = function CurrentState({children}:{children:React.ReactNode}){
    return <span className='text-lighterText dark:text-stone-400 text-sm font-bold'>{children}</span>
}

CheckoutAccordionItem.PanelSkeleton = function PanelSkeleton({action, children}:{action: string, children:React.ReactNode}){
    return <div className='w-full flex flex-col justify-start items-start gap-3 px-8'>
        <p className='text-md font-bold font-header'>{action}</p>
        {
            children
        }
    </div>
}

export default CheckoutAccordionItem