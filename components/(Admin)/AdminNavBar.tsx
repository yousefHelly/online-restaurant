'use client'
import React, { useMemo } from 'react'
import SearchDialog from '../layout/SearchDialog'
import UserPopover from '../(User)/layout/UserPopover'
import { Search } from 'lucide-react'
import { spotlight } from '@mantine/spotlight'

type Props = {}

type SearchComponentProps = {
  onClick: () => void;
};

const SearchComponent = React.memo(({ onClick }: SearchComponentProps) => (
  <div
    onClick={() => {
      onClick();
      spotlight.open();
    }}
    className='bg-stone-700 flex gap-5 items-center w-80 h-10 rounded-md px-3 py-2 cursor-pointer hover:bg-stone-600 transition duration-150'
  >
    <Search className='text-stone-800'/>
    <span className='text-lighterText text-sm'>إبحث هنا...</span>
  </div>
));

function AdminNavBar({}: Props) {
  const memoizedSearch = useMemo(() => <SearchComponent onClick={() => spotlight.open()} />, []);

  return (
    <nav className=' bg-stone-800 h-[8%] flex justify-between items-center mb-2 pr-1'>
      {memoizedSearch}
    <div className='ml-10 mb-2'>
        <UserPopover text={'left'}/>
    </div>
    <SearchDialog/>
    </nav>
  )
}

export default AdminNavBar