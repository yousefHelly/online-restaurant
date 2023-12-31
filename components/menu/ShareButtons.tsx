import { Twitter, Mail, Facebook } from 'lucide-react'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'next-share'
import React from 'react'

function ShareButtons({mealName}: {mealName: string}) {
  return (
    <div className='self-start flex py-2 gap-1 lg:gap-3 items-center dark:text-stone-400'>
    شارك الطبق عبر :
    <EmailShareButton
    url={`https://localhost:3000/menu/${mealName}`}
    subject={`جرب ${mealName} معي !`}
    body={`جرب معي ${mealName} من مطعم جو فاست فوود ! \n`}
    >
        <Mail className='text-main bg-transparent p-2 hover:bg-main hover:text-slate-50 dark:hover:text-stone-900 rounded-xl transition duration-150 w-10 h-10 flex item-center justify-center'/>
    </EmailShareButton>
    <FacebookShareButton
    url={`https://localhost:3000/menu/${mealName}`}
    quote={`جرب معي ${mealName} من مطعم جو فاست فوود ! \n`}
    hashtag={`#${mealName} #جو_فاست_فوود`}
    >
        <Facebook className='text-main bg-transparent p-2 hover:bg-main hover:text-slate-50 dark:hover:text-stone-900 rounded-xl transition duration-150 w-10 h-10 flex item-center justify-center'/>
    </FacebookShareButton>
    <TwitterShareButton
    url={`\n https://localhost:3000/menu/${mealName}`}
    title={`جرب معي ${mealName} من مطعم جو فاست فوود ! \n`}
    >
        <Twitter className='text-main bg-transparent p-2 hover:bg-main hover:text-slate-50 dark:hover:text-stone-900 rounded-xl transition duration-150 w-10 h-10 flex item-center justify-center'/>
    </TwitterShareButton>
    <WhatsappShareButton
    url={`https://localhost:3000/menu/${mealName}`}
    title={`جرب معي ${mealName} من مطعم جو فاست فوود ! \n`}
    separator=""
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"  className='text-main bg-transparent p-2 hover:bg-main hover:text-slate-50 dark:hover:text-stone-900 rounded-xl transition duration-150 w-10 h-10 flex item-center justify-center'>
            <path fill="currentColor" d="M8 0a8 8 0 11-4.075 14.886L.658 15.974a.5.5 0 01-.632-.632l1.089-3.266A8 8 0 018 0zm0 1a7 7 0 00-5.915 10.745.5.5 0 01.052.426l-.846 2.539 2.54-.846a.5.5 0 01.425.052A7 7 0 108 1zM5.214 4.004c.131 0 .262 0 .376.005.12.008.282-.05.443.363.164.425.558 1.472.607 1.577.05.105.082.23.018.371-.066.142-.1.231-.198.353-.098.125-.206.277-.296.371-.098.107-.201.22-.085.433.113.211.51.908 1.094 1.469.753.724 1.386.949 1.584 1.054.196.106.312.086.425-.053.116-.14.491-.619.623-.832.131-.211.263-.178.443-.105.18.07 1.149.582 1.345.687.198.108.33.162.378.25.05.09.05.514-.113 1.008-.165.496-.95.949-1.329 1.01-.34.053-.77.075-1.241-.086a10.466 10.466 0 01-1.121-.447c-1.975-.92-3.265-3.06-3.363-3.2C4.705 8.092 4 7.082 4 6.038c0-1.042.508-1.556.688-1.767a.699.699 0 01.526-.266z"/>
        </svg>
    </WhatsappShareButton>
</div>
  )
}

export default ShareButtons