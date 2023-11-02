'use client'
import { useElementSize } from '@mantine/hooks'
import {motion} from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'

type Props = {}
const branches = [
  {
  img:'/static/branches/branch-1.webp',
  link:'https://maps.app.goo.gl/TMj9QPFJ8mVEH6nP8',
  name:'8 شارع حسن محمد ، الهرم ، الجيزة'
  },
  {
  img:'/static/branches/branch-2.webp',
  link:'https://maps.app.goo.gl/TMj9QPFJ8mVEH6nP8',
  name:'شارع العشرين ، فيصل ، الجيزة'
  },
  {
  img:'/static/branches/branch-3.webp',
  link:'https://maps.app.goo.gl/TMj9QPFJ8mVEH6nP8',
  name:'امام محطة مترو حلوان ، حلوان ، القاهرة'
  },
  {
  img:'/static/branches/branch-4.webp',
  link:'https://maps.app.goo.gl/TMj9QPFJ8mVEH6nP8',
  name:'شارع احمد حلمي ، شبرا ، القاهرة'
  },    
  {
  img:'/static/branches/branch-5.webp',
  link:'https://maps.app.goo.gl/TMj9QPFJ8mVEH6nP8',
  name:'امام باب اللوق ، التحرير ، القاهرة'
  },
  {
  img:'/static/branches/branch-6.webp',
  link:'https://maps.app.goo.gl/TMj9QPFJ8mVEH6nP8',
  name:'امام الكورنيش  ، سموحة ، اسكندرية'
  },
]

function OurBranches({}: Props) {
  const imgContainer = useRef<HTMLInputElement | null>(null)
  const { ref, width, height } = useElementSize();
  const [branch, setBranch] = useState<string>('/static/branches/branch-1.webp')
  useEffect(
    ()=>{
       gsap.registerPlugin(ScrollTrigger)
  //     gsap.to('.img-containe', {
  //       scrollTrigger:{
          
  //       }
  //     })
  // },[])
  gsap.to(imgContainer.current,{
     y:`375px`,
    duration: 2,
    scrollTrigger:{
      trigger:imgContainer.current,
      start:'+=100px center',
      end:()=>`+=425px`,
      scrub:3,
      toggleActions: "none stop play restart",
    }
  })
},[])
  
  return (
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex flex-col gap-3 text-center py-3'>
            <h2 className='text-3xl text-header dark:text-stone-300 font-bold py-4 leading-[4rem]'>فروعنا</h2>
            <div ref={ref} className='branch-container grid grid-cols-4'>
            <div className='col-span-3 flex flex-col justify-start gap-10'>
            {
                  branches.map((branch, i)=>{
                    return (
                      <motion.div initial={{x:150, opacity:0}} whileInView={{x:0, opacity:1, transition:{duration:`.75` as any, delay:`0.${i}` as any, stiffness:50, type:'spring'}}} viewport={{once:true, amount:0.45}} key={`${branch}-${i}`} className={`border-b dark:border-stone-600 gap-3 z-[21] py-4 w-full my-2`}>
                        <a target='_parent' href={branch.link} onMouseOver={()=>setBranch(branch.img)} className='flex items-center gap-3' style={{marginRight:`${i}rem`}}>
                          <MapPin className='fill-main text-slate-50 dark:text-stone-800' size={30}/>
                          <span className='text-header dark:text-stone-300 font-bold font-header text-3xl  cursor-pointer hover:!text-main transition duration-150'>
                            {
                              branch.name
                            }
                          </span>
                        </a>
                    </motion.div>
                    )
                  })
                }

            </div>
            <div ref={imgContainer} className='img-container flex items-start h-[325px] z-20 relative'>
                <Image
                src={branch}
                alt={`img-1`}
                width={500}
                height={500}
                className='rounded-2xl object-cover w-full h-full'
                />
              </div>
            </div>
        </div>
      </div>
  )
}

export default OurBranches