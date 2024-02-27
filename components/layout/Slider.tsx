'use client'
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react'
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
type Props = {
    children: React.ReactNode,
    className?: string,
    showArrows: boolean
}

function Slider({children, className, showArrows}: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop:false,direction:'rtl', align:'center'}, [Autoplay({stopOnInteraction:false})])
    const scrollPrev = useCallback(()=>{
      emblaApi?.scrollPrev()
    }, [emblaApi])
    const scrollNext = ()=>{
      emblaApi?.scrollNext()
    }
  return (
    <div className={`overflow-x-clip  px-1 relative ${className}`}>
        <div  className="viewport h-full" ref={emblaRef}>
        <div className="h-full flex flex-nowrap gap-5 md:w-full">
        {
            children
        }
        </div>
        {
            showArrows&&<>
            <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-main/25 dark:bg-main/75 dark:text-stone-200 dark:hover:bg-main hover:bg-main/75 transition duration-150 p-3 rounded-md drop-shadow-lg" onClick={scrollNext}>
            <ChevronLeftCircleIcon/>
            </button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-main/25 dark:bg-main/75 dark:text-stone-200 dark:hover:bg-main hover:bg-main/75 transition duration-150 p-3 rounded-md drop-shadow-lg" onClick={scrollPrev}>
            <ChevronRightCircleIcon/>
            </button>
            </>
        }
        
    </div>
    </div>
  )
}

export default Slider