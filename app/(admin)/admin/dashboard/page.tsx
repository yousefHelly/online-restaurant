import Dashboard from '@/components/(Admin)/dashboard/Dashboard'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'لوحة التحكم',
}
function DashboardPage() {
  return (
      <Dashboard/>
  )
}

export default DashboardPage