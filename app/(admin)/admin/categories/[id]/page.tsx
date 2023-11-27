import CategoryForm from '@/components/(Admin)/categories/CategoryForm'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'جو فاست فوود | تعديل تصنيف',
}
type Props = {
    params:{
        id: string
    }
}
function UpdateCategoryPage({params:{id}}:Props) {
  return (
    <PageHeaderWithoutLink header={'تعديل تصنيف'}>
      <CategoryForm id={id}/>
    </PageHeaderWithoutLink>
  )
}

export default UpdateCategoryPage