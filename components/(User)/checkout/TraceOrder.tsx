import { Timeline } from '@mantine/core'
import { CalendarCheck2, CarFront, Microwave } from 'lucide-react'
import React from 'react'

type Props = {
  status: PostOrderResponse['status'],
  statusDate: PostOrderResponse['statusDate']
}

function TraceOrder({status, statusDate}: Props) {
  return (
    <Timeline active={1} lineWidth={3} bulletSize={34} color='#ffa006' >      
        <Timeline.Item className='dark:text-stone-300' bullet={<CalendarCheck2 size={24} className='dark:text-header'/>} title="تم إستلام طبلك">
        <p className='text-sm'>لقد إستلم الشيفات طلبك و سيتم تجهيزه في القريب العاجل !</p>
        <span className='text-xs mt-2 text-lighterText dark:text-stone-400'>منذ 3 دقائق</span>
        </Timeline.Item>
        
        <Timeline.Item className='dark:text-stone-300' title="يتم تجهيز طلبك"  lineVariant="dashed" bullet={<Microwave size={24} className='dark:text-header'/>} >
        <p className='text-sm'>لقد انتهي الشيفات للتو من تجهيز طلبك و نحن في انتظار سائق الدليفري ليقوم بتوصيله لك.
        استعد لمكالمة منه قريب.</p>
        <span className='text-xs mt-2 text-lighterText dark:text-stone-400'>الأن</span>
        </Timeline.Item>
        
        <Timeline.Item className='dark:text-stone-300' title="في انتظار توصيل طلبك" bullet={<CarFront size={24} className='dark:text-header'/>}>
        <p className='text-sm '>طلبك ساخن في طريقه اليك ، فقط استعد للاستمتاع بوجبتك و تقييم طبقك بعدها.</p>
        {/* <span className='text-xs mt-2 text-lighterText dark:text-stone-400'>منذ 3 دقائق</span> */}
        </Timeline.Item>
    </Timeline>
  )
}

export default TraceOrder