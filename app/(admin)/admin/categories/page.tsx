import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import Categories from '@/components/menu/Categories'
import { getCategories } from '@/lib/api/server api calls/getCategories'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'كل التصنيفات',
}

async function AdminCategories() {
  const categroiesData = await getCategories()

  return (
    <PageHeaderWithoutLink header='كل التصنيفات'>
      <Categories admin={true} initialData={categroiesData} size={9}/>
    </PageHeaderWithoutLink>
  )
}

export default AdminCategories