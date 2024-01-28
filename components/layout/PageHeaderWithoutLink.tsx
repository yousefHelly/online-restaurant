'use client'
import { ChevronRightCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

function PageHeaderWithoutLink({
    header,
    children
}: {
    header: string,
    children: React.ReactNode
}) {
  const router = useRouter()
  const pathname =  usePathname()
  const prevPage = useMemo(()=>pathname.slice(0, pathname.lastIndexOf('/')) === '/admin' ? '/admin/dashboard' : pathname.includes('/checkout') ? '/cart' :  pathname.slice(0, pathname.lastIndexOf('/')) , [pathname]) 
  return (
    <div className='flex flex-col gap-10 w-full my-5'>
    <div className='flex justify-start gap-2 items-center dark:text-stone-300'>
      <ChevronRightCircle onClick={()=>router.push(prevPage == ""? "/" : prevPage)} size={28} className='mt-2 text-lighterText cursor-pointer transition duration-150 hover:text-main '/>
      <h2 className='text-3xl'>{header}</h2>
    </div>
    {
        children
    }
  </div>
  )
}

export default PageHeaderWithoutLink