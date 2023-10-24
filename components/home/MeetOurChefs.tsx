import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Chefs from '../menu/Chefs'

type Props = {}
function Chief({image, name}:{image: string, name: string}){
    return(
        <div className='flex flex-col items-center justify-center gap-5'>
            <div className='h-80 w-52 '>
                <Image
                src={image}
                alt={name}
                width={600}
                height={600}
                className='w-full h-full object-cover rounded-2xl'
                />
            </div>
            <strong className='font-bold text-xl text-header text-center'>{name}</strong>
        </div>
    )
}

function MeetOurChefs({}: Props) {
  return (
    <div className='flex flex-col gap-5 w-full'>
        <div className='flex flex-col gap-3 text-center py-3'>
            <h2 className='text-3xl text-header dark:text-stone-300 font-bold py-4 leading-[4rem]'>تعرف علي شيفاتنا</h2>
            <div className='flex justify-center items-center'>
                <p className='text-sm text-lighterText leading-6'>
نحن فخورون بأن نقدم لكم شيفاتنا الموهوبين والمتميزين، الذين يعملون بجد لإعداد أشهى الأطباق لكم. لدينا شيفات من مختلف الثقافات والخلفيات، ولكل منهم قصة فريدة ومميزة.</p>
            </div>
        </div>
        <Chefs count={3}/>
        <Link href={'/menu/chefs'} className='self-center text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main'>المزيد!</Link>
    </div>
  )
}

export default MeetOurChefs