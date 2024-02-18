'use client'
import React from 'react'
import { LazyMotion, m, domAnimation, useScroll, useTransform } from 'framer-motion';

type Props = {}

function LandingVideo({}: Props) {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 0.08], ['0vh', '25vh'])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
      return (
        <LazyMotion features={domAnimation}>
        <m.div style={{y, scale}} className='absolute inset-0 w-full h-[108vh] lg:h-full -z-10 after:block after:absolute after:inset-0 after:w-full after:h-full after:bg-stone-950/75'>
            <video src="/static/landing.mp4" autoPlay muted loop poster='/static/landing-poster.png' className="w-full h-full object-cover"></video>
        </m.div>
        </LazyMotion>
      )
}

export default LandingVideo