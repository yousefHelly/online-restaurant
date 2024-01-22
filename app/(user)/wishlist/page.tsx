import FavouriteDishes from '@/components/(User)/wishlist/FavouriteDishes'
import PageHeaderWithoutLink from '@/components/layout/PageHeaderWithoutLink'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'المفضلة',
}

type Props = {}

function WishlistPage({}: Props) {
  return (
    <PageHeaderWithoutLink header='المفضلة'>
      <FavouriteDishes/>
    </PageHeaderWithoutLink>
  )
}

export default WishlistPage