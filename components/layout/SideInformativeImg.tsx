import Image from 'next/image'
import React from 'react'
import Logo from './Logo'

type Props = {
    header: string,
    description: string
}

function SideInformativeImg({header, description}: Props) {
  return (
    <div className='col-span-4 relative'>
            <Image
            src={`https://images.unsplash.com/photo-1574936145840-28808d77a0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
            alt={header}
            width={400}
            height={800}
            className='w-full h-full object-cover rounded-r-xl'
            />
            <div className='absolute left-1/2 -translate-x-1/2 w-full top-5'>
                <Logo color='text-slate-50'/>
            </div>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-main/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-5 w-[65%] h-1/3 rounded-2xl'>
                <h4 className='text-slate-50 font-bold text-3xl '>{header}</h4>
                <p className='text-slate-200 font-bold leading-6'>{description}</p>
            </div>
        </div>
  )
}

export default SideInformativeImg