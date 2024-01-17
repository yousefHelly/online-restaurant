import DishForm from '@/components/(Admin)/dishes/DishForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'طبق جديد',
}

function NewDishPage() {
  return (
    <PageHeaderWithoutLink header='طبق جديد'>
      <DishForm/>
  </PageHeaderWithoutLink>
  )
}

export default NewDishPage