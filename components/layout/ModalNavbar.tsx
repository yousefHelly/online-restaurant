'use client'

import { Dialog, Popover } from '@headlessui/react'
import React, {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircleIcon, Loader2Icon, ShoppingBag, XCircleIcon } from 'lucide-react';
import { links } from '@/Data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import UserPopover from '../(User)/layout/UserPopover';
import ItemCart from './ItemCart';
import NotFound from './NotFound';
import useCart from '@/lib/api/useCart';
import { signIn, useSession } from 'next-auth/react';
type Props = {
    isOpen: boolean,
    setIsOpen: (val: boolean)=>void,
}
function ModalNavbar({isOpen, setIsOpen}: Props) {
    const pathname = usePathname()
    const [hovered, setHovered] = useState(pathname)
    const cart = useCart()
    const {data:session, status, update} = useSession()

  return (
    <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className='relative z-[999]'
  >
    <div className="fixed inset-0 dark:bg-stone-950/30 bg-black/30 backdrop-blur-md" aria-hidden="true" />
    <motion.div initial={{x:-25, opacity:0}} animate={{x:0,opacity:1}} exit={{x:-25, opacity:0}} className="fixed left-0 top-0 p-4 h-screen flex w-64 items-start justify-start bg-stone-100 dark:bg-stone-800 border-r dark:border-stone-600">
      <Dialog.Panel className='py-2 px-5'>
        <div className='flex flex-col items-center gap-5'>
        <Logo onClick={()=>setIsOpen(false)} color={'text-main transition'} iconColor={`text-stone-600 dark:text-main`} fontSize='text-xl font-bold' iconSize='24'/>
            {
                links.map((link, i)=>{
                    const isActive = link.href === pathname
                    return(
                        <Link
                        onClick={()=>setIsOpen(false)}
                        key={i} 
                        href={link.href} 
                        className={`navlink font-bold transition relative duration-150 px-3 py-2 hover:text-main ${isActive?'text-main':'text-lighterText'}`}
                        onMouseOver={()=>setHovered(link.href)}
                        data-active={isActive}
                        onMouseLeave={()=>setHovered(pathname)}
                        >
                        <span>{link.title}</span>
                        {
                            link.href===hovered && (
                                <motion.div
                                className='absolute bottom-0 left-0 w-full h-full bg-main/25 rounded-md -z-10'
                                layoutId='navbar'
                                aria-hidden='true'
                                transition={{
                                    type:'spring',
                                    bounce:0.25,
                                    stiffness:130,
                                    damping:9,
                                    duration:0.3
                                }}
                                />
                            )
                        }
                    </Link>
                    )
                })
            }
                <div className={`flex items-center ${status==='authenticated'?'flex-row':'flex-col'} ${session?.user?'gap-10 ml-10 translate-y-2 ':'gap-5'}`}>
                <Popover className="relative mt-2 z-30">
                {({ open, close }) => (
                    <>
                    <Popover.Button className='focus-within:outline-none relative'>
                        <ShoppingBag className={`font-bold transition duration-150 cursor-pointer ${open?'text-main ':'text-lighterText hover:text-main '} `}/>
                        {cart.data&&cart.data.length>0&&<span className={`absolute top-0 right-0 w-3 h-3 rounded-full bg-main text-[0.5rem] pr-[0.07rem] pt-[0.1rem] text-header flex items-center justify-center`}>{cart.data.length}</span>}
                    </Popover.Button>
                    <AnimatePresence mode='wait'>
                        {
                            open && <motion.span initial={{opacity:'0'}} animate={{opacity:1}} exit={{opacity:'0'}} onMouseLeave={()=>close()}>
                                            <Popover.Panel className="absolute bg-slate-50 dark:bg-stone-800 rounded-b-2xl left-1/2 -translate-x-1/2 translate-y-4">
                                            <div className="px-2 py-2 flex flex-col w-[275px] h-[250px] overflow-y-scroll overscroll-none mb-6 relative after:content-[''] after:fixed after:-translate-y-8 after:bottom-0 after:left-0 after:w-full after:h-[20%] after:bg-gradient-to-b after:from-transparent after:via-slate-50/50 dark:after:via-stone-800/50 dark:after:to-stone-800 after:to-slate-50">
                                                <p className='text-center mx-auto font-header font-bold text-xl text-header dark:text-stone-300 pb-2'>سلة التسوق</p>
                                                {
                                                    cart.data&&cart.data?.length>0?cart?.data.map((cartItem)=>{
                                                        return(
                                                            <ItemCart key={cartItem.name} close={close}  image={cartItem.mealImgUrl} name={cartItem.name} totalPrice={cartItem.totalPrice} status={cartItem.additions} quantity={cartItem.amount}/>
                                                        )
                                                    }):<NotFound name='أطباق'/>
                                                }
                                            </div>
                                            <Link href={'/cart'} onClick={()=>close()}  className='absolute z-[100] bottom-0 w-[275px] bg-main text-slate-50 dark:text-stone-900 font-bold text-center rounded-b-2xl py-2 font-header'>عرض السلة</Link>
                                        </Popover.Panel>
                                        </motion.span>
                        }
                    </AnimatePresence>
                    </>
                )
                }
                </Popover>
                {status==='authenticated'?
                <>
                    <UserPopover/>
                    </>
                    :status==='unauthenticated'?
                    <>
                        <button onClick={()=>signIn()} className='text-main font-bold px-3 py-2 rounded-2xl transition duration-150 border border-transparent hover:!border-main'>تسجيل الدخول</button>
                        <Link href={`/register`} className={`${'text-stone-900'} dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main`}>إنشاء حساب جديد</Link>
                    </>
                    :<>
                    <Loader2Icon className='animate-spin text-main'/>
                    </>
                }
            </div>
        </div>
      </Dialog.Panel>
    </motion.div>
  </Dialog>
  )
}

export default ModalNavbar