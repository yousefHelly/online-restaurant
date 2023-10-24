'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import {Home} from 'lucide-react'
import Link from 'next/link'
import { convert } from '@/lib/ConvertArabicURL'
type Props = {}

function BreadCrumb({}: Props) {
    const pathname = usePathname()
    const pathArray= pathname.split('/').filter((el)=>el!='')
    const arArray = pathname.split('/').filter((el)=>el!='').map((el)=>{
        if(el==='menu'){
            return 'قائمة الطعام'
        }else if(el === 'categories'){
            return 'التصنيفات'
        }else if(el === 'chefs'){
            return 'الشيفات'
        }else if(el === 'all-dishes'){
            return 'كل الأطباق'
        }else{
            return convert(el)
        }
    })
    console.log(arArray);
    
  return (
    <span key={'breadCrumb'} className='px-24 py-3 flex justify-start items-center'>
        <Link href={'/'} className='flex gap-3 items-center px-2'>
            <Home size={23} className='text-main'/>
        </Link>
        <p className='text-xl text-lighterText'>\</p>
        {pathArray.map((path, i)=>{                        
            return(
                <>
                    {pathArray[pathArray.length-1] === path?<p key={i} className='px-2 font-bold dark:text-stone-300'>{arArray[i]}</p>:<Link className='px-2 hover:text-main dark:text-stone-400 dark:hover:text-main transition duration-150' href={`/${path}`}>{arArray[i]}</Link>}
                    {pathArray[pathArray.length-1] != path&&<p key={i} className='text-xl text-lighterText '>\</p>}
                </>
                
            )
        })}
    </span>
  )
}

export default BreadCrumb