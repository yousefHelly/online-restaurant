import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import NotFound from './NotFound'

type Props = {
    data: any,
    isLoading: boolean,
    isError: boolean,
    name: string,
    isAdmin?: boolean
}

function LoadingErrorFetching({data, isLoading, isError, name, isAdmin}: Props) {
    if(!data && isLoading){
        return <div className='flex flex-col items-center w-full justify-center dark:text-stone-300 gap-3 '>جاري التحميل ...<Loader2 className='text-main animate-spin'/></div>
      }if(!data && isError){
        toast.error(`فشل تحميل البيانات ، تأكد من الاتصال بالانترنت`,{
          id:'fetchError'
        })
        return !isAdmin&&<NotFound name={name}/>
    }
}

export default LoadingErrorFetching