import { Disclosure } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import React from 'react'

type Props = {}

function Accordion({title, description}: {title: string, description: string}) {
  return (
    <Disclosure>
    {
        ({open})=>
            <>
            <Disclosure.Button className='py-2 rounded-t-2xl px-2 flex items-center gap-3 bg-main font-bold text-slate-50'>
                <p>
                    {title}
                </p>
                <ChevronDown  className={`transition duration-150 ${open?'rotate-180':''}`}/>
            </Disclosure.Button>
            <AnimatePresence mode='wait'>
            {
                open&&<Disclosure.Panel key={1} static >
                <motion.p initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}} className=' px-2 bg-main text-slate-50 py-2 rounded-b-2xl'>
                    {description}
                </motion.p>
            </Disclosure.Panel>
            }
            </AnimatePresence>
        </>
    }
    </Disclosure>
  )
}

export default Accordion