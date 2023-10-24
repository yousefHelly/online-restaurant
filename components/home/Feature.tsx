'use client'
import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Grip } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
    heading:string, 
    desc:string, 
    image: string, 
    action:string, 
    dir:'r' | 'l', 
    alt?:string,
    link: string
}

function Feature({heading, desc, image, alt, dir, action, link}: Props) {
    const router = useRouter()
  return (
    <motion.div initial={{opacity:0, x:dir==='l'?'-25':'25'}} whileInView={{opacity:1, x:0, transition:{duration:0.5}}} viewport={{once:true, amount:0.45}} className={`flex my-8 flex-col-reverse gap-5 lg:flex-row justify-center lg:justify-between items-center ${dir==='l'&& 'lg:flex-row-reverse'}`}>
        <div className='flex-1 flex flex-col items-center lg:items-start gap-3'>
            <h3 className='text-2xl text-header dark:text-stone-300 font-bold py-1 xl:leading-[4rem]'>{heading}</h3>
            <p className='text-center lg:text-start text-sm text-lighterText leading-6'>{desc}</p>
            <button onClick={()=>router.push(link)} className='lg:self-start text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main'>{action}</button>
        </div>
        <div className={`flex-1 flex max-h-[250px] relative ${dir==='r'?'justify-end':'justify-start'}`}>
            <Image
            src={image}
            alt= {alt || ''}
            width={400}
            height={250}
            className='rounded-2xl object-cover shadow-md'
            />
            <Grip className={`absolute -z-10 ${dir==='r'?'-bottom-16 -left-16':'-top-16 -right-16'}`} size={124} color="#ffa006" />
        </div>
    </motion.div>
  )
}

export default Feature