'use client'
import LoadingErrorFetching from '@/components/layout/LoadingErrorFetching'
import useFixedAdditions from '@/lib/api/UseFixedAdditions'
import React from 'react'
import { PlusSquare } from 'lucide-react'
import AdminSideDish from './AdminSideDish'
import Link from 'next/link'
import PaginationProvider from '@/lib/PaginationProvider'
import { useSearchParams } from 'next/navigation'

function AllSideDishes({initialData, size}:{initialData?: {additions:FixedAddition[]}&WithPagination, size?: number}) {
  const {get} = useSearchParams()
  const { data, isLoading, isError } = useFixedAdditions(initialData, parseInt(get('page') || '1'), size)
  return (
    <>
    <LoadingErrorFetching data={data} isLoading={isLoading} isError={isError} name='أطباق جانبية'/>
    <PaginationProvider totalPages={data?.numOfPages || 1} showPagination={data&&data?.additions.length>0}>
      <div className='grid grid-cols-4 gap-12 py-10'>
      {
          !isLoading&& <Link href={'/admin/side-dishes/new'} className='bg-slate-200 dark:text-stone-300 dark:hover:text-main dark:bg-main/20 dark:hover:bg-transparent rounded-2xl shadow-md border dark:border-none flex gap-3 flex-col justify-center items-center pt-2 min-h-[150px] hover:bg-main/25 transition duration-150'>
              <PlusSquare size={28}/>
              <p className='text-xl font-bold font-header'>طبق جانبي جديد</p>
            </Link>
      }
        {
          data?.additions.map((sideDish)=>{
            return <AdminSideDish key={sideDish.id} id={sideDish.id} name={sideDish.name} image={sideDish.additionUrl} price={sideDish.price}/>
          })
        }
      </div>
    </PaginationProvider>
    </>
  )
}

export default AllSideDishes