"use client"

import { useSession } from "next-auth/react"

import {useEffect} from 'react'
import { axiosAuth } from "../api/axios"

const useAxiosAuth = () => {
    const {data: session} = useSession()
    useEffect(
        ()=>{
            const requestIntercept = axiosAuth.interceptors.request.use((config)=>{
                if(!config.headers["token"] && session?.user.token!=undefined){
                    config.headers["token"] = `${session?.user.token}`
                }
                return config
            })
            return ()=>{
                axiosAuth.interceptors.request.eject(requestIntercept)            
            }
        }
    ,[session]);
    return axiosAuth;
};
export default useAxiosAuth