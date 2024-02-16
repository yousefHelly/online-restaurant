'use client'
import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import React from 'react'
import { QueryClient } from 'react-query';

type Props = {}

export default function FilterAccordion({name, children, open, selectedCount, setFilterArray, queryClient}:{name: string,children: React.ReactNode, open?: boolean, selectedCount?: number, setFilterArray: any, queryClient: QueryClient}){
    return(
      <Disclosure defaultOpen={open || false}>
      {
          ({open})=>
              <>
              <div className={`flex items-center px-4  ${open?'bg-slate-100 dark:bg-stone-800':'border-b dark:border-stone-600'}`}>
                <Disclosure.Button className={`py-4 flex items-center justify-between w-full gap-3`}>
                    <p className='flex-1 flex items-center gap-3 justify-start'>
                      <ChevronDown size={16}  className={`transition duration-150 dark:text-stone-400 ${open?'rotate-180':''}`}/>
                      <span className='font-bold dark:text-stone-400'>{name}</span>
                      {(selectedCount && selectedCount>=1)&&<span className='rounded-full py-1 px-1 w-6 h-6 text-sm text-slate-50 dark:text-stone-400 dark:bg-stone-700 dark:border dark:border-main bg-main flex items-center justify-center'>{selectedCount}</span>}
                    </p>
                </Disclosure.Button>
                <span>
                  <X size={16} className='hover:text-main transition dark:text-stone-400 duration-150 cursor-pointer' onClick={()=>{setFilterArray();queryClient.removeQueries(['dishes']);}}/>
                </span>
              </div>
              <AnimatePresence mode='wait'>
              {
                  open&&<Disclosure.Panel key={1} static >
                  <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height:0}} className='px-2 bg-slate-100 dark:bg-stone-800 py-2 '>
                    {
                      children
                    }
                  </motion.div>
              </Disclosure.Panel>
              }
              </AnimatePresence>
          </>
      }
    </Disclosure>
    )
}