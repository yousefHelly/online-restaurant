'use client'
import { Spotlight, SpotlightActionData } from '@mantine/spotlight'
import { Search, UserCircle2, Home, MenuSquare, UtensilsCrossed } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React from 'react'
import NotFound from './NotFound'
import useDishes from '@/lib/api/useDishes'

type Props = {}

function SearchDialog({}: Props) {
    const router = useRouter()
    const dishes = useDishes(undefined,undefined,undefined,undefined,undefined,undefined,undefined, 'SD')
    const dishActions: SpotlightActionData[] = []
    dishes.data?.meals.forEach((dish)=>{
        dishActions.push({
            id: `${dish.id}`,
            label: dish.name,
            description: `مقدمة من الشيف ${dish.chefName} في تصنيف ${dish.categoryName}`,
            onClick: () => router.push(`/menu/${dish.name}`),
            leftSection: <UtensilsCrossed size={23} className='text-main'/>,
        })})   
  return (
    <Spotlight
    classNames={{root:'dark:bg-stone-800', search:'dark:text-stone-300 dark:bg-stone-800', body:'dark:bg-stone-800 ',action:'gap-3', actionSection:'flex justify-center items-center', actionLabel:'dark:text-stone-300'}}
    actions={[
        {
        group:'صفحات',
        actions:[  
        {
            id: 'الرئيسية',
            label: 'الرئيسية',
            description: 'الذهاب الي الصفحة الرئيسية',
            onClick: () => router.push('/'),
            leftSection: <Home size={23} className='text-main'/>,
        },
        {
            id: 'قائمة الطعام',
            label: 'قائمة الطعام',
            description: 'الذهاب الي قائمة الطعام (المنيو)',
            onClick: () => router.push('/menu'),
            leftSection:<MenuSquare size={23} className='text-main'/>,
        },
        {
            id: 'صفحتي الشخصية',
            label: 'صفحتي الشخصية',
            description: 'الذهاب الي صفحتي الشخصية',
            onClick: () => router.push('/profile'),
            leftSection: <UserCircle2 size={23} className='text-main'/>,
        },
        
        
        ]   
        },
        {
            group:'أطباق',
            actions:dishActions
        }
]}
    shortcut={'mod + J'}
    nothingFound={<NotFound name='نتائج مطابقة لكلمة البحث'/>}
    highlightQuery
    limit={7}
    searchProps={{
      leftSection: <Search />,
      placeholder: 'إبحث',
    }}
  />
  )
}

export default SearchDialog