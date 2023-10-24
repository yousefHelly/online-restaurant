'use client'
import ViewActionTable from '@/components/cart/ViewActionTable'
import { Disclosure, RadioGroup } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React, {useState} from 'react'

type Props = {}

enum Status {
  next,
  current,
  done
}

const steps = [
  {
  step:1,
  },
  {
  step:2,
  },
  {
    step:3,
  },
  {
    step:4
  }
]

const addresses = [
  {
    name:'عنوان 1',
    address:'شارع العشرين فيصل',
    city:'الجيزة',
    phone:'01552505996',
  },
  {
    name:'عنوان 2',
    address:'جامعة حلوان حلوان',
    city:'القاهرة',
    phone:'01245858992',
  },
]
const paymentMethods =[
  {
    name:'paypal',
  },
  {
    name:'دفع عند الإستلام'
  }
]


function CheckoutPage({}: Props) {
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [AddressStep, setAddressStep] = useState(false);
  const [changeState, setChangeState] = useState<boolean>(false);
  const [DonePayment, setDonePayment] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [payment, setpayment] = useState<{name: string}>({name:''});
  (true  && currentStep.step!=steps[1].step && !AddressStep) && setCurrentStep(steps[1])
  return (
    <main className="grid grid-cols-4 pb-20 px-24 overflow-x-hidden gap-5">
      {!DonePayment&&<> <div className='mt-12 col-span-3 flex flex-col w-full bg-slate-100 dark:bg-stone-800 shadow-md border dark:border-stone-600'>
       <Disclosure  defaultOpen={(!true)}>
        {
            ({open, close})=>
                <div className='flex-1 border-b dark:border-stone-600'>
                <div className={`flex items-center px-4  ${open?'bg-slate-100 dark:bg-stone-700':''}`}>
                  <Disclosure.Button  disabled={currentStep.step != steps[0].step}  onClick={()=>setChangeState(!changeState)} className={`py-4 flex items-center justify-between w-full gap-3`}>
                      <div className='flex-1 flex items-start  text-main gap-3'>
                        {currentStep.step===steps[0].step&&<div className="rounded-full border border-main mt-1 h-10 w-10 p-2 flex justify-center items-center"><h3 className='font-bold'>1</h3></div>}
                        {currentStep.step>steps[0].step&&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check rounded-full border border-main mt-1 h-10 p-2"><motion.polyline initial={{ pathLength: 0}} animate={{pathLength:2}} points="20 6 9 17 4 12"/></svg>}
                        <div className='flex flex-col gap-1 justify-start items-start'>
                        {currentStep.step===steps[0].step&&<p className={`font-extrabold text-xl font-header pt-2 text-header dark:text-stone-300 ${currentStep.step===steps[0].step?'text-header dark:text-stone-300 font-extrabold':'text-main'}`}>تسجيل الدخول </p>}
                          {currentStep.step>steps[0].step&&<><p className='font-bold text-xl font-header'>تم تسجيل الدخول </p>
                          <span className='text-lighterText dark:text-stone-400 text-sm font-bold'>ك <Link href={`/profile`} className='font-extrabold hover:text-main transition duration-150'>يوسف الحلي</Link> ليس انت؟ <button className='font-extrabold hover:text-main transition duration-150'>تسجيل خروج</button></span></>}
                        </div>
                      </div>
                  </Disclosure.Button>
                  <span>
                  </span>
                </div>
                <AnimatePresence mode='wait'>
                {
                    open&&<Disclosure.Panel key={1} static >
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height:0}} className='px-2 bg-slate-100 dark:bg-stone-700  py-2 flex flex-col gap-3 justify-center items-center border-b'>
                      <p className='text-lighterText font-bold text-sm'>لتتمكن من اكمال طلبك عليك تسجيل الدخول للمتابعة</p>
                      <Link href={`login`} className='text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 hover:text-main hover:bg-transparent transition duration-150'>تسجيل الدخول</Link>
                    </motion.div>
                </Disclosure.Panel>
                }
                </AnimatePresence>
            </div>
        }
      </Disclosure>
      <Disclosure defaultOpen={currentStep.step===steps[1].step}>
        {
            ({open, close})=>
                <div className='flex-1 border-b dark:border-stone-600'>
                <div className={`flex items-center px-4  ${open?'bg-slate-100 dark:bg-stone-700':''}`}>
                  <Disclosure.Button disabled={currentStep.step != steps[1].step} onClick={()=>setChangeState(!changeState)} className={`py-4 flex items-center justify-between w-full gap-3`}>
                      <div className='flex items-start  text-main gap-3'>
                        {currentStep.step<=steps[1].step&&<div className="rounded-full border border-main mt-1 h-10 w-10 p-2 flex justify-center items-center"><h3 className='font-bold'>2</h3></div>}
                        {currentStep.step>steps[1].step&&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check rounded-full border border-main mt-1 h-10 p-2"><motion.polyline initial={{ pathLength: 0}} animate={{pathLength:2}} points="20 6 9 17 4 12"/></svg>}
                        <div className='flex flex-col gap-1 justify-start items-start'>
                        {currentStep.step<=steps[1].step&&<p className={`font-bold text-xl font-header pt-2 ${currentStep.step<steps[1].step?'text-lighterText dark:text-stone-400':currentStep.step===steps[1].step?'text-header dark:text-stone-300 font-extrabold':'text-main'}`}>اختار عنوان التوصيل </p>}
                          {currentStep.step>steps[1].step&&<><p className='font-bold text-xl font-header'>تم اختيار عنوان التوصيل </p>
                          <span className='text-lighterText dark:text-stone-400 text-sm font-bold'>{address} </span></>}
                        </div>
                      </div>
                  </Disclosure.Button>
                  <span>
                  </span>
                </div>
                <AnimatePresence mode='wait'>
                {
                    open&&<Disclosure.Panel key={1} static>
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height:0}} className='px-2 bg-slate-100 dark:bg-stone-700 py-2 flex flex-col justify-center items-center gap-3'>
                    <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:1}}} exit={{opacity:0, transition:{duration:0.1}}} className='w-full flex flex-col justify-start items-start gap-3 px-8'>
                      <p className='text-md font-bold font-header'>اختار عنوان :</p>
                      <RadioGroup value={address} onChange={setAddress}>
                      <AnimatePresence mode='wait'>
                      {
                        addresses.map((address, i)=>{
                          return (
                            <RadioGroup.Option key={i} as={motion.div} initial={{opacity:0}} animate={{opacity:1, transition:{duration:0.7}}} className={`my-4 `} value={address.name}>
                            {({ checked }) => (
                              <div className='flex flex-col gap-3'>
                                <span className={`px-3 py-2 cursor-pointer rounded-2xl transition duration-150 ${checked ? 'bg-main text-slate-50 dark:text-stone-900' : 'hover:bg-main/20'}`}>{address.name}</span>
                                <p className='px-6 text-lighterText dark:text-stone-400 text-sm font-bold'>{address.address}, {address.city}, هاتف :{address.phone}</p>
                              </div>
                            )}
                          </RadioGroup.Option>
                          )
                        })
                      }
                      </AnimatePresence>
                      </RadioGroup>
                      <button className='flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:bg-transparent hover:text-main transition duation-150'>
                        <Plus/>
                        عنوان جديد
                      </button>
                    </motion.div>
                    <button disabled={address===''} className='px-3 py-2 rounded-2xl bg-main text-slate-50 dark:text-stone-900 dark:hover:text-main hover:bg-transparent hover:text-main transition duation-150 dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' onClick={()=>{setAddressStep(true);setCurrentStep(steps[2]); close()}}>التالي</button>
                    </motion.div>
                </Disclosure.Panel>
                }
                </AnimatePresence>
            </div>
        }
      </Disclosure>
      <Disclosure defaultOpen={false}>
        {
            ({open, close})=>
                <div className='flex-1 border-t dark:border-stone-600'>
                <div className={`flex items-center px-4  ${open?'bg-slate-100 dark:bg-stone-700':''}`}>
                  <Disclosure.Button disabled={currentStep.step != steps[2].step} onClick={()=>setChangeState(!changeState)} className={`py-4 flex items-center justify-between w-full gap-3`}>
                      <div className='flex-1 flex items-start  text-main gap-3'>
                        {currentStep.step<=steps[2].step&&<div className="rounded-full border border-main mt-1 h-10 w-10 p-2 flex justify-center items-center"><h3 className='font-bold'>3</h3></div>}
                        {currentStep.step>steps[2].step&&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check rounded-full border border-main mt-1 h-10 p-2"><motion.polyline initial={{ pathLength: 0}} animate={{pathLength:2}} points="20 6 9 17 4 12"/></svg>}
                        <div className='flex flex-col gap-1 justify-start items-start'>
                        {currentStep.step<=steps[2].step&&<p className={`font-bold text-xl font-header pt-2 ${currentStep.step<steps[2].step?'text-lighterText dark:text-stone-400':'text-header dark:text-stone-300'}`}>اختار طريقة الدفع </p>}
                          {currentStep.step>steps[2].step&&<><p className='font-bold text-xl font-header'>تم اختيار طريقة الدفع </p>
                          <span className='text-lighterText text-sm font-bold'>{payment.name}</span></>}
                        </div>
                      </div>
                  </Disclosure.Button>
                  <span>
                  </span>
                </div>
                <AnimatePresence mode='wait'>
                {
                    open&&<Disclosure.Panel key={1} static >
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: 'auto'}} exit={{opacity:0, height:0}} className='px-2 bg-slate-100 dark:bg-stone-700 py-2 flex flex-col justify-center items-center gap-3'>
                    <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:1}}} exit={{opacity:0, transition:{duration:0.1}}} className='w-full flex flex-col justify-start items-start gap-3 px-8'>
                      <p className='text-md font-bold font-header'>اختار طريقة دفع :</p>
                      <RadioGroup value={payment} onChange={setpayment}>
                      {
                        paymentMethods.map((payment, i)=>{
                          return (
                            <RadioGroup.Option key={i} as={motion.div} initial={{opacity:0}} animate={{opacity:1, transition:{duration:0.7}}} className={`my-4 `} value={payment}>
                            {({ checked }) => (
                              <div className='flex flex-col gap-3'>
                                <span className={`px-3 py-2 cursor-pointer rounded-2xl transition duration-150 ${checked ? 'bg-main text-slate-50 dark:text-stone-900 ' : 'hover:bg-main/20'}`}>{payment.name}</span>
                              </div>
                            )}
                          </RadioGroup.Option>
                          )
                        })
                      }
                      </RadioGroup>
                    </motion.div>
                    <button disabled={payment.name===''} className='px-3 py-2 rounded-2xl bg-main dark:text-stone-900 dark:hover:text-main text-slate-50 hover:bg-transparent hover:text-main transition duation-150 dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' onClick={()=>{setCurrentStep(steps[3]); close()}}>التالي</button>
                    </motion.div>
                </Disclosure.Panel>
                }
                </AnimatePresence>
            </div>
        }
      </Disclosure>
      </div>
      <ViewActionTable action={setDonePayment} actionName='تأكيد الطلب' disable={currentStep.step}/> </>}
    </main>
  )
}

export default CheckoutPage