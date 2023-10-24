import DateConverter from '@/lib/DateConverter'
import RatingStars from '@/lib/RatingStars'
import React from 'react'
import {motion} from 'framer-motion'
import { useSession } from 'next-auth/react';
import { PenBox, XCircleIcon } from 'lucide-react';
import { axiosAuth } from '@/lib/api/axios';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useQueryClient } from 'react-query';
type Props = {
    userName: string,
    userImg: string | null,
    rate: number,
    text: string,
    date: string,
    id: number,
    name: string,
    setUpdateReview: React.Dispatch<React.SetStateAction<{
        update: true;
        rating: number;
        reviewText: string;
        id: number;
    } | {
        update: false;
    }>>
}

function Review({userName, userImg, rate, text, date, id, setUpdateReview, name}: Props) {
    useAxiosAuth()
    const convertedDate = DateConverter(date)
    const {data:session} = useSession()
    const clientQuery = useQueryClient()
  return (
    <motion.div key={id} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className='bg-slate-200 dark:bg-stone-900 rounded-2xl shadow-md flex flex-col px-6 py-3'>
    <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
            <div className='w-[50px] h-[50px]'>
                <img src={userImg?`${`https://localhost:7166`}${userImg}`:'/static/default-user-icon.jpg'} alt={userName} className='object-cover rounded-full w-full h-full'/>
            </div>
            <div className='flex flex-col'>
                <p className='text-header dark:text-stone-300 font-bold font-header'>{userName}</p>
                <p className='text-lighterText dark:text-stone-400 font-bold font-header text-xs italic'>{convertedDate}</p>
            </div>
        </div>
        {
            session?.user.userName === userName &&
            <div className='flex gap-3'>
            <button onClick={()=>setUpdateReview({update:true,  rating:rate, reviewText:text, id:id})} className='flex gap-1 items-center px-3 py-2 bg-indigo-500 text-slate-50 font-bold text-sm rounded-2xl transition duration-150 hover:bg-indigo-600'>
                تعديل
                <PenBox size={18}/>
            </button>
            <button onClick={()=>{axiosAuth.delete(`/api/mealReview/${id}`);clientQuery.invalidateQueries(['dish', name]);}} className='flex gap-1 items-center px-3 py-2 bg-red-500 text-slate-50 font-bold text-sm rounded-2xl transition duration-150 hover:bg-red-600'>
                حذف
                <XCircleIcon size={18}/>
            </button>
        </div>
        }
       <div className='flex'>
            <RatingStars rating={rate}/>
       </div>
    </div>
    <p className={`py-2 font-bold dark:text-stone-300`}>
        {text}
    </p>
</motion.div>
  )
}

export default Review