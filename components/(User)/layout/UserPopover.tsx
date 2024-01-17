'use client'
import { Popover, Switch } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Moon, Sun, UserCircle2, LayoutDashboard, UserCog } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
    text?: 'left' | 'bottom'
}

function UserPopover({text}: Props) {
    const [darkMode, setDarkMode] = useState<boolean>(typeof window !='undefined'&&window.localStorage.getItem('theme')==='dark'?true:false)
    const {setTheme} = useTheme()
    darkMode?setTheme('dark'):setTheme('light')
    const {data:session} = useSession()
  return (
    <Popover className="relative mt-2">
    {({ open, close }) => (
        <>
        <Popover.Button className={`focus-within:outline-none flex ${text==='left'?' items-center gap-3':'flex-col justify-center items-center'}`}>
            <Image src={session?.user.provider==='google'?session.user.userImgUrl:session?.user.userImgUrl?session?.user.userImgUrl:'/static/default-user-icon.jpg'} alt="الصورة الشخصية" width={400} height={400} className={`rounded-full object-cover ${text==='left'?'w-10 h-10 mt-1':'w-12 h-12'} border ${open?'border-main':'border-transparent'} `} />
            <span className='text-xs font-bold text-lighterText mt-1'>{session?.user.userName}</span> 
        </Popover.Button>
        <AnimatePresence mode='wait'>
            {
            open && <motion.div initial={{opacity:'0'}} animate={{opacity:1}} exit={{opacity:'0'}} onMouseLeave={()=>close()}>
                            <Popover.Panel className="absolute bg-slate-50 dark:bg-stone-800 rounded-2xl rounded-b-2xl left-1/2 -translate-x-1/2 translate-y-2">
                            <div className="rounded-2xl flex flex-col w-48">
                                <Link onClick={()=>close()} className='rounded-t-2xl px-3 py-2 border-b dark:border-stone-600 flex items-center gap-3 font-bold text-sm dark:text-stone-400 dark:hover:text-slate-50 hover:bg-main hover:text-slate-50 transition duration-150' href={'/profile'}>
                                    <UserCircle2/>
                                    صفحتي الشخصية
                                    </Link>
                                <Link onClick={()=>close()} className='px-3 py-2 border-b dark:border-stone-600  flex items-center gap-3 font-bold text-sm dark:text-stone-400 dark:hover:text-slate-50 hover:bg-main hover:text-slate-50 transition duration-150' href={'/wishlist'}>
                                    <Heart/>
                                    المفضلة
                                </Link>
                                {
                                    session?.user.roles.includes('Admin')&&<Link onClick={()=>close()} className='px-3 py-2 border-b dark:border-stone-600  flex items-center gap-3 font-bold text-sm dark:text-stone-400 dark:hover:text-slate-50 hover:bg-main hover:text-slate-50 transition duration-150' href={'/admin/dashboard'}>
                                    <LayoutDashboard/>
                                    لوحة التحكم
                                </Link>
                                }

                                <Link onClick={()=>close()} className='px-3 py-2 border-b dark:border-stone-600  flex items-center gap-3 font-bold text-sm dark:text-stone-400 dark:hover:text-slate-50 hover:bg-main hover:text-slate-50 transition duration-150' href={'/settings'}>
                                    <UserCog/>
                                    الإعدادات
                                </Link>
                                <div className='flex items-center justify-center p-2 gap-2 border-b dark:border-stone-600 '>
                                    <Moon className='text-main'/>
                                    <Switch
                                    checked={darkMode}
                                    onChange={setDarkMode}
                                    className={`${
                                        darkMode ? 'bg-main' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                                    >
                                        <span className="sr-only">تفعيل الوضع الليلي</span>
                                        <span
                                            className={`${
                                                darkMode ? 'translate-x-[-0.2rem]' : '-translate-x-6'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                        />
                                    </Switch>
                                    <Sun className='text-main'/>
                                </div>
                                <button onClick={()=>signOut()} className='text-main font-bold px-3 py-2 rounded-b-2xl transition duration-150 hover:bg-main hover:text-slate-50'>تسجيل الخروج</button>
                            </div>
                        </Popover.Panel>
                    </motion.div>
            }
        </AnimatePresence>
        </>
    )
    }
        </Popover>
  )
}

export default UserPopover