import Chefs from '@/components/menu/Chefs'
import React from 'react'

function ChefsPage() {
  return (
    <main className="flex min-h-screen flex-col items-start pb-20 px-24 overflow-x-hidden">
    <div className='flex flex-col gap-10 w-full my-5'>
       <div className='flex justify-between items-center dark:text-stone-300'>
       <h2 className='text-3xl'>كل الشيفات</h2>
       </div>
       <Chefs />
     </div>
 </main>
  )
}

export default ChefsPage