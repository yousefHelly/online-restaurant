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
import CartModal from './CartModal';
type Props = {
    isOpen: boolean,
    setIsOpen: (val: boolean)=>void,
}
function ModalNavbar({isOpen, setIsOpen}: Props) {
    const pathname = usePathname()
    const [hovered, setHovered] = useState(pathname)
    const cart = useCart()
    const {data:session, status, update} = useSession()
    const [cartModal, setCartModal] = useState(false)

  return (
    <>
    <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className='relative z-[999]'
  >
    <div className="fixed inset-0 dark:bg-stone-950/30 bg-black/30 backdrop-blur-md" aria-hidden="true" />
    <motion.div initial={{x:-25, opacity:0}} animate={{x:0,opacity:1}} exit={{x:-25, opacity:0}} className="fixed left-0 top-0 p-4 h-screen flex w-64 items-start justify-start bg-stone-100 dark:bg-stone-800 border-r dark:border-stone-600">
      <Dialog.Panel className='w-full py-2 px-5'>
        <div className='w-full flex flex-col items-center gap-5'>
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
                <div className={`flex items-center ${status==='authenticated'?'flex-row':'flex-col'} ${session?.user?'flex-col gap-5 ':'gap-5'}`}>
                    <div className='relative cursor-pointer' onClick={()=>{setCartModal(true)}} >
                    {cart.data&&cart.data.length>0&&<span className={`absolute top-0 right-0 w-3 h-3 rounded-full bg-main text-[0.5rem] pl-[0.02rem] pt-[0.1rem] text-header flex items-center justify-center`}>{cart.data.length}</span>}
                    <ShoppingBag className={`font-bold transition duration-150 ${cartModal?'text-main ':'text-lighterText hover:text-main '} `}/>
                    </div>
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
  <AnimatePresence mode='wait'>
        {
            cartModal&&<CartModal isOpen={cartModal} setIsOpen={setCartModal}/>
        }
    </AnimatePresence>
  </>
  )
}

export default ModalNavbar