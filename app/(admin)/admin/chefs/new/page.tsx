import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'جو فاست فوود | شيف جديد',
  }

function NewChefPage() {
  return (
    <PageHeaderWithoutLink header='شيف جديد'>
    </PageHeaderWithoutLink>
  )
}

export default NewChefPage