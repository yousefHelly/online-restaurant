import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import React from 'react'
import { Metadata } from "next"
import UserOrders from '@/components/(User)/my-orders/UserOrders'

export const metadata: Metadata = {
  title: 'كل الطلبيات',
}
type Props = {}

async function MyOrdersPage({}: Props) {    
  return (
    <PageHeaderWithoutLink header='كل الطلبيات'>
      <UserOrders/>
    </PageHeaderWithoutLink>
  )
}

export default MyOrdersPage