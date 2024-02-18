'use client'
import { DeleteCartAllItems } from '@/lib/api/useCart'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

function FailedOrder({}: Props) {
    const deleteOrder = DeleteCartAllItems()
    const router = useRouter()
    function handleCancel () {
        deleteOrder.mutate()
        router.replace('/')
    }
  return (
    <div className='flex flex-col w-full col-span-full items-center justify-center gap-5 pt-8 lg:pt-0 pb-8'>
        <h3 className='text-5xl lg:text-6xl font-bold font-header text-transparent bg-clip-text bg-gradient-to-t min-h-[70px] from-[#ED213A] to-[#93291E] dark:to-red-600 drop-shadow-md '>
        فشل تأكيد الطلبية!
        </h3>
        <Image
        src={'/static/failed-order.png'}
        alt="فشل تأكيد الطلبية"
        width={250}
        height={250}
        className='object-cover'
        />
        <p className="text-center lg:text-start leading-6 font-bold text-sm text-lighterText dark:text-stone-400">
            فشلت عملية الدفع عبر خدمة stripe ، لازال بإمكانك إعادة المحاولة او اختيار طريقة الدفع عند الإستلام
        </p>
        <div className='flex flex-col lg:flex-row items-center gap-5 justify-center'>
            <Link className='mx-auto self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-md dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' href={'/checkout'}>محاولة مرة اخري</Link>
            <button className='mx-auto self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-md dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' onClick={handleCancel}>إلغاء الطلبية و العودة للصفحة الرئيسية</button>
        </div>
    </div>
  )
}

export default FailedOrder