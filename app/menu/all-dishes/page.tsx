import AllDishesContents from "@/components/menu/AllDishesContents"
import { getCategories } from "@/lib/api/server api calls/getCategories"
import { getChefs } from "@/lib/api/server api calls/getChefs"
import { getDishes } from "@/lib/api/server api calls/getDishes"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: 'كل الأطباق'
}

async function AllDishesPage() {
  const categroiesData = await getCategories(1, 100)
  const chefsData = await getChefs(1, 100)
  const dishesData = await getDishes()
  return (
    <main className='flex min-h-max flex-col items-start pb-10 md:pb-20 px-8 md:px-24 overflow-hidden'>
      <AllDishesContents initialCategories={categroiesData} initialChefs={chefsData} initialDishes={dishesData}/>
    </main>
  )
}

export default AllDishesPage