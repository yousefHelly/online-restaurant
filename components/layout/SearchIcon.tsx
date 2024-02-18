import { spotlight } from '@mantine/spotlight'
import { Search } from 'lucide-react'
import React from 'react'

type Props = {
    mobile?: boolean,
    topScreen: boolean
}

function SearchIcon({mobile=false, topScreen}: Props) {
  return (
    <button className='flex items-center focus-within:outline-none' onClick={()=>spotlight.open()}>
        <Search className={!mobile?`text-lighterText font-bold transition duration-150 hover:text-main cursor-pointer`:!topScreen?`text-stone-600 dark:text-main`:`text-main`}/>
    </button>
  )
}

export default SearchIcon