'use client'
import DateConverter from '@/lib/DateConverter'
import { Timeline } from '@mantine/core'
import { CalendarCheck2, CarFront, Microwave, PackageCheck } from 'lucide-react'
import React from 'react'

type Props = {
  status: PostOrderResponse['status'],
  statusDate: PostOrderResponse['statusDate']
}
enum Status {
  Processing = 'Processing',
  Cooking = 'Cooking',
  Delivering = 'Delivering',
  Delivered = 'Delivered'
}
function TraceOrder({status, statusDate}: Props) {
  return (
    <Timeline active={status===Status.Processing?0:status===Status.Cooking?1:status===Status.Delivering?2:3} lineWidth={3} bulletSize={34} color='#ffa006' >      
        <Timeline.Item className='dark:text-stone-300' bullet={<CalendarCheck2 size={24} className='dark:text-header'/>} title="تم إستلام طلبيتك">
        <p className='text-sm'>لقد إستلم الشيفات طلبيتك و سيتم تجهيزه في القريب العاجل !</p>
        {
          status === Status.Processing &&<span className='text-xs mt-2 text-lighterText dark:text-stone-400'>{DateConverter(statusDate)}</span>
        }
        </Timeline.Item>
        
        <Timeline.Item className='dark:text-stone-300' title="يتم تجهيز طلبيتك"  lineVariant="dashed" bullet={<Microwave size={24} className='dark:text-header'/>} >
        <p className='text-sm'>لقد بدأ الشيفات للتو في تجهيز طلبيتك ، لا تقلق سيتم تجيزها في وقت قصير !</p>
        {
          status === Status.Cooking &&<span className='text-xs mt-2 text-lighterText dark:text-stone-400'>{DateConverter(statusDate)}</span>
        }
        </Timeline.Item>

        <Timeline.Item className='dark:text-stone-300' title="طليبتك في طريقها اليك"  lineVariant="dashed" bullet={<CarFront size={24} className='dark:text-header'/>} >
        <p className='text-sm '>طلبيتك ساخنة في طريقها اليك ، فقط استعد للاستمتاع بوجبتك و تقييم طبقك بعدها.</p>
        {
          status === Status.Delivering &&<span className='text-xs mt-2 text-lighterText dark:text-stone-400'>{DateConverter(statusDate)}</span>
        }
        </Timeline.Item>
        
        <Timeline.Item className='dark:text-stone-300' title="تم توصيل طلبيتك" bullet={<PackageCheck size={24} className='dark:text-header'/>}>
        <p className='text-sm '>تم توصيل طلبيتك بنجاح ! لا تنسي تقييم الطبق بعد تجربتها مع تقييم الشيف و نتمني ان ينال الطلب إعجابك!</p>
        {
          status === Status.Delivered &&<span className='text-xs mt-2 text-lighterText dark:text-stone-400'>{DateConverter(statusDate)}</span>
        }
       </Timeline.Item>
    </Timeline>
  )
}

export default TraceOrder