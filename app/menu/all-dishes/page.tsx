'use client'
import { sorting, view } from '@/Data'
import DishCard from '@/components/layout/DishCard'
import { Disclosure, Listbox } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownNarrowWide, CheckCircle, ChevronDown, Filter, Grip, LayoutGrid, RotateCcw, TableProperties, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import * as Slider from '@radix-ui/react-slider';
import useCategories from '@/lib/api/useCategories'
import useChefs from '@/lib/api/useChefs'
import useDishes from '@/lib/api/useDishes'
import { QueryClient, useQueryClient } from 'react-query';
type Props = {}

function FilterAccordion({name, children, open, selectedCount, setFilterArray, queryClient}:{name: string,children: React.ReactNode, open?: boolean, selectedCount?: number, setFilterArray: any, queryClient: QueryClient}){
return(
  <Disclosure defaultOpen={open || false}>
  {
      ({open})=>
          <>
          <div className={`flex items-center px-4  ${open?'bg-slate-100 dark:bg-stone-800':'border-b dark:border-stone-600'}`}>
            <Disclosure.Button className={`py-4 flex items-center justify-between w-full gap-3`}>
                <p className='flex-1 flex items-center gap-3 justify-start'>
                  <ChevronDown size={16}  className={`transition duration-150 dark:text-stone-400 ${open?'rotate-180':''}`}/>
                  <span className='font-bold dark:text-stone-400'>{name}</span>
                  {(selectedCount && selectedCount>=1)&&<span className='rounded-full py-1 px-1 w-6 h-6 text-sm text-slate-50 dark:text-stone-400 dark:bg-stone-700 dark:border dark:border-main bg-main flex items-center justify-center'>{selectedCount}</span>}
                </p>
            </Disclosure.Button>
            <span>
              <X size={16} className='hover:text-main transition dark:text-stone-400 duration-150 cursor-pointer' onClick={()=>{setFilterArray();queryClient.removeQueries(['dishes']);}}/>
            </span>
          </div>
          <AnimatePresence mode='wait'>
          {
              open&&<Disclosure.Panel key={1} static >
              <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height:0}} className='px-2 bg-slate-100 dark:bg-stone-800 py-2 '>
                {
                  children
                }
              </motion.div>
          </Disclosure.Panel>
          }
          </AnimatePresence>
      </>
  }
</Disclosure>
)
}

function AllDishesPage({}: Props) {
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
  const dishes = useDishes(filterList.categories.join(',') || undefined, filterList.search || undefined, filterList.chefs.join(',') || undefined, +filterList.price.from || undefined, +filterList.price.to || undefined, 1, selectedView.value, selectedSort.value)
  const queryClient =  useQueryClient();
  const categories = useCategories();
  const chefs = useChefs();
  return (
    <main className='flex min-h-screen flex-col items-start pb-20 px-24 overflow-hidden'>
      <div className='grid grid-cols-4 w-full border-r border-t border-l dark:border-stone-600'>
      {/* filter header */}
        <div className='col-span-4 grid grid-cols-4'>
          {/* name and reset */}
          <div className='flex items-center border-l dark:border-stone-600'>
            <div className='flex-1 flex items-center gap-3 border-l border-b dark:border-stone-600 px-6 py-4'>
              <Filter className='text-main'/>
              <p className='text-header dark:text-stone-400 font-bold'>فلترة</p>
            </div>
            <div onClick={()=>{setFilterList({categories:[], chefs:[], price:{from:'', to:''}, search:''});queryClient.removeQueries(['dishes']);}} className='px-4 py-4 border-b dark:border-stone-600 text-main cursor-pointer transition duration-150 hover:text-header'>
              <RotateCcw />
            </div>
          </div>
          {/* sorting */}
          <div className='border-b border-l dark:border-stone-600 relative'>
            <Listbox value={selectedSort} onChange={setSelectedSort}>
              {
                ({open})=>(<>
                  <Listbox.Button className={'flex items-center justify-between  w-full'}>
                      <div className='flex-1 flex items-center gap-3 px-6 py-3'>
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
          <div className='border-b border-l dark:border-stone-600 relative'>
            <Listbox value={selectedView} onChange={setSelectedView}>
              {
                ({open})=>(<>
                  <Listbox.Button className={'flex items-center justify-between  w-full'}>
                      <div className='flex-1 flex items-center gap-3 px-6 py-3'>
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
          <div className='flex items-center justify-center gap-10  border-b dark:border-stone-600'>
              <LayoutGrid onClick={()=>setCardView('grid')} size={21} className={`cursor-pointer dark:text-stone-400 transition duration-150 ${cardView==='grid'&&'text-main dark:!text-main'}`}/>
              <TableProperties onClick={()=>setCardView('row')} size={21} className={`cursor-pointer dark:text-stone-400 transition duration-150 ${cardView==='row'&&'text-main dark:!text-main'}`}/>
          </div>
        </div>
        {/* filter */}
        <aside className='flex flex-col border-l dark:border-stone-600 h-screen'>
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
        <div className='col-span-3 flex flex-col p-1 my-2 gap-2'>
          <h2 className='text-2xl col-span-3 font-bold font-header text-header dark:text-stone-400 m-2'>
          عرض
          {filterList.search!=''?<span> كل &apos;{filterList.search}&apos; </span>:<span> كل الأطباق </span>}
          {filterList.chefs.length>0&&<span> للشيف {filterList.chefs.join(' ، ')} </span>}
          {filterList.categories.length>0&&<span> ضمن تصنيف {filterList.categories.join(' ، ')} </span>}
          {filterList.price.from!=''&&<span> في نطاق سعر من {filterList.price.from}ج الي {filterList.price.to}ج</span>}
          </h2>
          <div className={`grid ${cardView==='row'?'grid-cols-1 gap-5':'grid-cols-3 gap-4'} p-1`}>
            {
              dishes&&dishes.data?.meals&&dishes.data.meals.map((dish, i)=>{
                return(
                  <DishCard i={i} key={dish.name} name={dish.name} category={dish.categoryName} chef={dish.chefName} price={dish.price} rating={dish.rate} ratingCount={dish.numOfRate} image={dish.mealImgUrl} oldPrice={dish.oldPrice} cardView={cardView}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default AllDishesPage