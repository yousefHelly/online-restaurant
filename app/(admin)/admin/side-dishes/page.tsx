import React from 'react'
import PageHeaderWithoutLink  from '@/components/layout/PageHeaderWithoutLink';
import { Metadata } from 'next';
import AllSideDishes from '@/components/(Admin)/side-dishes/AllSideDishes';

export const metadata: Metadata = {
  title: 'جو فاست فوود | كل الأطباق الجانبية',
}

function AllSideDishesPage() {
  return (
    <PageHeaderWithoutLink header='كل الأطباق الجانبية'>
      {/* <Categories admin={true}/> */} 
      <AllSideDishes/>
    </PageHeaderWithoutLink>
  )
}

export default AllSideDishesPage