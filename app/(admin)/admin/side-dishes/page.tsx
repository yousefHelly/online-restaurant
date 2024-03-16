import React from 'react'
import PageHeaderWithoutLink  from '@/components/layout/PageHeaderWithoutLink';
import { Metadata } from 'next';
import AllSideDishes from '@/components/(Admin)/side-dishes/AllSideDishes';
import { getFixedAdditions } from '@/lib/api/server api calls/getFixedAdditions';

export const metadata: Metadata = {
  title: 'كل الأطباق الجانبية',
}

async function AllSideDishesPage() {
  const sideDishesData = await getFixedAdditions()
  return (
    <PageHeaderWithoutLink header='كل الأطباق الجانبية'>
      <AllSideDishes initialData={sideDishesData} size={7}/>
    </PageHeaderWithoutLink>
  )
}

export default AllSideDishesPage