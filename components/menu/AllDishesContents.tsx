'use client'
import { sorting, view } from '@/Data'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import useCategories from '@/lib/api/useCategories'
import useChefs from '@/lib/api/useChefs'
import useDishes from '@/lib/api/useDishes'
import { useQueryClient } from 'react-query';
import FilterHeader from '@/components/menu/FilterHeader'
import AllDishesView from '@/components/menu/AllDishesView'
import AllDishesFilters from '@/components/menu/AllDishesFilters'
import { AnimatePresence } from 'framer-motion'
import FiltersModal from './FiltersModal'

type Props  = {
    initialCategories?: Category[],
    initialChefs?: Chef[],
    initialDishes?: Dishes
}

function AllDishesContents({initialCategories,initialChefs, initialDishes}: Props) {
    const searchParams = useSearchParams()
    const [filterList, setFilterList] = useState<{categories: string[], chefs: string[],price: {from: string, to: string}, search: string}>({categories:[], chefs:[], price:{from:'', to:''}, search:''})
    useEffect(() => {
      if(searchParams.get('f')!=null && searchParams.get('n')!=null){
        searchParams.get('f')==='category'?setFilterList({...filterList, categories:[searchParams.get('n') as string]}):
        searchParams.get('f')==='chef'?setFilterList({...filterList, chefs:[searchParams.get('n') as string]}):
        searchParams.get('f')==='search'?setFilterList({...filterList, search:searchParams.get('n') as string}):null
        setTimeout(()=>{queryClient.removeQueries(['dishes']);},10)
      }
    }, [searchParams])
    const [cardView, setCardView]= useState<'grid'|'row'>('grid');
    const [selectedSort, setSelectedSort] = useState(sorting[2]);
    const [selectedView, setSelectedView] = useState(view[1]);
    const dishes = useDishes(filterList.categories.join(',') || undefined, filterList.search || undefined, filterList.chefs.join(',') || undefined, +filterList.price.from || undefined, +filterList.price.to || undefined, 1, selectedView.value, selectedSort.value, initialDishes)
    const queryClient =  useQueryClient();
    const categories = useCategories(initialCategories);
    const chefs = useChefs(initialChefs);
    const [filterModal,setFiltersModal] = useState(false)
  return (
    <div className='grid grid-cols-4 w-full border pb-5 dark:border-stone-600'>
    {/* filter header */}
    <FilterHeader 
    selectedView={selectedView} 
    cardView={cardView} 
    setFilterList={setFilterList} 
    selectedSort={selectedSort} 
    setSelectedSort={setSelectedSort}
    setCardView={setCardView} 
    setSelectedView={setSelectedView}
    setFiltersModal={setFiltersModal}
    />
    {/* filter */}
    <AllDishesFilters categories={categories} chefs={chefs} dishes={dishes} filterList={filterList} setFilterList={setFilterList}/>
    <AllDishesView cardView={cardView} filterList={filterList} dishes={dishes}/>
    <AnimatePresence>
      {
        filterModal&&<FiltersModal 
                      isOpen={filterModal} 
                      setIsOpen={setFiltersModal} 
                      categories={categories} 
                      chefs={chefs} 
                      dishes={dishes} 
                      filterList={filterList} 
                      setFilterList={setFilterList}
                      />
      }
    </AnimatePresence>
  </div>
  )
}

export default AllDishesContents