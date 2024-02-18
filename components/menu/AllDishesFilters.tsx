'use client'
import React from 'react'
import FilterAccordion from './FilterAccordion'
import { motion } from 'framer-motion';
import { QueryClient } from 'react-query';
import * as Slider from '@radix-ui/react-slider';

type Props = {
    filterList:{categories: string[],
        chefs: string[],
        price: {
            from: string,
            to: string,
        }
        search: string
    },
    setFilterList:
    (
        vals: {categories: string[],
        chefs: string[],
        price: {
            from: string,
            to: string,
        }
        search: string}
    )=>void,
    categories: {
        data: Category[] | undefined;
        isLoading: boolean;
        isError: boolean;
    },
    chefs: {
        data: Chef[] | undefined;
        isLoading: boolean;
        isError: boolean;
    },
    dishes: {
        data: Dishes | undefined;
        isLoading: boolean;
        isError: boolean;
    }
}

function AllDishesFilters({categories, chefs, dishes, filterList, setFilterList}: Props) {
    const queryClient = new QueryClient()
  return (
    <aside className='hidden lg:flex flex-col border-l dark:border-stone-600 h-screen'>
          {/* filter content */}    
          <FilterAccordion open={true} name='التصنيفات'  setFilterArray={()=>setFilterList({...filterList, categories:[]})} selectedCount={filterList.categories.length>0?filterList.categories.length : undefined} queryClient={queryClient}>
            {
              categories.data&&categories.data.map((category, i)=>{                
                return(
                  <motion.div onClick={
                    !filterList.categories.includes(category.name)?
                    ()=>{
                    setFilterList({...filterList, categories:[...filterList.categories,category.name]})
                    queryClient.removeQueries(['dishes'])  
                    }:
                    ()=>{
                      setFilterList({...filterList, categories:[...filterList.categories.filter((cat)=>{return cat!=category.name&&category.name})]})
                    queryClient.removeQueries(['dishes'])  
                    }
                    } key={i} initial={{opacity:0}} animate={{opacity:1, transition:{delay:`0.${i}` } as {}}} className={`flex justify-between items-center px-6 py-2 text-sm font-bold font-header  transition duration-150 ${filterList.categories.includes(category.name)?'text-main text-[1rem]':'text-header dark:text-stone-400 dark:hover:text-main hover:text-main'} cursor-pointer`}>
                    <p>{category.name}</p>
                    <p>{category.numOfMeals}</p>
                  </motion.div>
                )
              })
            }
          </FilterAccordion>
          <FilterAccordion open={true} name='الشيفات' setFilterArray={()=>setFilterList({...filterList, chefs:[]})} selectedCount={filterList.chefs.length>0?filterList.chefs.length : undefined} queryClient={queryClient}>
          {
            chefs.data&&chefs.data.map((chef, i)=>{
              return(
                <motion.div onClick={
                  !filterList.chefs.includes(chef.name)?
                  ()=>{
                  setFilterList({...filterList, chefs:[...filterList.chefs,chef.name]})
                  queryClient.removeQueries(['dishes'])  
                  }:
                  ()=>{
                    setFilterList({...filterList, chefs:[...filterList.chefs.filter((chefItem)=>{return chefItem!=chef.name&&chef.name})]})
                  queryClient.removeQueries(['dishes'])  
                  }
                  } key={i} initial={{opacity:0}} animate={{opacity:1, transition:{delay:`0.${i}` } as {}}} className={`flex justify-between items-center px-6 py-2 text-sm font-bold font-header text-header transition duration-150 ${filterList.chefs.includes(chef.name)?'text-main text-[1rem]':'text-header  dark:text-stone-400 dark:hover:text-main hover:text-main'} cursor-pointer`}>
                  <p>{chef.name}</p>
                  <p>{chef.numOfMeals}</p>
                </motion.div>
              )
            })
          }
          </FilterAccordion>
          <FilterAccordion open={true} name='السعر' setFilterArray={()=>setFilterList({...filterList, price:{from:'', to:''}})} selectedCount={(filterList.price.from!='' || filterList.price.to!='')?1 : undefined} queryClient={queryClient}>
            <div className='px-6 py-2 flex flex-col items-center justify-center'>
              <div className='flex gap-5 items-center'>
                <input 
                onChange={(e)=>{
                  setFilterList({...filterList, price:{...filterList.price, from:e.target.value}});
                  queryClient.removeQueries(['dishes'])
                  }
                } 
                type='number' 
                className='rounded-full px-2 border dark:border-stone-600 dark:bg-stone-700 dark:text-stone-300 text-center w-16 py-1' 
                min={1} 
                max={dishes.data?.maxprice} 
                value={filterList.price.from}
                />
                <input 
                onChange={(e)=>{
                    setFilterList({...filterList, price:{...filterList.price, to:e.target.value}});
                    queryClient.removeQueries(['dishes'])
                    }
                }
                type='number' 
                className='rounded-full px-2 border dark:border-stone-600 dark:bg-stone-700 dark:text-stone-300 text-center w-16 py-1' 
                min={1} 
                max={dishes.data?.maxprice} 
                value={filterList.price.to}
                />
              </div>
              <Slider.Root dir='rtl' defaultValue={[+filterList.price.from , +filterList.price.to]} onValueCommit={([val1,val2])=>{setFilterList({...filterList, price:{from:`${val1>0?val1:1}`, to:`${val2}`}});;queryClient.removeQueries(['dishes']);}} minStepsBetweenThumbs={1} min={1} max={dishes.data?.maxprice} className="my-4 relative flex items-center select-none touch-none w-[200px] h-5">
                <Slider.Track  className="bg-main/50 relative grow rounded-full h-[5px]">
                  <Slider.Range  className="absolute bg-main rounded-full h-full"/>
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-stone-900 dark:shadow-none shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-main "/>
                <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-stone-900 dark:shadow-none shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-main "/>
              </Slider.Root>
            </div>
          </FilterAccordion>
    </aside>
  )
}

export default AllDishesFilters