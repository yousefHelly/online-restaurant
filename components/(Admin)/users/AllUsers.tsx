'use client'
import useUsers from '@/lib/api/useUsers'
import React from 'react'
import { Table } from '@mantine/core'
import { Search } from 'lucide-react'
import UserItem from './UserItem'
import { useSearchParams } from 'next/navigation'
import PaginationProvider from '@/lib/PaginationProvider'

type Props = {
    initialData: {users:User[]}&WithPagination,
    size?: number
}

function AllUsers({initialData, size}: Props) {
  const {get} = useSearchParams()
    const users = useUsers(initialData, parseInt(get('page') || '1'), size)
    return (
      <PaginationProvider totalPages={users.data?.numOfPages || 1} showPagination={users.data&&users?.data?.users.length>0}>
        <div className='flex flex-col gap-5'>
            <div className='w-full self-center flex items-center justify-center'>
                <input type="search" placeholder='إبحث عن الأعضاء...' className='border dark:border-stone-600 dark:text-stone-300 px-3 w-1/3 py-2 rounded-r-md focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none' />
                <div className='bg-main/90 dark:bg-main text-slate-50 px-3 py-2 rounded-l-md border dark:border-stone-600 cursor-pointer hover:bg-main dark:hover:bg-main/90 transition duration-150'>
                    <Search/>
                </div>
            </div>
        <Table highlightOnHover withTableBorder withColumnBorders  verticalSpacing="md">
              <Table.Thead className='sticky top-[-25px] z-[100] bg-main/75 text-slate-50 font-bold backdrop-blur-md h-[50px]'>
                <Table.Tr className='dark:border-stone-600'>
                  <Table.Th className='dark:text-stone-300'>صورة العضو</Table.Th>
                  <Table.Th className='dark:text-stone-300'>اسم العضو</Table.Th>
                  <Table.Th className='dark:text-stone-300'>دور العضو</Table.Th>
                  <Table.Th className='dark:text-stone-300'>تعديل الدور</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {
                    users?.data?.users?.map((u)=><UserItem key={u.userId} userData={u}/>)
                }
              </Table.Tbody>
        </Table>
        </div>
      </PaginationProvider>
  )
}

export default AllUsers