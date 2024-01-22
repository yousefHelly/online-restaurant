import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'الإعدادات',
}

type Props = {}

function SettingsPage({}: Props) {
  return (
    <PageHeaderWithoutLink header='الإعدادات'>
      الاعدادات
    </PageHeaderWithoutLink>
  )
}

export default SettingsPage