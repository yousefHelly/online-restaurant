import React from 'react'

type Props = {
    step?: 1 | 2 | 3
}

function StepIndicator({step=1}: Props) {
  return (
    <div className='steps flex items-center w-full justify-center my-12'>
      <div className='relative'> 
        <span title='step-1' aria-current={step===1&&true} className='p-2 rounded-full w-12 h-12 flex items-center justify-center bg-main text-slate-50 text-xl'>
          <span className={`flex flex-col gap-1 ${step===1?'animate-bounce':''}`}>1</span>
        </span>
        <p className='absolute w-[7rem] -bottom-5 left-1/3 -translate-x-1/2 text-xs font-bold text-lighterText'>إدخال بيانات الحساب</p>
      </div>
      <span className={`w-24 h-1 ${step>1?'bg-main/50 dark:bg-main':'bg-slate-300'}`}></span>
      <div className='relative'> 
        <span title='step-2' aria-current={step===2&&true} className={`p-2 rounded-full w-12 h-12 flex items-center justify-center text-xl ${step>=2?'bg-main text-slate-50':'bg-slate-300 text-header'}`}>
          <span className={`flex flex-col gap-1 ${step===2?'animate-bounce':''}`}>2</span>
        </span>
        <p className='absolute w-[5rem] -bottom-5 left-1/3 -translate-x-1/2 text-xs font-bold text-lighterText'>تأكيد الحساب</p>
      </div>
      <span className={`w-24 h-1 ${step>2?'bg-main/50 dark:bg-main':'bg-slate-300'}`}></span> 
      <div className='relative'>
        <span title='step-3' aria-current={step===3&&true} className={`p-2 rounded-full w-12 h-12 flex items-center justify-center text-xl ${step===3?'bg-main text-slate-50':'bg-slate-300 text-header'}`}>
          <span className={`flex flex-col gap-1 ${step===3?'animate-bounce':''}`}>3</span>
        </span>
        <p className='absolute w-[7rem] -bottom-5 left-1/3 -translate-x-1/2 text-xs font-bold text-lighterText'>إكمال بيانات الحساب</p>
      </div>
    </div>
  )
}

export default StepIndicator