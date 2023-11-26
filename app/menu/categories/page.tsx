import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import Categories from '@/components/menu/Categories'
import React from 'react'

function CategoriesPage() {
  return (
    <main className="flex min-h-screen flex-col items-start pb-20 px-24 overflow-x-hidden">
        <PageHeaderWithoutLink header='كل التصنيفات'>
        <Categories/>
        </PageHeaderWithoutLink>
    </main>
  )
}

export default CategoriesPage