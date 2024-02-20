import Image from 'next/image'
import React from 'react'
import Logo from './Logo'
import Card3D from './Card3D'

type Props = {
    header: string,
    description: string
}

function SideInformativeImg(props: Props) {

  return (
    <div className='hidden lg:block col-span-4 relative overflow-hidden'>
        <div className='absolute left-1/2 -translate-x-1/2 w-full top-5 z-10'>
            <Logo color='text-slate-50'/>
        </div>
        <Image
        src={`https://images.unsplash.com/photo-1574936145840-28808d77a0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
        alt={props.header}
        width={400}
        height={800}
        className='w-full h-full object-cover rounded-r-xl absolute'
        />
        <div className='w-full h-full flex items-center justify-center'>
            <Card3D {...props}/>
        </div>
    </div>
  )
}

export default SideInformativeImg