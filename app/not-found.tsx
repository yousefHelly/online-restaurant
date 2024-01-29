import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage(){
    return (
        <div className='flex flex-col w-full col-span-full items-center justify-center gap-5 pt-8 pb-8'>
        <h3 className='text-6xl font-bold font-header text-transparent bg-clip-text bg-gradient-to-l min-h-[70px] from-[#FDC830] to-[#F37335] dark:to-main drop-shadow-md '>
        صفحة غير موجودة!
        </h3>
        <Image
        src={'/static/page-not-found.png'}
        alt="صفحة غير موجودة"
        width={350}
        height={350}
        className='object-cover'
        />
        <p className="font-bold text-sm text-lighterText dark:text-stone-400">
            ربما تكون الصفحة غير موجودة ، اذا حدث شئ غير متوقع تواصل معنا
        </p>
        <div className='flex items-center gap-5 justify-center'>
            <Link className='mx-auto self-center px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-md dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' href={'/'}>العودة للصفحة الرئيسية</Link>
        </div>
    </div>
    )
}