import React from 'react'

type Props = {
    step?: 1 | 2 | 3
}

function StepIndicator({step=1}: Props) {
  return (
    <div className='steps flex items-center w-full justify-center pb-6 lg:my-12'>
      <div className='relative'> 
        <span title='step-1' aria-current={step===1&&true} className='p-2 rounded-full w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center bg-main text-zinc-200 lg:text-slate-50 text-xl'>
          <span className={`text-sm lg:text-md flex flex-col gap-1 ${step===1?'animate-bounce':''}`}>1</span>
        </span>
        <p className='absolute w-[7rem] -bottom-5 -left-0 lg:left-1/3 -translate-x-1/2 text-[0.6rem] lg:text-xs font-bold text-zinc-300 lg:text-lighterText'>إدخال بيانات الحساب</p>
      </div>
      <span className={`w-24 h-1 ${step>1?'bg-main/50 dark:bg-main':'bg-slate-300 lg:bg-slate-300'}`}></span>
      <div className='relative'> 
        <span title='step-2' aria-current={step===2&&true} className={`p-2 rounded-full w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center text-xl ${step>=2?'bg-main text-zinc-200 lg:text-slate-50':'bg-slate-300 text-header'}`}>
          <span className={`text-sm lg:text-md flex flex-col gap-1 ${step===2?'animate-bounce':''}`}>2</span>
        </span>
        <p className='absolute w-[7rem] -bottom-5 -left-3 lg:left-1/3 -translate-x-1/2 text-[0.6rem] lg:text-xs font-bold text-zinc-300 lg:text-lighterText'>تأكيد الحساب</p>
      </div>
      <span className={`w-24 h-1 ${step>2?'bg-main/50 dark:bg-main':'bg-slate-300 lg:bg-slate-300'}`}></span> 
      <div className='relative'>
        <span title='step-3' aria-current={step===3&&true} className={`p-2 rounded-full w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center text-xl ${step===3?'bg-main text-zinc-200 lg:text-slate-50':'bg-slate-300 text-header'}`}>
          <span className={`text-sm lg:text-md flex flex-col gap-1 ${step===3?'animate-bounce':''}`}>3</span>
        </span>
        <p className='absolute w-[7rem] -bottom-5 -left-0 lg:left-1/3 -translate-x-1/2 text-[0.6rem] lg:text-xs font-bold text-zinc-300 lg:text-lighterText'>إكمال بيانات الحساب</p>
      </div>
    </div>
  )
}

export default StepIndicator