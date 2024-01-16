import ChefForm from '@/components/(Admin)/chefs/ChefForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'شيف جديد',
  }

function NewChefPage() {
  return (
    <PageHeaderWithoutLink header='شيف جديد'>
      <ChefForm/>
    </PageHeaderWithoutLink>
  )
}

export default NewChefPage