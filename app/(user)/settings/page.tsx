import AccountSettings from '@/components/(User)/settings/AccountSettings'
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
      <div className='min-h-[26vh]'>
        <AccountSettings/>
      </div>
    </PageHeaderWithoutLink>
  )
}

export default SettingsPage