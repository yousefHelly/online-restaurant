'use client'
import RatingStars from '@/lib/RatingStars'
import { useScroll, useTransform, motion, MotionValue, MotionStyle } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { useViewportSize } from '@mantine/hooks';

type Props = {}

function Review({img, name, rateNum, rateText}:{img: string, name:string, rateNum: number, rateText: string}){
return (
    <div className='col-span-1 flex flex-col items-center justify-center gap-3 p-2 rounded-2xl bg-slate-50/75 dark:bg-stone-900/75 backdrop-blur-2xl'>
        <img src={img} className='w-16 h-16 object-cover rounded-full'/>
        <strong className='text-header dark:text-stone-300 font-bold text-sm text-center'>{name}</strong>
        <RatingStars rating={rateNum}/>
        <p className='text-header dark:text-stone-300 font-bold text-sm text-center pb-2'>{rateText}</p>
    </div>
)
}
function Column({y, ititialY, children}:{y:MotionValue, ititialY: string,children: React.ReactNode}){
    return (
        <motion.div style={{y}} className={`col-span-1 flex flex-col gap-3 relative ${ititialY}`}>
            {
                children
            }
        </motion.div>
    )
    }

function CustomersReviews({}: Props) {
    const { height } = useViewportSize()
    useEffect(()=>{
    const lenis = new Lenis()
    function raf(time :number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    },[])
    const ref = useRef<HTMLDivElement | null>(null)
    const {scrollYProgress}  = useScroll({
        target:ref,
        offset:['start end', 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], [0, height])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height*3])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height*1.5])
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height*2])
  return (
    <div ref={ref} className='flex flex-col gap-5 w-full my-10'>
        <div className='flex flex-col gap-3 text-center py-3'>
            <h2 className='text-3xl text-header dark:text-stone-300 font-bold py-4 leading-[4rem]'>قال عنا زبائننا</h2>
            <div className='grid grid-cols-4 gap-5 items-start justify-around bg-slate-200 dark:bg-stone-800 p-4 overflow-hidden relative max-h-[500px]'>
                <Column y={y} ititialY='top-[-65%]'>
                    <Review name='احمد' img='https://randomuser.me/api/portraits/men/29.jpg' rateNum={4.5} rateText='تجربة جيدة شكرا جو فاست فوود'/>
                    <Review name='امنية' img='https://randomuser.me/api/portraits/women/72.jpg' rateNum={5} rateText='عندهم اصناف كتير جدا و متنوعة'/>
                    <Review name='اسلام' img='https://randomuser.me/api/portraits/men/71.jpg' rateNum={4.2} rateText='حبيت سهولة التعامل مع موقعهم جدا انصح بيهم'/>
                    <Review name='كريمة' img='https://randomuser.me/api/portraits/women/22.jpg' rateNum={4.2} rateText='تجربة جيده هتعامل معاهم تاني'/>
                    <Review name='علا' img='https://randomuser.me/api/portraits/women/27.jpg' rateNum={4.2} rateText='الشاورما عندهم حاجة تانية خالص'/>
                </Column>
                <Column y={y2} ititialY='top-[-120%]' >
                    <Review name='نجيب' img='https://randomuser.me/api/portraits/men/98.jpg' rateNum={5} rateText='شكرا يوسف علي المطعم الجميل ده بالتوفيق'/>
                    <Review name='كريم' img='https://randomuser.me/api/portraits/men/45.jpg' rateNum={4.3} rateText='حوار التسجيل بجوجل بيوفر وقتي وانا بطلب شكرا ليكم'/>
                    <Review name='اسراء' img='https://randomuser.me/api/portraits/women/14.jpg' rateNum={4.8} rateText='تجربة جيدة شكرا جو فاست فوود'/>
                    <Review name='سها' img='https://randomuser.me/api/portraits/women/21.jpg' rateNum={4.8} rateText='احلي حاجة انهم بيكتبوا السعر النهائي قبل التوصيل'/>
                    <Review name='يارا' img='https://randomuser.me/api/portraits/women/54.jpg' rateNum={5} rateText='حاسة ان ال apis ناقصه شوية حاول تظبطها يا علاء'/>
                </Column>
                <Column  y={y3} ititialY='top-[-100%]'>
                    <Review name='سالم' img='https://randomuser.me/api/portraits/men/70.jpg' rateNum={4.3} rateText='الحلويات عندهم عظمه'/>
                    <Review name='فاتن' img='https://randomuser.me/api/portraits/women/75.jpg' rateNum={4.5} rateText='عندهم شيف ايطالي بيعمل بيتزا تحفه تجنن'/>
                    <Review name='ممدوح' img='https://randomuser.me/api/portraits/men/59.jpg' rateNum={4.5} rateText='حبيت سهوله فلتره الاطباق بصراحة علاء عامل شغل عالي'/>
                    <Review name='سهيلة' img='https://randomuser.me/api/portraits/women/59.jpg' rateNum={4.5} rateText='سرعة التوصيل محترمة جدا وصل في تلت ساعة بالظبط'/>
                    <Review name='عبدالله' img='https://randomuser.me/api/portraits/men/22.jpg' rateNum={4.5} rateText='جو فاست فوود خلاني ابطل اروح اطلب من المطاعم بنفسي'/>
                </Column>
                <Column  y={y4} ititialY='top-[-90%]'>
                    <Review name='علي' img='https://randomuser.me/api/portraits/men/76.jpg' rateNum={4.2} rateText='الموقع بيتيحلي كل حاجة محتاجها فعلا'/>
                    <Review name='سارة' img='https://randomuser.me/api/portraits/women/48.jpg' rateNum={4.2} rateText='مستنيين ابلكيشن ليكم عالايفون'/>
                    <Review name='احمد' img='https://randomuser.me/api/portraits/men/14.jpg' rateNum={4.3} rateText='الدفع اونلاين سهل و سلس جدا'/>
                    <Review name='سلمي' img='https://randomuser.me/api/portraits/women/88.jpg' rateNum={5} rateText='مش عارفة اسجل ب تيكتوك بس الاكل حلو'/>
                    <Review name='علياء' img='https://randomuser.me/api/portraits/women/88.jpg' rateNum={5} rateText='شغل عظيم شكرا بجد'/>
                </Column>
            </div>
        
        </div>
    </div>

  )
}

export default CustomersReviews