import { UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  color?: string,
  iconColor?: string
  fontSize?: string
  iconSize?: string
  expanded?: boolean
}

function Logo({color, iconColor, fontSize, iconSize, expanded = true}: Props) {
  return (
    <Link className={`flex items-center justify-center gap-3 `} href={'/'}>
        <UtensilsCrossed className={`${iconColor?iconColor:'text-main'} `} size={`${iconSize?iconSize:'34px'}`}/>
        {
        expanded&&<span className={`font-header font-bold ${fontSize?fontSize:'text-3xl'} ${color?color:'text-header dark:text-stone-300'} `}>جو فاست فوود</span>    
        }
    </Link>
  )
}

export default Logo