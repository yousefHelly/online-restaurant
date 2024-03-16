import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'
import NotFound from './NotFound'
import Loading from '@/app/loading'

type Props = {
    data: any,
    isLoading: boolean,
    isError: boolean,
    name: string,
    isAdmin?: boolean
}

function LoadingErrorFetching({data, isLoading, isError, name, isAdmin}: Props) {
    if(!data && isLoading){
        return <Loading/>
      }if(!data && isError){
        toast.error(`فشل تحميل البيانات`,{
          id:'fetchError'
        })
        return !isAdmin&&<NotFound name={name}/>
    }
}

export default LoadingErrorFetching