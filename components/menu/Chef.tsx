import Link from "next/link";

 
export function Chef({name, image, mealsCount, category, rating, rateNum}:{name: string, image: string, mealsCount: number, category: string, rating: number, rateNum: number}){  
  return(
    <Link href={`/menu/all-dishes?f=chef&n=${name}`} className='group h-[350px] col-span-full md:col-span-1'>
    <div className='h-full rounded-2xl overflow-hidden relative after:content-[""] after:absolute after:inset-0 after:bg-main/25 after:transition after:duration-150 group-hover:after:backdrop-blur-[2px]'>
        <img
        src={`${`https://localhost:7166`}${image}`}
        alt={`الشيف ${name}`}
        width={400}
        height={400}
        className='rounded-2xl h-full object-cover transition w-full duration-150 group-hover:scale-105' 
        />
        <span className='absolute inset-0 font-bold font-header z-10 flex flex-col items-center justify-center w-full h-full gap-3 top-[100%] transition transform duration-150 group-hover:top-[0%]'>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>الشيف : {name}</p>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>عدد الأطباق : {mealsCount>0?<>{mealsCount}+</>:'لا توجد أطباق'}</p>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>ضمن تصنيف : {category}</p>
            <p className='text-slate-50 bg-main/75 p-1 px-2 rounded-2xl'>التقييم  : {rating}/5 ({rateNum})</p>
        </span>
    </div>
</Link>
  )
}