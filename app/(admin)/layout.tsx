
import AdminNavBar from '@/components/(Admin)/AdminNavBar'
import DashboardAside from '@/components/layout/DashboardAside'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    template:'%s - جو فاست فوود',
    default:'جو فاست فوود'
  },
  themeColor:'#ffa006',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <main className='bg-stone-800 dark:bg-stone-900 flex h-screen overflow-hidden'>
       <DashboardAside/>
        <div className='flex-1 flex flex-col min-h-full py-3 px-2'>
          <AdminNavBar/>
        <section className='bg-stone-800 dark:bg-stone-900 flex h-[92%]'>
            <div className='container w-full h-full rounded-t-xl bg-stone-100 dark:bg-stone-800 m-1 p-5 overscroll-y-auto overflow-y-auto'>
            {
            children
            }
            </div>
        </section>
        </div>
        <Toaster  toastOptions={{className:'dark:bg-stone-800 dark:text-stone-300 dark:border dark:border-stone-600'}}/>
    </main>
  )
}