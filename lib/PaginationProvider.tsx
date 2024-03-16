'use client'
import NotFound from '@/components/layout/NotFound'
import { Pagination } from '@mantine/core'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {
  totalPages: number,
  showPagination?: boolean | undefined,
  children: React.ReactNode
}

function PaginationProvider({totalPages, showPagination, children}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
    
          return params.toString()
        },
        [searchParams]
      )
      const [current,setCurrent] = useState(parseInt(searchParams.get('page') || '1'))
      useEffect(()=>{
        setCurrent(parseInt(searchParams.get('page') || '1'))
      }, [searchParams.get('page')])
  return (
    <>
        {children}
        {
          showPagination?        
          <div className='col-span-full w-max mx-auto mt-5'>
            <Pagination total={totalPages}  color="#ffa006" defaultValue={current} onChange={(p)=>router.push(pathname + '?' + createQueryString('page', `${p}`))}  classNames={{control:'data-[active]:!bg-main'}}/>
          </div>:<NotFound name='بيانات'/>
        }
    </>
  )
}

export default PaginationProvider