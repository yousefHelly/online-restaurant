'use client'
import React from 'react'
import { ToggleWishlist } from '@/lib/api/useWishlist';
import { Heart, Loader2 } from 'lucide-react';


type Props = {
    dish?:{
        data?:Dish,
        isLoading?: boolean
    }
}
function WishlistButton({dish}: Props) {
    const toggleWishlist = ToggleWishlist()

  return (
    <button 
    onClick={()=>{
        toggleWishlist.mutate({id:dish?.data?.id!, isFavourite:dish?.data?.isFavourite!}) 
    }
    } className={`group self-start flex px-3 py-2 rounded-2xl gap-1 items-center bg-transparent dark:bg-red-500 dark:text-stone-300 border border-red-500 text-red-500 font-bold font-header`}>
    {
        <Heart className={`${dish?.data?.isFavourite?'fill-red-500  dark:fill-stone-300':'text-red-500 dark:text-stone-300 dark:group-hover:fill-stone-300 group-hover:fill-red-500'}  transition duration-150`}/>
    }
    {
        !dish?.isLoading?
        dish?.data?.isFavourite?'إزالة من المفضلة':'اضف الي المفضلة'
        :<Loader2 className='animate-spin'/>
    }
    </button>
  )
}

export default WishlistButton