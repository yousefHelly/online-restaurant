import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import Chefs from '@/components/menu/Chefs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'كل الشيفات',
  }
  

function AllChefsPage() {
  return (
    <PageHeaderWithoutLink header='كل الشيفات'>
        <Chefs admin={true}/>
    </PageHeaderWithoutLink>
  )
}

export default AllChefsPage