'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import SideInformativeImg from '@/components/layout/SideInformativeImg'
import {useSession} from 'next-auth/react'
import toast from 'react-hot-toast'
import DataRegisteration from '@/components/register/DataRegisteration'
import AccountVerification from '@/components/register/AccountVerification'
import { axiosAuth } from '@/lib/api/axios'
import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import useAddress from '@/lib/api/UseAddress'
import NotFound from '@/components/layout/NotFound'
type Props = {}

function RegisterPage({}: Props) {
    const [step, setStep] = useState<1 | 2 | 3>(3)
    const [loginData, setLoginData] = useState<{email: string, password: string}>({email:'', password:''})
    const [verCode, setVerCode] = useState('')
    const router = useRouter()
    const {data} = useSession()
    const [image, setImage] = useState<FileList | null>(null)
    useAxiosAuth()
    const {data:session, update} = useSession()
    async function updateImg(img:FileList) {
        axiosAuth.put<UpdateAuth>('https://localhost:7166/api/Auth/updateAccount',{UserImg:img.item(0)},{headers: { "Content-Type": "multipart/form-data" }}).then(async(res)=>{await update({...session,user:res.data.user});toast.success(res.data.message)}).catch((err)=>toast.error(err.data.message))
    }
    useEffect(()=>{
    if(image!=null){
        updateImg(image)
    }
    },[image])
    const {data:addresses} = useAddress()

    return (
    <main className='grid grid-cols-12 p-1 h-screen'>
        <SideInformativeImg header='سجل الأن' description='لتتمكن من إكمال طلباتك و تستمتع بالحصول علي وجباتك في خلال دقائق'/>
        <div className='col-span-8 flex flex-col items-start gap-3 p-2 overflow-hidden'>
            <div className='steps flex items-center w-full justify-center my-12'>
               <div className='relative'> <span className='p-2 rounded-full w-12 h-12 flex items-center justify-center bg-main text-slate-50 text-xl'><span className={`flex flex-col gap-1 ${step===1?'animate-bounce':''}`}>1</span></span><p className='absolute w-[7rem] -bottom-5 left-1/3 -translate-x-1/2 text-xs font-bold text-lighterText'>إدخال بيانات الحساب</p></div>
                <span className={`w-24 h-1 relative after:content-[''] after:absolute after:h-1 bg-slate-300 after:bg-main/50 dark:bg-main after:transition after:duration-150  ${step>1?'after:w-full':' after:w-0'}`}></span>
                <div className='relative'> <span className={`p-2 rounded-full w-12 h-12 flex items-center justify-center text-xl ${step>=2?'bg-main text-slate-50':'bg-slate-300 text-header'}`}><span className={`flex flex-col gap-1 ${step===2?'animate-bounce':''}`}>2</span></span><p className='absolute w-[5rem] -bottom-5 left-1/3 -translate-x-1/2 text-xs font-bold text-lighterText'>تأكيد الحساب</p></div>
                <span className={`w-24 h-1 ${step>2?'bg-main/50 dark:bg-main':'bg-slate-300'}`}></span> 
                <div className='relative'> <span className={`p-2 rounded-full w-12 h-12 flex items-center justify-center text-xl ${step===3?'bg-main text-slate-50':'bg-slate-300 text-header'}`}><span className={`flex flex-col gap-1 ${step===3?'animate-bounce':''}`}>3</span></span><p className='absolute w-[7rem] -bottom-5 left-1/3 -translate-x-1/2 text-xs font-bold text-lighterText'>إكمال بيانات الحساب</p></div>
            </div>
            <AnimatePresence mode='wait'>
                {/* STEP 1 DATA REGISTERATION */}
            {
                step===1&&<DataRegisteration setVerCode={setVerCode} setLoginData={setLoginData} setStep={setStep}/>
            }
                {/* STEP 2 ACCOUNT VERIVICATION */}
            {
                step===2&& <AccountVerification loginData={loginData} verCode={verCode} setStep={setStep}/>
            }
                {/* STEP 3 PROFILE COMPLETION */}
            {
                step===3&& <motion.div key={3} initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} className='w-4/5 mx-auto'>
                <h3 className='text-3xl font-bold text-header dark:text-stone-300 font-header'>إكمال بيانات الحساب</h3>
                <div className='flex flex-col w-full my-10'>
                    <div className='flex flex-col w-full '>
                        <h4 className='text-header dark:text-stone-300 font-header text-xl font-bold'>ارفع صورة لملفك الشخصي !</h4>
                        <div className='flex flex-col items-center justify-center my-2'>
                            <div className='group relative overflow-hidden'>
                                <input onChange={(e)=>{e.target.files&&setImage(e.target.files);}} type="file" hidden id='profile' name='profile' accept='image/png, image/jpeg' />
                                <label htmlFor="profile" className='z-30'>
                                    <img src={image&&URL.createObjectURL(image[0]) ||'/static/default-user-icon.jpg'} alt={data?.user.userName} className='rounded-full h-[75px] w-[75px] object-cover'></img>
                                    <span className='absolute h-[75px] w-[75px] rounded-full bg-main/75 backdrop-blur-md flex justify-center items-center -bottom-[100%] group-hover:bottom-0 text-slate-50 font-bold text-xs cursor-pointer'>رفع صورة</span>
                                </label>
                            </div>
                            <p className='text-lighterText font-bold text-sm my-2'>{data?.user.userName}</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className='text-xl font-bold font-header'>اضف عنوان :</p>
                      {
                        addresses?addresses.map((address, i)=>{
                            return (
                              <motion.div key={i} initial={{opacity:0}} animate={{opacity:1, transition:{duration:0.7}}} className={`my-4 cursor-pointer hover:bg-main/20 py-2 px-3 rounded-2xl`}>
                                <div className='flex flex-col gap-3'>
                                  <span className={`px-3 py-2 rounded-2xl transition duration-150`}>عنوان<span className='text-sm font-bold text-main'>{address.id}#</span></span>
                                  <p className='px-6 text-lighterText dark:text-stone-400 text-sm font-bold'>شقة رقم {address.departmentNum}، {address.street}، {address.city}، هاتف :{address.phoneNumber}</p>
                                </div>
                            </motion.div>
                            )
                          }):<NotFound name='عناوين'/>
                      }
                      <button className='flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:bg-transparent hover:text-main transition duation-150'>
                        <Plus/>
                        عنوان جديد
                      </button>
                      </div>
                      <div className='flex flex-row-reverse mt-8 mx-auto gap-3'>
                            <button disabled={image===null} onClick={()=>router.replace(`/`)} className={`'self-center flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 disabled:text-header bg-main dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-slate-400  disabled:hover:text-header transition duation-150`}>
                                حفظ
                            </button>  
                            <button onClick={()=>router.replace(`/`)} className='self-center flex gap-1 items-center px-3 py-2 rounded-2xl text-lighterText dark:text-stone-400 font-bold bg-transparent dark:hover:bg-stone-700 hover:bg-slate-200 transition duation-150'>
                                تخطي
                            </button> 
                      </div>
                </div>
                </motion.div>
            }
            </AnimatePresence>
        </div>
    </main>
  )
}

export default RegisterPage