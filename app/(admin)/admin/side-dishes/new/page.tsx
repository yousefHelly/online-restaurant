import SideDishForm from '@/components/(Admin)/side-dishes/SideDishForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'طبق جانبي جديد',
}
function NewSideDishPage() {
  return (
    <PageHeaderWithoutLink header='طبق جانبي جديد'>
      <SideDishForm/>
    </PageHeaderWithoutLink>
  )
}

export default NewSideDishPage