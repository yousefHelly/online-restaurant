import Link from 'next/link'
import React from 'react'
import Chefs from '../menu/Chefs'
import { getChefs } from '@/lib/api/server api calls/getChefs'

type Props = {}

async function MeetOurChefs({}: Props) {
  const chefsData = await getChefs()
  return (
    <div className='flex flex-col gap-5 w-full'>
        <div className='flex flex-col gap-3 text-center py-3'>
            <h2 className='text-3xl text-header dark:text-stone-300 font-bold py-4 leading-[4rem]'>تعرف علي شيفاتنا</h2>
            <div className='flex justify-center items-center'>
                <p className='text-sm text-lighterText leading-6'>
نحن فخورون بأن نقدم لكم شيفاتنا الموهوبين والمتميزين، الذين يعملون بجد لإعداد أشهى الأطباق لكم. لدينا شيفات من مختلف الثقافات والخلفيات، ولكل منهم قصة فريدة ومميزة.</p>
            </div>
        </div>
        <Chefs showSlider={true} initialData={chefsData}/>
        <Link href={'/menu/chefs'} className='self-center text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main'>المزيد!</Link>
    </div>
  )
}

export default MeetOurChefs