'use client'
import React from 'react'
import Lottie from "lottie-react";
import loadingAnimationData from "@/animations/loading4.json";
type Props = {}

function Loading({}: Props) {
  return (
    <div className="fixed inset-0 dark:bg-stone-950/30 bg-black/30 backdrop-blur-xl z-[9999]" aria-hidden="true">
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-2xl bg-slate-200 dark:bg-stone-800 border dark:border-stone-600 p-5 dark:text-stone-400 text-lighterText font-bold'>
        جاري التحميل ...  
        <Lottie className='w-24 -mb-5'  animationData={loadingAnimationData} loop={true}/> 
        </div> 
    </div>
  )
}

export default Loading