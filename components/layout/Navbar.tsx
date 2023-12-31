'use client'
import { Popover, Switch } from '@headlessui/react'
import { Search, ShoppingBag, UserCircle2, UserCog, Heart, Sun, Moon, ArrowRightCircle, Loader2Icon, Home, MenuSquare, UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import ItemCart from './ItemCart'
import {motion, AnimatePresence, useScroll, useMotionValueEvent} from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import {useSession, signIn, signOut} from 'next-auth/react'
import Logo from './Logo'
import { links } from '@/Data'
import {useTheme} from 'next-themes'
import useUpdateEmailSession from '@/lib/hooks/useUpdateEmailSession'
import useDishes from '@/lib/api/useDishes'
import NotFound from './NotFound'
import useCart from '@/lib/api/useCart'
type Props = {}

function Navbar({}: Props) {
    const {data:session, status, update} = useSession()
    const pathname = usePathname()
    const {scrollYProgress} = useScroll()
    const [topScreen, setTopScreen]= useState<boolean>(true)
    const [showBtn, setShowBtn]= useState<boolean>(false)
    const circfrn = 2*Math.PI*20
    const circle = useRef<SVGCircleElement>(null)
    const [scrollProgress, setScrollProgress] = useState<string>(`${circfrn}`)
    useMotionValueEvent(scrollYProgress, 'change', (latest)=>{
        const prev = scrollYProgress.getPrevious()
        latest>0?setTopScreen(false):setTopScreen(true);
        (latest<=prev&&latest>0.15)?setShowBtn(true):setShowBtn(false);
        setScrollProgress(`${circfrn - (circfrn*latest)}px`)
    })
    const [hovered, setHovered] = useState(pathname)
    const [darkMode, setDarkMode] = useState<boolean>(typeof window !='undefined'&&window.localStorage.getItem('theme')==='dark'?true:false)
    const {setTheme} = useTheme()
    darkMode?setTheme('dark'):setTheme('light')
    useUpdateEmailSession()
    const router = useRouter()
    const dishes = useDishes(undefined,undefined,undefined,undefined,undefined,undefined,undefined, 'SD')
    const dishActions: SpotlightActionData[] = []
    dishes.data?.meals.forEach((dish)=>{
        dishActions.push({
            id: `${dish.id}`,
            label: dish.name,
            description: `مقدمة من الشيف ${dish.chefName} في تصنيف ${dish.categoryName}`,
            onClick: () => router.push(`/menu/${dish.name}`),
            leftSection: <UtensilsCrossed size={23} className='text-main'/>,
        })})    
    const cart = useCart()
  return (
    <>
    <nav className={`w-full flex items-center justify-between px-12 z-40 sticky top-0 py-4 ${!topScreen?'bg-slate-50/75 dark:bg-stone-800/75 backdrop-blur-xl':''}`}>
        <Logo/>
        <div className='flex gap-10 pt-3'>
            {
                links.map((link, i)=>{
                    const isActive = link.href === pathname
                    return(
                        <Link
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
            <button className='flex items-center focus-within:outline-none' onClick={()=>spotlight.open()}>
                    <Search className={`text-lighterText font-bold transition duration-150 hover:text-main cursor-pointer`}/>
                    <span className='flex flex-row-reverse items-center text-header dark:text-stone-300 text-xs  font-bold p-1'>
                        <span className='border dark:border-stone-600 rounded-2xl py-[0.15rem] px-1 bg-slate-100 dark:bg-stone-800 '>Ctrl</span>
                        <span>+</span>
                        <span className='border dark:border-stone-600 rounded-2xl py-[0.15rem] px-1 bg-slate-100 dark:bg-stone-800'>J</span>
                    </span>
            </button>              
        </div>
        <div className={`flex items-center ${session?.user?'gap-10 ml-10 translate-y-2 ':'gap-3 pt-3'}`}>
            <Popover className="relative mt-2 z-30">
            {({ open, close }) => (
                <>
                <Popover.Button className='focus-within:outline-none relative'>
                    <ShoppingBag className={`font-bold transition duration-150 cursor-pointer ${open?'text-main ':'text-lighterText hover:text-main '} `}/>
                    {cart.data&&cart.data.length>0&&<span className={`absolute top-0 right-0 w-3 h-3 rounded-full bg-main text-[0.5rem] pr-[0.08rem] pt-[0.1rem] text-header flex items-center justify-center`}>{cart.data.length}</span>}
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
                                                        <ItemCart key={cartItem.name} close={close}  image={'https://localhost:7166'+cartItem.mealImgUrl} name={cartItem.name} totalPrice={cartItem.totalPrice} status={cartItem.additions} quantity={cartItem.amount}/>
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
                <Popover className="relative mt-2">
            {({ open, close }) => (
                <>
                <Popover.Button className='focus-within:outline-none flex flex-col justify-center items-center'>
                    <img src={session.user.provider==='google'?session.user.userImgUrl:session?.user.userImgUrl?`https://localhost:7166`+session?.user.userImgUrl:'/static/default-user-icon.jpg'} alt="الصورة الشخصية" className={`rounded-full object-cover w-12 h-12 border ${open?'border-main':'border-transparent'} `} />
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
                </>
                :status==='unauthenticated'?
                <>
                    <button onClick={()=>signIn()} className='text-main font-bold px-3 py-2 rounded-2xl transition duration-150 border border-transparent hover:!border-main'>تسجيل الدخول</button>
                    <Link href={`/register`} className='text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main'>إنشاء حساب جديد</Link>
                </>
                :<>
                <Loader2Icon className='animate-spin text-main'/>
                </>
            }
        </div>
    </nav>
    <AnimatePresence mode='wait'>
    {  
    showBtn&&
            <motion.button 
            onClick={()=>window.scrollTo({top:0,left:0,behavior:'smooth'})} 
            initial={{scale:0.5, rotate:'-90deg', opacity:0}} 
            animate={{scale:1, rotate:'-90deg', opacity:1, transition:{damping:200, stiffness:3}}} 
            exit={{scale:0.5, rotate:'-90deg', opacity:0, transition:{damping:200, stiffness:3}}} 
            whileHover={{scale:1.1}} 
            whileTap={{scale:0.9}} 
            title='scroll to top button'
            className='fixed bottom-5 left-5 w-[50px] h-[50px] -rotate-90 z-30 rounded-full bg-main/25 backdrop-blur-sm'
            >
                <svg 
                width={50} 
                height={50}
                >
                    <motion.circle 
                    animate={{strokeDashoffset:scrollProgress}} 
                    cx={25} 
                    cy={25} 
                    ref={circle} 
                    r={20} 
                    className='fill-none stroke-main stroke-2' 
                    style={{strokeDasharray:`${2*Math.PI*20}px`}}
                    />
                </svg>
                <ArrowRightCircle className='fill-main text-slate-50 dark:text-stone-800 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'/>
            </motion.button>
    }
    </AnimatePresence>
    <Spotlight
        classNames={{root:'dark:bg-stone-800', search:'dark:text-stone-300 dark:bg-stone-800', body:'dark:bg-stone-800 ',action:'gap-3', actionSection:'flex justify-center items-center', actionLabel:'dark:text-stone-300'}}
        actions={[
            {
            group:'صفحات',
            actions:[  
            {
                id: 'الرئيسية',
                label: 'الرئيسية',
                description: 'الذهاب الي الصفحة الرئيسية',
                onClick: () => router.push('/'),
                leftSection: <Home size={23} className='text-main'/>,
            },
            {
                id: 'قائمة الطعام',
                label: 'قائمة الطعام',
                description: 'الذهاب الي قائمة الطعام (المنيو)',
                onClick: () => router.push('/menu'),
                leftSection:<MenuSquare size={23} className='text-main'/>,
            },
            {
                id: 'صفحتي الشخصية',
                label: 'صفحتي الشخصية',
                description: 'الذهاب الي صفحتي الشخصية',
                onClick: () => router.push('/profile'),
                leftSection: <UserCircle2 size={23} className='text-main'/>,
            },
            
            
            ]   
            },
            {
                group:'أطباق',
                actions:dishActions
            }
    ]}
        shortcut={'mod + J'}
        nothingFound={<NotFound name='نتائج مطابقة لكلمة البحث'/>}
        highlightQuery
        limit={7}
        searchProps={{
          leftSection: <Search />,
          placeholder: 'إبحث',
        }}
      />
    </>
  )
}

export default Navbar