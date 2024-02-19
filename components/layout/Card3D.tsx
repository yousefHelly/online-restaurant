'use client'
import React from 'react'
import { motion ,useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
    header: string,
    description: string
}

function Card3D({header, description}: Props) {
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
    <motion.div style={{transformStyle:'preserve-3d', rotateX, rotateY, scaleX, scaleY}} className='self-center w-[75%] h-[50%] px-4 overflow-hidden flex items-center justify-center border border-main bg-main/10 backdrop-blur-sm  rounded-2xl'>
        <div onMouseMove={(e)=>handleMove(e)} style={{transformStyle:'preserve-3d',transform:'translateZ(75px)'}} className='bg-main/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-5 w-[85%] h-[75%] rounded-2xl shadow-2xl'>
            <h4 style={{transformStyle:'preserve-3d',transform:'translateZ(50px)'}} className='text-slate-50 font-bold text-3xl '>{header}</h4>
            <p style={{transformStyle:'preserve-3d',transform:'translateZ(25px)'}} className='text-slate-200 font-bold leading-6'>{description}</p>
        </div>
    </motion.div>
  )
}

export default Card3D