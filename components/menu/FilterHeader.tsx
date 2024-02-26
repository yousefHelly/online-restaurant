'use client'
import { sorting, view } from '@/Data';
import { Listbox } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownNarrowWide, CheckCircle, ChevronDown, Filter, LayoutGrid, LucideListFilter, Menu, RotateCcw, TableProperties } from 'lucide-react';
import React, { useState } from 'react'
import { QueryClient, useQueryClient } from 'react-query';

type Props = {
    cardView: 'grid'|'row',
    setCardView: (view: 'grid'|'row')=>void,
    setFilterList:(vals: {categories: string[],
        chefs: string[],
        price: {
            from: string,
            to: string,
        }
        search: string})=>void,
        selectedSort: {
            name: string;
            value: string;
        },
        setSelectedSort:(vals:{
            name: string;
            value: string;
        })=>void,
        selectedView:{
            value: number
        },
        setSelectedView:(val:{
            value: number
        })=>void,
        setFiltersModal: (val: boolean)=>void
}

function FilterHeader({cardView, setCardView, setFilterList, selectedSort, setSelectedSort, selectedView, setSelectedView, setFiltersModal}: Props) {
    const queryClient = useQueryClient()
  return (
    <div className='col-span-full grid lg:grid-cols-4'>
    {/* name and reset */}
    <div className='flex items-center lg:border-l h-full dark:border-stone-600'>
      <div className='flex-1 flex items-center gap-3 border-l h-full border-b dark:border-stone-600 px-4 lg:px-6 py-4'>
        <Filter className='text-main'/>
        <p className='text-header dark:text-stone-400 font-bold'>فلترة</p>
      </div>
      <div onClick={()=>{setFilterList({categories:[], chefs:[], price:{from:'', to:''}, search:''});queryClient.removeQueries(['dishes']);}} className='px-4 py-4 border-l lg:border-l-0 h-full flex items-center justify-center border-b dark:border-stone-600 text-main cursor-pointer transition duration-150 hover:text-header dark:hover:text-main/75'>
        <RotateCcw />
      </div>
      <div onClick={()=>{setFiltersModal(true)}} className='lg:hidden px-4 py-4 border-b dark:border-stone-600 text-main cursor-pointer transition duration-150 hover:text-header dark:hover:text-main/75'>
        <LucideListFilter />
      </div>
    </div>
    {/* sorting */}
    <div className='border-b lg:border-l dark:border-stone-600 relative py-1 lg:py-0'>
      <Listbox value={selectedSort} onChange={setSelectedSort}>
        {
          ({open})=>(<>
            <Listbox.Button className={'flex items-center justify-between h-full w-full'}>
                <div className='flex-1 flex items-center gap-3 px-4 lg:px-6 py-3'>
                <ArrowDownNarrowWide size={21} className='text-main mt-1'/>
                  <p className='text-header dark:text-stone-400 font-bold'>ترتيب حسب :</p>
                </div>
                <span className='pl-1 font-bold text-header dark:text-stone-400'>
                  {
                    selectedSort.name
                  }
                </span>
                <span className='px-2'>
                  <ChevronDown size={16} className={`transition dark:text-stone-400 duration-150 ${open&&'rotate-180'}`}/>
                </span>
              </Listbox.Button>
              <AnimatePresence mode='wait'>
              {
                open&&<Listbox.Options as={motion.ul} initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} static className='absolute top-0 translate-y-12 left-1/2 -translate-x-1/2 w-[250px] bg-slate-300/50 dark:bg-stone-800/50 backdrop-blur-md z-30 p-1 rounded-2xl'>
                <AnimatePresence mode='wait'>
                {
                  sorting.map((sort,i)=>{
                    return <Listbox.Option key={i} value={sort}>
                    {
                      ({active})=>{
                        return <motion.span key={i} initial={{opacity:0}} animate={{opacity:1, transition:{delay:`0.${i}`} as {}}} exit={{opacity:0, transition:{delay:`0.${sorting.length-i}`} as {}}} className={`flex gap-2 items-center cursor-pointer py-2 px-4 text-sm font-bold rounded-2xl dark:text-stone-400 font-header ${active&&'bg-main text-slate-50 dark:text-stone-900'}`} onClick={()=>queryClient.removeQueries(['dishes'])}>
                          {selectedSort.name===sort.name&& <CheckCircle size={18} />}
                          {
                            sort.name
                          }
                        </motion.span>
                      }
                    }
                </Listbox.Option>
                  })
                }
                  </AnimatePresence>
              </Listbox.Options>
              }
              </AnimatePresence>
            </> )
        }
      </Listbox>
    </div>
    {/* number of viewed cards */}
    <div className='border-b lg:border-l dark:border-stone-600 relative py-1 lg:py-0'>
      <Listbox value={selectedView} onChange={setSelectedView}>
        {
          ({open})=>(<>
            <Listbox.Button className={'flex items-center justify-between  h-full w-full'}>
                <div className='flex-1 flex items-center gap-3 px-4 lg:px-6 py-3'>
                <ArrowDownNarrowWide size={21} className='text-main mt-1'/>
                  <p className='text-header dark:text-stone-400 font-bold'>عرض :</p>
                </div>
                <span className='pl-1 font-bold text-header dark:text-stone-400'>
                  {
                    selectedView.value
                  }
                </span>
                <span className='px-2'>
                  <ChevronDown size={16} className={`transition dark:text-stone-400 duration-150 ${open&&'rotate-180'}`}/>
                </span>
              </Listbox.Button>
              <AnimatePresence mode='wait'>
              {
                open&&<Listbox.Options as={motion.ul} initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} static className='absolute top-0 translate-y-12 left-1/2 -translate-x-1/2 w-[250px] bg-slate-300/50 dark:bg-stone-800/50 backdrop-blur-md z-30 p-1 rounded-2xl'>
                <AnimatePresence mode='wait'>
                {
                  view.map((viewVal,i)=>{
                    return <Listbox.Option key={i} value={viewVal}>
                    {
                      ({active})=>{
                        return <motion.span key={i} initial={{opacity:0}} animate={{opacity:1, transition:{delay:`0.${i}`} as {}}} exit={{opacity:0, transition:{delay:`0.${sorting.length-i}`} as {}}} className={`flex gap-2 items-center cursor-pointer py-2 px-4 text-sm font-bold rounded-2xl dark:text-stone-400 font-header ${active&&'bg-main text-slate-50 dark:text-stone-900'}`}>
                          {selectedView.value===viewVal.value&& <CheckCircle size={18} />}
                          {
                            viewVal.value
                          }
                        </motion.span>
                      }
                    }
                </Listbox.Option>
                  })
                }
                  </AnimatePresence>
              </Listbox.Options>
              }
              </AnimatePresence>
            </> )
        }
      </Listbox>
    </div>
    {/* changing the view */}
    <div className='flex items-center justify-center gap-10  border-b dark:border-stone-600  py-5 lg:py-0'>
        <LayoutGrid onClick={()=>setCardView('grid')} size={21} className={`cursor-pointer dark:text-stone-400 transition duration-150 ${cardView==='grid'&&'text-main dark:!text-main'}`}/>
        <TableProperties onClick={()=>setCardView('row')} size={21} className={`cursor-pointer dark:text-stone-400 transition duration-150 ${cardView==='row'&&'text-main dark:!text-main'}`}/>
    </div>
  </div>
  )
}

export default FilterHeader