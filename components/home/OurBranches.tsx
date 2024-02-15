'use client'
import { useElementSize } from '@mantine/hooks'
import Lenis from '@studio-freight/lenis';
import {motion, useScroll, useTransform} from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MapPin, Pointer } from 'lucide-react'
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
  const container = useRef<HTMLInputElement | null>(null)
  const [branch, setBranch] = useState<string>('/static/branches/branch-1.webp')
  const {scrollYProgress} = useScroll({
    target:container,
    offset:['start start', 'end center']
  })
  const y = useTransform(scrollYProgress, [0,1], [0, 300]) 
  useLayoutEffect(
    ()=>{
      //   const lenis = new Lenis()
      //   gsap.registerPlugin(ScrollTrigger)
      //   lenis.on('scroll', ScrollTrigger.update)
      //   gsap.ticker.add((time)=>{
      //     lenis.raf(time * 1000)
      //   })
      //   gsap.ticker.lagSmoothing(0) 
      //   const ctx = gsap.context(()=>{
      //     gsap.to(imgContainer.current,{
      //       y:`300px`,
      //       duration: 2,
      //       scrollTrigger:{
      //         trigger:'.branch-container',
      //         start:`+=150px center`,
      //         end:`+=650px`,
      //         scrub:3,
      //       }
      //     })
      //   }, container!)
      // return ()=>ctx.revert()
    
    },[container])
    const [currentBranch, setCurrentBranch] = useState(branches[0].name)
  return (
      <div ref={container} className='flex flex-col gap-5 w-full my-10'>
        <div className='flex flex-col gap-3 text-center py-3'>
            <h2 className='text-3xl text-header dark:text-stone-300 font-bold py-4 leading-[4rem]'>فروعنا</h2>
            <div className='branch-container grid grid-cols-4'>
            <div className='col-span-full lg:col-span-3 flex flex-col justify-start'>
            {
                  branches.map((branch, i)=>{
                    return (
                        <motion.div onMouseEnter={()=>setCurrentBranch(branch.name)}  onMouseOver={()=>setBranch(branch.img)} onMouseLeave={()=>setCurrentBranch(branches[0].name)} initial={{x:150, opacity:0}} whileInView={{x:0, opacity:1, transition:{duration:`.75` as any, delay:`0.${i}` as any, stiffness:50, type:'spring'}}} viewport={{once:true, amount:0.45}} key={`${branch}-${i}`} className={`border-b dark:border-stone-600 gap-3 z-[21] py-6 pb-8 w-full flex items-center justify-between relative`}>
                          <a target='_parent' href={branch.link} className='flex items-center gap-3' style={{marginRight:`${i}rem`}}>
                            <MapPin className='fill-main text-slate-50 dark:text-stone-800' size={30}/>
                            <span className='text-header dark:text-stone-300 font-bold font-header texl-xl md:text-3xl cursor-pointer hover:!text-main transition duration-150'>
                              {
                                branch.name
                              }
                            </span>
                          </a>
                          {branch.name===currentBranch&&
                          <motion.span
                          className='absolute left-0 md:left-5 top-1/2 -translate-y-1/2'
                          layoutId='branch'
                          transition={{
                                    type:'spring',
                                    bounce:0.25,
                                    stiffness:130,
                                    damping:9,
                                    duration:0.3
                          }}
                        >
                          <Pointer className='rotate-90 text-main'/>
                        </motion.span>}
                      </motion.div>
                    )
                  })
                }

            </div>
            <motion.div style={{y}} transition={{duration:4,stiffness:5, ease:'cubic-bezier(0.33, 1, 0.68, 1)'}} ref={imgContainer} className='hidden lg:flex img-container items-start h-[325px] z-20 relative'>
                <Image
                src={branch}
                alt={`img-1`}
                width={500}
                height={500}
                className='rounded-2xl object-cover w-full h-full'
                />
              </motion.div>
            </div>
        </div>
      </div>
  )
}

export default OurBranches