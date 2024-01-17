import Image from "next/image";
import Link from "next/link";

export function Category({image, name, amount, chefs}:{image: string, name: string, amount: number, chefs: number}) {

    return(
        <Link href={`/menu/all-dishes?f=category&n=`+name} className='group relative flex flex-col gap-3 justify-center items-center bg-main/20 p-5 rounded-2xl transition duration-150 hover:bg-transparent dark:text-stone-300 dark:hover:text-main hover:text-main cursor-pointer overflow-hidden shadow-md hover:shadow-none'>
            <Image
            src={image}
            alt={name}
            width={75}
            height={75}
            className="w-[75px] h-[75px]"
            />
            <p className='text-xl font-bold font-header'>{name}</p>
            <span className='group-hover:left-0 text-xs absolute -left-[100%] top-5 bg-main/75 backdrop-blur-md rounded-r-2xl px-4 py-2 text-slate-50 '>
                {
                    amount>0?
                    <>
                    عدد الأطباق المتوفرة {amount}+
                    </>:
                    <>
                    لا توجد اطباق متوفرة
                    </>

                }
            </span>
            <span className='group-hover:right-0 text-xs absolute -right-[100%] top-16 bg-slate-50/75 dark:bg-stone-800 backdrop-blur-md rounded-l-2xl px-4 py-2 text-main border border-main '>
                {
                    chefs>0?
                    <>
                    عدد الشيفات {chefs}+
                    </>:
                    <>
                    لا توجد شيفات متوفرة
                    </>

                }
            </span>
        </Link>
    )
}