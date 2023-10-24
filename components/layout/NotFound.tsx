import Image from 'next/image'
import React from 'react'


function NotFound({name}: {name: string}) {
  return (
    <div className='col-span-full flex flex-col items-center w-full justify-center gap-5 font-bold font-header dark:text-stone-300'>لا توجد {name}<Image src={`/static/not-found.png`} alt={`لا توجد ${name}`} width={100} height={100}/></div>
  )
}

export default NotFound