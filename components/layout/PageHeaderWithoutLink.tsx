import React from 'react'

function PageHeaderWithoutLink({
    header,
    children
}: {
    header: string,
    children: React.ReactNode
}) {
  return (
    <div className='flex flex-col gap-10 w-full my-5'>
    <div className='flex justify-between items-center dark:text-stone-300'>
      <h2 className='text-3xl'>{header}</h2>
    </div>
    {
        children
    }
  </div>
  )
}

export default PageHeaderWithoutLink