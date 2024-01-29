import AllUsers from '@/components/(Admin)/users/AllUsers'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { getUsers } from '@/lib/api/server api calls/getUsers'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
    title: 'كل الأعضاء',
}

async function AdminUsersPage() {
    const usersData = await getUsers()
    if(!usersData){
        return notFound()
    }
  return (
    <PageHeaderWithoutLink header='كل الأعضاء'>
        <AllUsers initialData={usersData}/>
  </PageHeaderWithoutLink>
  )
}

export default AdminUsersPage