import { UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  color?: string
}

function Logo({color}: Props) {
  return (
    <Link className='flex items-center justify-center gap-3' href={'/'}>
        <UtensilsCrossed className='text-main' size='34px'/>
        <span className={`font-header font-bold text-3xl ${color?color:'text-header dark:text-stone-300'} `}>جو فاست فوود</span>    
    </Link>
  )
}

export default Logo