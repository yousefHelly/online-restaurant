import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import Categories from '@/components/menu/Categories'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: 'كل التصنيفات',
}

function AdminCategories() {
  return (
    <PageHeaderWithoutLink header='كل التصنيفات'>
      <Categories admin={true}/>
    </PageHeaderWithoutLink>
  )
}

export default AdminCategories