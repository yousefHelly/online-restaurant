'use client'
import FavouriteDishes from '@/components/(User)/wishlist/FavouriteDishes'
import React from 'react'

type Props = {}

function WishlistPage({}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-start pb-20 px-24 overflow-x-hidden">
       <div className='flex flex-col gap-10 w-full my-5'>
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl dark:text-stone-300'>المفضلة</h2>
          </div>
          <FavouriteDishes/>
        </div>
    </main>
  )
}

export default WishlistPage