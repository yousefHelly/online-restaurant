import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import TopDishes from '@/components/menu/TopDishes'
import { getDishes } from '@/lib/api/server api calls/getDishes'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'كل الأطباق',
}

async function AdminDishesPage() {
  const dishesData = await getDishes(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'SD')

  return (
    <PageHeaderWithoutLink header='كل الأطباق'>
    {/* <Categories admin={true}/> */} 
    <TopDishes admin={true} filter='SD' initialData={dishesData}/>
  </PageHeaderWithoutLink>
  )
}

export default AdminDishesPage