'use client'
import React,{useState} from 'react'
import DataRegisteration from '@/components/register/DataRegisteration'
import AccountVerification from '@/components/register/AccountVerification'
import ProfileCompletion from '@/components/register/ProfileCompletion'
import AddressModal from '@/components/(User)/profile/AddressModal'
import StepIndicator from '@/components/register/StepIndicator'
import { AnimatePresence } from 'framer-motion'

function InputSteps() {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [loginData, setLoginData] = useState<{email: string, password: string}>({email:'', password:''})
    const [verCode, setVerCode] = useState('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedAddress, setSelectedAddress] = useState<Address>()
  return (
    <>
        <div className='col-span-8 flex flex-col items-start gap-3 p-2 overflow-hidden'>
            <StepIndicator step={step}/>
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
                    step===3&& <ProfileCompletion setIsOpen={setIsOpen} setSelectedAddress={setSelectedAddress}/>
                }
            </AnimatePresence>
        </div>
        {/* MODAL FOR ADD/Edit ADDRESS*/}
        <AnimatePresence mode='wait'>
                {isOpen&&<AddressModal isOpen={isOpen} setIsOpen={setIsOpen} address={selectedAddress}/>
                }
        </AnimatePresence> 
    </>
  )
}

export default InputSteps