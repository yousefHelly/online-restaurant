'use client'
import React from 'react'
import { Eye, EyeOff } from 'lucide-react';

type Props = {
    eyeSign: boolean,
    setEyeSign: (val: boolean)=>void,
    condition: boolean
}

function ShowHidePassword({eyeSign, setEyeSign, condition}: Props) {
  return (
    <>
        {
        eyeSign?
        <EyeOff className={`cursor-pointer hover:text-main transition duration-150 absolute left-5 top-1/2 -translate-y-1/2 ${condition?'mt-[0.25rem]':'mt-[1.1rem]'}`} data-testid='set-eye-off' onClick={()=>setEyeSign(false)}/>:
        <Eye className={`cursor-pointer hover:text-main transition duration-150 absolute left-5 top-1/2 -translate-y-1/2 ${condition?'mt-[0.25rem]':'mt-[1.1rem]'}`} data-testid='set-eye-on' onClick={()=>setEyeSign(true)}/>}
    </>
  )
}

export default ShowHidePassword