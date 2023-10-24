'use client'
import { Listbox } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    choices: {id: number, name: string, price?: string}[],
    name: string,
    setPrice: (q: number)=>void
}

function Addition({choices, name, setPrice}: Props) {
    const options = choices
    const [selectedVal, setSelectedVal] = useState(options[0])
    return(
        <div className='flex flex-col gap-3 mx-5 my-2'>
        <h4 className='font-bold font-header'>{name}</h4>
        <Listbox value={selectedVal}  onChange={(val)=>{setSelectedVal(val); val.price&&setPrice(+val.price)}}>
        {
        ({open})=>(<div className={'w-full relative'}>
        <Listbox.Button className={'flex items-center justify-between  w-full'}>
            <div className='w-full rounded-2xl border dark:border-stone-600 flex justify-between items-center px-1 cursor-pointer transition duration-150 dark:hover:bg-stone-950 hover:bg-slate-50'>
                <span className='px-2 py-1 flex items-center gap-5'>
                    {selectedVal.name}
                </span>
                <ChevronDown size={18} className={`transition duration-150 ${open&&'rotate-180'}`}/>
            </div>
            </Listbox.Button>
            <AnimatePresence mode='wait'>
            {
            open&&<Listbox.Options as={motion.ul} initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} static className='absolute top-0 translate-y-12 left-1/2 -translate-x-1/2 w-[250px] bg-slate-300/50 dark:bg-stone-800/50 backdrop-blur-md z-30 p-1 rounded-2xl'>
            <AnimatePresence mode='wait'>
            {
                options.map((option,i)=>{
                return <Listbox.Option key={i} value={option}>
                {
                    ({active})=>{
                    return <motion.span key={i} initial={{opacity:0}} animate={{opacity:1, transition:{delay:`0.${i}`} as {}}} className={`flex gap-2 items-center justify-between cursor-pointer py-2 px-4 text-sm font-bold rounded-2xl font-header ${active&&'bg-main text-slate-50 dark:text-stone-900'}`}>
                        <span className='flex items-center gap-2'>
                        {selectedVal.name===option.name&& <CheckCircle size={18} />}
                        {
                        option.name
                        }
                        </span>
                        {option.price&&<span>{option.price}ج</span>}
                    </motion.span>
                    }
                }
            </Listbox.Option>
                })
            }
                </AnimatePresence>
            </Listbox.Options>
            }
            </AnimatePresence>
        </div> )
        }
        </Listbox>
    </div>
    )
}

export default Addition