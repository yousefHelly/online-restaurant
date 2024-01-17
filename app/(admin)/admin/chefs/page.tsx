import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import Chefs from '@/components/menu/Chefs'
import { getChefs } from '@/lib/api/server api calls/getChefs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'كل الشيفات',
  }
  

async function AllChefsPage() {
  const chefsData = await getChefs()
  return (
    <PageHeaderWithoutLink header='كل الشيفات'>
        <Chefs admin={true} initialData={chefsData}/>
    </PageHeaderWithoutLink>
  )
}

export default AllChefsPage