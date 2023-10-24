'use client'
import React from 'react'
import {ChefHat} from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion';
import Link from 'next/link';
type Props = {}

function Landing({}: Props) {
  return (
    <div  
    className='flex flex-col-reverse xl:flex-row justify-center items-center relative z-0 after:absolute after:bg-waves after:-left-[8.2rem] after:-bottom-32 after:-z-10 after:w-[16rem] after:h-[17rem] after:rotate-180'
    >
        <motion.div
        initial={{
          opacity:'0',
          translateX:'10%'
        }}
        whileInView={{
          opacity:'1',
          translateX:'0%'
          }
        }
        transition={{
          delay:0.3,
          duration:0.5,
          staggerChildren:0.2
        }}
        viewport={{
          once:true,
          amount:0.5
        }}
        className='basis-1/2 flex flex-col gap-5 items-center xl:items-start'
        >
            <motion.h1 initial={{translateX:'2%', opacity:'0'}} animate={{translateX:'0%',opacity:'1', transition:{delay:0.5, duration:0.3}}} className='text-4xl md:text-5xl text-header dark:text-stone-300 text-center xl:text-start font-bold py-4 leading-[4rem]'> أفضل الأصناف لتناسب ذوقك المميز</motion.h1>
            <motion.p initial={{translateX:'2%', opacity:'0'}} animate={{translateX:'0%',opacity:'1', transition:{delay:0.8, duration:0.3}}} className='text-center md:text-start text-sm text-lighterText leading-6'>
            مرحبًا بك في مطعمنا الإلكتروني ، حيث نقدم لك أشهى الأطباق من جميع أنحاء العالم.  سواء كنت تبحث عن وجبة سريعة أو عشاء رومانسي أو احتفال خاص ، لدينا ما تحتاجه.  يمكنك تصفح قائمتنا المتنوعة والمتجددة ، والتي تشمل المأكولات العربية والإيطالية والهندية والصينية وغيرها الكثير.  يمكنك أيضًا الاستمتاع بخدمة التوصيل المجانية والدفع الآمن عبر الإنترنت .
            </motion.p>
            <motion.div  initial={{translateX:'2%', opacity:'0'}} animate={{translateX:'0%',opacity:'1', transition:{delay:1.1, duration:0.3}}}className='flex justify-center items-center gap-5'>
            <Link href={`/menu/chefs`} className='flex gap-1 items-center text-main font-bold px-3 py-2 rounded-2xl transition duration-150 border border-transparent hover:border-main '>الشيفات
            <ChefHat /></Link>
            <Link href={'/menu/all-dishes'} className='text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main'>تصفح أطباقنا !
            </Link>
            </motion.div>
        </motion.div>
        <motion.div
          initial={{
            opacity:'0',
            translateX:'-10%'
          }}
          whileInView={{
            opacity:'1',
            translateX:'0%'
            }
          }
          transition={{
            duration:0.5
          }}
          viewport={{
            once:true,
            amount:0.5
          }}
          className='basis-1/2 flex items-center justify-center xl:justify-end xl:ml-12 -z-10'
        >
            <Image
            src={'/static/landing.webp'}
            alt='اطباقنا'
            width={400}
            height={400}
            className='w-[250px] h-[250px] xl:w-[400px] xl:h-[400px]'
            />
        </motion.div>
    </div>
  )
}

export default Landing