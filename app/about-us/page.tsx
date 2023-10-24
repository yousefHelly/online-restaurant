'use client'
import Logo from '@/components/layout/Logo'
import React from 'react'
import {Disclosure} from '@headlessui/react'
import {ChevronDown} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion';
import Accordion from '@/components/layout/Accordion'
type Props = {}

function AboutUsPage({}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-start pb-20 px-24 overflow-x-hidden">
        <h3 className='text-3xl font-header font-bold my-8'>عنا</h3>
        <div className='flex justify-between items-center'>
            <div className='flex-1'>
                <h4 className='text-xl font-header font-bold my-4'>شركة GO</h4>
                <div className='font-bold text-lighterText'>
                    <p>هيا شركة ملك لرجل الأعمال يوسف الحلي و قد قام بإنشائها صدفة بعد تشابه عدة أسماء لمشاريع مختلفة قام بها و هيا المالكة ل3 مواقع انترنت متعلقة بالتجارة الإلكترونية و 2 اخريين تحت الإنشاء و هم</p>
                    <p>جو فاست فوود</p>
                    <p>GO Cars</p>
                    <p>GO Cart</p>
                    <p>GO Chat (قريباً)</p>
                    <p>جو غيط (قريباً)</p>
                </div>
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <Logo/>
            </div>
        </div>
        <h3 className='text-3xl font-header font-bold my-8'>أسئلة شائعة</h3>
        <div className='py-4'>
            <Accordion title='هل يوجد تطبيق ل جو فاست فوود ؟' description='حتي الان لا يوجد تطبيق ل جو فاست فوود ولكن المالك يفكر جيدا في هذا الأمر'/>
        </div>
        <div className='py-4'>
            <Accordion title='لقد طلبت طلبية من جو فاست فوود ولكن الطلبية جائت فارغة ؟' description='قد يكون سائق الدليفري قد تناولها في طريقه اليك في هذه الحالة عليك ان تكون متسامح و نعدك بعدم تكرار ذلك في المرة القادمة علي الأرجح'/>
        </div>
        <div className='py-4'>
            <Accordion title='لقد وصلتلي رسائل تهديد بالقتل بعدما قيمت شيف لديكم بنجمة واحدة ؟' description='في الواقع هذا حقه, ف أنت لم  تجامله و تعطيه 5 نجوم , يكفي انه يعمل 8 ساعات باليوم من أجل خدمتك'/>
        </div>
        <div className='py-4'>
            <Accordion title='ما سبب ارتفاع الاسعار المبالغ فيها لديكم ؟' description='حتي نتمكن من دفع مرتبات سائق الدليفري و بالتالي يتوقف عن تناول طلبيتك'/>
        </div>
        <div className='py-4'>
            <Accordion title='لقد حصلت علي كود خصم بقيمة 50% لكنه لم يعمل عندما حاولت استعماله ؟' description='صلاحية كود الخصم 15 ثانية من بعد وصول الرسالة علي ايميلك الشخصي'/>
        </div>
        <div className='py-4'>
            <Accordion title='تمت سرقة جميع اموالي بعدما دفعت بالفيزا رغم ان الطلبية تكلفتها لا تتعدي ال 200 ج ؟' description='اوبس نعتذر, لقد نسينا ان نجعل صفحة الدفع https وليس http'/>
        </div>
        <div className='py-4'>
            <Accordion title='كيف يمكنني التواصل معكم ؟' description='نعتذر نحن مشغولون جدا و قد نرد علي رسالتك بعد شهر , علي اي حال يمكنك ترك رسالتك علي الجيميل'/>
        </div>
        <div className='py-4'>
            <Accordion title='كيف يمكنني التواصل معكم ؟انا فتاة' description=' نحن مشغولون لكن اي حال يمكنك ترك رسالتك علي الجيميل و سنرد في نفس اليوم'/>
        </div>
        <div className='py-4'>
            <Accordion title='كيف يمكنني التواصل معكم ؟انا فتاة جميلة' description='في هذه الحالة يمكنك التواصل مع صاحب الشركة شخصيا عبر حسابه علي الفيس بوك و سيرد عليكي خلال دقائق 😍🥰'/>
        </div>
    </main>
  )
}

export default AboutUsPage