import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

type Props = {}

function Footer({}: Props) {
  return (
    <footer className='py-20 bg-main/10 dark:bg-main/75 px-12'>
        <div className='container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
            <Logo/>
            <div className='flex flex-col items-center lg:items-start gap-5'>
                <Link className='text-header font-bold text-sm hover:underline' href='/menu'>قائمة الطعام</Link>
                <Link className='text-header font-bold text-sm hover:underline' href='/menu/categories'>التصنيفات</Link>
                <Link className='text-header font-bold text-sm hover:underline' href='/menu/chefs'>الشيفات</Link>
            </div>
            <div className='flex flex-col items-center lg:items-start gap-5'>
                <Link className='text-header font-bold text-sm hover:underline' href='/about-us'>عنا</Link>
                <p className='text-header font-bold text-sm'>201552505996+</p>
                <p className='text-header font-bold text-sm'>yousef.helly@gmail.com</p>
            </div>
            <div className='flex justify-evenly items-center'>
            <Link className='bg-main rounded-full p-2 text-slate-50 dark:text-stone-900 dark:hover:fill-stone-900 hover:bg-main/10  transition duration-150' href='/'>
                <Facebook className='fill-main'/>
            </Link>
            <Link className='bg-main rounded-full p-2 text-slate-50 dark:text-stone-900 dark:hover:fill-stone-900 hover:bg-main/10  transition duration-150' href='/'>
                <Instagram className='fill-main'/>
            </Link>
            <Link className='bg-main rounded-full p-2 text-slate-50 dark:text-stone-900 dark:hover:fill-stone-900 hover:bg-main/10  transition duration-150' href='/'>
                <Linkedin className='fill-main'/>
            </Link>  
            <Link className='bg-main rounded-full p-2 text-slate-50 dark:text-stone-900 dark:hover:fill-stone-900 hover:bg-main/10  transition duration-150' href='/'>
                <Twitter className='fill-main'/>
            </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer