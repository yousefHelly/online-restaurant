import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import TopDishes from '@/components/menu/TopDishes'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'كل الأطباق',
}

function AdminDishesPage() {
  return (
    <PageHeaderWithoutLink header='كل الأطباق'>
    {/* <Categories admin={true}/> */} 
    <TopDishes admin={true} filter='SD'/>
  </PageHeaderWithoutLink>
  )
}

export default AdminDishesPage