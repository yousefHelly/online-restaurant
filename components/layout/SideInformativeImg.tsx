'use client'
import Image from 'next/image'
import React from 'react'
import Logo from './Logo'
import { motion ,useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
    header: string,
    description: string
}

function SideInformativeImg({header, description}: Props) {
    const X = useMotionValue(0)
    const Y = useMotionValue(0)
    const XSpring = useSpring(X)
    const YSpring = useSpring(Y)
    const rotateX = useTransform(XSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg'])
    const scaleX = useTransform(XSpring, [-0.5, 0.5], ['0.95', '1.01'])
    const rotateY = useTransform(YSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg'])
    const scaleY = useTransform(YSpring, [-0.5, 0.5], ['0.95', '1.01'])

    const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const rect:{
            height: number
            left: number
            top: number
            width: number} = (e.target as any).getBoundingClientRect();
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPer = (mouseX / width) - 0.5
        const yPer = (mouseY / height) - 0.5
        X.set(xPer)
        Y.set(yPer)
        
    }
  return (
    <div className='col-span-4 relative overflow-hidden'>
        <div className='absolute left-1/2 -translate-x-1/2 w-full top-5 z-10'>
            <Logo color='text-slate-50'/>
        </div>
        <Image
        src={`https://images.unsplash.com/photo-1574936145840-28808d77a0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
        alt={header}
        width={400}
        height={800}
        className='w-full h-full object-cover rounded-r-xl absolute'
        />
        <div className='w-full h-full flex items-center justify-center'>
            <motion.div style={{transformStyle:'preserve-3d', rotateX, rotateY, scaleX, scaleY}} className='self-center w-[75%] h-[50%] px-4 overflow-hidden flex items-center justify-center border border-main bg-main/10 backdrop-blur-sm  rounded-2xl'>
                <div onMouseMove={(e)=>handleMove(e)} style={{transformStyle:'preserve-3d',transform:'translateZ(75px)'}} className='bg-main/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-5 w-[85%] h-[75%] rounded-2xl shadow-2xl'>
                    <h4 style={{transformStyle:'preserve-3d',transform:'translateZ(50px)'}} className='text-slate-50 font-bold text-3xl '>{header}</h4>
                    <p style={{transformStyle:'preserve-3d',transform:'translateZ(25px)'}} className='text-slate-200 font-bold leading-6'>{description}</p>
                </div>
            </motion.div>
        </div>
    </div>
  )
}

export default SideInformativeImg