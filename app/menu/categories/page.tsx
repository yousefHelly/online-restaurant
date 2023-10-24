import Categories from '@/components/menu/Categories'
import React from 'react'

function CategoriesPage() {
  return (
    <main className="flex min-h-screen flex-col items-start pb-20 px-24 overflow-x-hidden">
       <div className='flex flex-col gap-10 w-full my-5'>
          <div className='flex justify-between items-center dark:text-stone-300'>
            <h2 className='text-3xl'>كل التصنيفات</h2>
          </div>
          <Categories/>
        </div>
    </main>
  )
}

export default CategoriesPage