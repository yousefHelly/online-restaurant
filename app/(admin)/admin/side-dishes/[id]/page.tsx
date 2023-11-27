import SideDishForm from '@/components/(Admin)/side-dishes/SideDishForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'جو فاست فوود | تعديل طبق جانبي',
}

type Props = {
  params:{
      id: string
  }
}

function UpdateSideDishPage({params:{id}}: Props) {
  return (
    <PageHeaderWithoutLink header='تعديل طبق جانبي'>
      <SideDishForm id={id}/>
    </PageHeaderWithoutLink>
  )
}

export default UpdateSideDishPage