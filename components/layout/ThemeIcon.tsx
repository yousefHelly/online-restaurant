import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import React from 'react'

type Props = {
    mobile?: boolean
    darkMode: boolean,
    topScreen: boolean,
    setDarkMode: (val: boolean)=>void
}

function ThemeIcon({mobile= false, darkMode, topScreen, setDarkMode}: Props) {
  return (
    <AnimatePresence mode='wait'>      
    {
            darkMode?
            <motion.button key={'dark'} initial={{x:15, skew:'-10deg'}} animate={{x:0, skew:'0deg'}} exit={{x:15, skew:'-5deg'}} transition={{ damping:50 }} className='flex items-center focus-within:outline-none' onClick={()=>setDarkMode(false)}>
                    <Moon className={!mobile?`text-lighterText font-bold transition duration-150 hover:text-main cursor-pointer`:`${!topScreen?'text-stone-600 dark:text-main':'text-main'} font-bold transition duration-150 cursor-pointer`}/>
            </motion.button>:
            <motion.button key={'light'} initial={{x:-15, skew:'10deg'}} animate={{x:0, skew:0}} exit={{x:-15, skew:'5deg'}} transition={{ damping:50 }} className='flex items-center focus-within:outline-none' onClick={()=>setDarkMode(true)}>
            <Sun className={!mobile?`text-lighterText font-bold transition duration-150 hover:text-main cursor-pointer`:`${!topScreen?'text-stone-600 dark:text-main':'text-main'} font-bold transition duration-150 cursor-pointer`}/>
            </motion.button>   
    }          
    </AnimatePresence>
  )
}

export default ThemeIcon