import React from 'react'
import TopDishes from '../menu/TopDishes'
import Link from 'next/link'

function TopSellingDishes() {
  return (
    <section id='most-selling' className='xl:mt-10 flex flex-col gap-5 w-full'>
        <div className='flex flex-col items-center gap-3 py-3 xl:pt-10  xl:pb-3'>
            <h2 className='text-3xl text-header dark:text-stone-300 font-bold pt-8 pb-4 leading-[4rem]'>الأطباق الأكثر مبيعاً</h2>
            <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 justify-center lg:justify-between items-center'>
                <p className='text-center text-sm text-lighterText leading-6'>إذا كنت تبحث عن تجربة طعام فريدة ومميزة، فإن مطعمنا يقدم لك مجموعة متنوعة من الأطباق الشهية والصحية التي تناسب جميع الأذواق والميزانيات. سواء كنت تفضل اللحوم أو الخضروات أو الحلويات، فستجد لدينا ما يرضي شهيتك ويسعد قلبك.</p>
                <Link href={'/menu/all-dishes'} className='lg:self-start text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main'>المزيد!</Link>
            </div>
            <TopDishes filter='SD'/>
        </div>
    </section>
  )
}

export default TopSellingDishes