'use client'
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { AlignJustify, BadgePercent, Beef, CakeSlice, ChefHat, LayoutDashboard, Pizza, ShoppingBasket, User } from 'lucide-react'
import { AnimatePresence, motion} from 'framer-motion'
import { NavLink } from '@mantine/core'
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import gsap from 'gsap';

const adminPages = [
    {
        label:'لوحة التحكم',
        icon:<LayoutDashboard/>,
        link:'admin/dashboard',
        relativePages:[]
    },
    {
        label:'التصنيفات',
        icon:<Pizza/>,
        relativePages:[
            {
                label:'كل التصنيفات',
                link:'admin/categories',
            },
            {
                label:'تصنيف جديد',
                link:'admin/categories/new',
            },
        ]
    },
    {
        label:'الشيفات',
        icon:<ChefHat/>,
        relativePages:[
            {
                label:'كل الشيفات',
                link:'admin/chefs',
            },
            {
                label:'شيف جديد',
                link:'admin/chefs/new',
            },
        ]
    },
    {
        label:'الأطباق',
        icon:<Beef/>,
        relativePages:[
            {
                label:'كل الأطباق',
                link:'admin/dishes',
            },
            {
                label:'طبق جديد',
                link:'admin/dishes/new',
            },
        ]
    },
    {
        label:'الأطباق الجانبية',
        icon:<CakeSlice/>,
        relativePages:[
            {
                label:'كل الأطباق الجانبية',
                link:'admin/side-dishes',
            },
            {
                label:'طبق جانبي جديد',
                link:'admin/side-dishes/new',
            },
        ]
    },
    {
        label:'الأعضاء',
        icon:<User/>,
        relativePages:[
            {
                label:'كل الأعضاء',
                link:'admin/users',
            },
        ]
    },
    {
        label:'الطلبات',
        icon:<ShoppingBasket/>,
        relativePages:[
            {
                label:'كل الطلبات',
                link:'admin/orders',
            },
        ]
    },
    {
        label:'الخصومات',
        icon:<BadgePercent/>,
        relativePages:[
            {
                label:'اكواد الخصم',
                link:'admin/discount-codes',
            },
        ]
    },
]

const containerVariants = {
    expanded: { width: '16.666667%', transition: { type: 'spring' } },
    collapsed: { width: '5%', transition: { type: 'spring' } },
  };

type Props = {}

function PageItem ({i, expanded, pathName, page}:{i: number, expanded: boolean, pathName: string, page: {
    label: string;
    icon: React.JSX.Element
    link: string
    relativePages: never[];
} | {
    label: string
    icon: React.JSX.Element
    relativePages: {
        label: string
        link: string
    }[];
    link?: undefined
}}) {
    const [opened, setOpened] = useState<boolean>(false)
    useEffect(()=>{
        !expanded&&setOpened(false)
    },[expanded])

    return(
        page.relativePages.length>0?
        
                    expanded?
                    <NavLink defaultOpened={false} opened={opened} onChange={()=>{expanded?setOpened(!opened):setOpened(false)}} key={page.label+'-'+i} active={!!page.relativePages.find((rp)=>pathName==='/'+rp.link) || !!pathName.match(`${page.relativePages[0].link}/*`)} leftSection={page.icon} childrenOffset={'sm'} label={expanded&&page.label}  color='#ffa006' variant={expanded?'light':'filled'} classNames={{root:` ${expanded?'my-1 hover:!bg-main rounded-md':'my-3 hover:!bg-transparent rounded-2xl'} px-4 text-right`,label:` !text-slate-50  ${expanded&&`NavItem-${i} hover:!text-slate-50`}`, body:'NavItem text-right', chevron:`${!expanded&&'!hidden'} !text-slate-50`, section:`${!expanded&&'!p-1 !m-0 w-8 h-8 w-full flex items-center justify-center transition duration-150 rounded-full hover:bg-main hover:!text-stone-800'} !text-slate-50`, children:'!text-slate-50', description:'text-right'}}>
                        {
                            page.relativePages.map((relativePage)=>{
                                return(
                                    <NavLink component={Link} active={pathName==='/'+relativePage.link} color='#ffa006' variant={expanded?'light':'filled'} classNames={{label:'NavItem'}} key={relativePage.label+'-'+i} href={'/'+relativePage.link} label={relativePage.label}></NavLink>
                                )
                            })
                        }
                    </NavLink>:    <NavLink component={Link} key={page.label+'-'+i} active={!!page.relativePages.find((rp)=>pathName==='/'+rp.link) || !!pathName.match(`${page.relativePages[0].link}/*`)} href={'/'+page.relativePages[0].link} leftSection={page.icon} color='#ffa006' variant={expanded?'light':'filled'} classNames={{root:` first-of-type:mt-5 my-3 ${!!page.relativePages.find((rp)=>pathName==='/'+rp.link) || !!pathName.match(`${page.relativePages[0].link}/*`)?'':'hover:!bg-transparent'} rounded-2xl px-4 text-right`, label:'', body:'', section:`!text-slate-50 !p-1 !m-0 w-8 h-8 flex items-center w-full justify-center transition duration-150 rounded-full ${!!page.relativePages.find((rp)=>pathName==='/'+rp.link) || !!pathName.match(`${page.relativePages[0].link}/*`)?'!text-stone-800':'hover:bg-main hover:!text-stone-800'}`}}/>
        :
        <NavLink component={Link} key={page.label+'-'+i} active={pathName.includes(page.link!)} leftSection={page.icon} href={'/'+page.link} label={expanded&&page.label} color='#ffa006' variant={expanded?'light':'filled'} classNames={{root:` first-of-type:mt-7 ${expanded?`my-1 ${pathName.includes(page.link!)?'!text-main hover:!bg-main hover:!text-slate-50':'hover:!bg-main'} rounded-md`:`my-3 ${pathName.includes(page.link!)?'':'hover:!bg-transparent'} rounded-2xl`} px-4 hover:!bg-main  text-right`,label:`${expanded&&`NavItem-${i}`} ${pathName.includes(page.link!)?'':'!text-slate-50'}`, body:'text-right', chevron:'!text-slate-50', section:`${!expanded&&`!p-1 !m-0 w-8 h-8 w-full flex items-center justify-center transition duration-150 rounded-full ${pathName.includes(page.link!)?'!text-stone-800':'hover:bg-main hover:!text-stone-800'}`} !text-slate-50`, children:'!text-slate-50', description:'text-right'}}/>
    )
}


function DashboardAside({}: Props) {

    const [expanded, setExpanded] = useState(true)
    const pathName =  usePathname()
    useEffect(() => {
        const animateNavLinks = async () => { 
        const els = document.querySelectorAll('.text-right.m-f07af9d2.mantine-NavLink-body') 
            await gsap.from(els,{
                opacity:0,
                x:25,
                duration:0.3,
                delay:0.3,
                stagger:{
                    amount:0.3,
                }
            }) 
            await gsap.to(els, {
                opacity:  1,
                x: 0,
                duration: 0.3,
                delay: 0.3,
                stagger: {
                amount: 0.3,
                },
            });
        };
    
        animateNavLinks();
      }, [expanded]);
  return (
    <motion.aside variants={containerVariants} animate={expanded ? 'expanded' : 'collapsed'} transition={{type:'spring'}} className={`admin-aside w-1/6 row-span-full min-h-screen flex flex-col justify-start items-start bg-stone-800 dark:bg-stone-900 py-5`}>
    <div className={`flex align-center justify-between gap-2 w-full px-4`}>
      <motion.div>
        <AnimatePresence>
          {expanded && (
            <motion.span initial={{opacity:0}} animate={{opacity:1, transition:{delay:0.4}}}>
              <Logo expanded={expanded} fontSize={'text-md'} color={'text-slate-50'} iconSize={'18px'} iconColor='text-slate-50' />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div>
        <AlignJustify
          onClick={() => setExpanded(!expanded)}
          size={'24px'}
          className={` mt-1  transition duration-150 cursor-pointer ${expanded?'text-slate-50 hover:text-main':'text-main'}`}
        />
      </motion.div>
    </div>
    <motion.div className='flex flex-col justify-center w-full items-center pr-2'>
        {
            adminPages.map((page, i)=>{
                return (
                    <PageItem key={i} i={i} expanded={expanded} page={page} pathName={pathName}/>
                )
            })
        }
    </motion.div>

    </motion.aside>
  )
}

export default DashboardAside