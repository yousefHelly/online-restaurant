import CategoryForm from '@/components/(Admin)/categories/CategoryForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'تصنيف جديد',
}

function NewCategoryPage() {
  return (
    <PageHeaderWithoutLink header='تصنيف جديد'>
      <CategoryForm/>
    </PageHeaderWithoutLink>
  )
}

export default NewCategoryPage