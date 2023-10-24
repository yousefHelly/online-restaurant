'use client'
import Link from 'next/link'
import React from 'react'
import {usePathname} from 'next/navigation'
type Props = {}

function NavLink({href, exact=true, children, ...props}: {href:string, exact?: boolean, children:React.ReactNode, props: React.HTMLProps<Props>}) {
    const pathname = usePathname()
    const active = ' active'
    const isActive = exact ? pathname === href : pathname.startsWith(href)
    if (isActive){
        if(props.props.className?.includes(active)){
        }else{
            props.props.className += active 
        }
    }else{
        if(props.props.className?.includes(active)){
            props.props.className = props.props.className.replaceAll(active, '')

        }
    }
    return (
    <Link href={href} className={props.props.className}>
        {children}
    </Link>
  )
}

export default NavLink