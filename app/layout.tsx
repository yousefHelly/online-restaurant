import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import type { Metadata } from 'next'
import Query from '@/lib/Query'
import { NextAuthProvider } from '@/lib/NextAuthProvider'
import { LayoutChanger } from '@/lib/LayoutChanger'
import { Toaster } from 'react-hot-toast'
import ThemeChanger from '@/lib/ThemeChanger'
import { ColorSchemeScript ,MantineProvider } from '@mantine/core';
import type { Viewport } from 'next'
import { Almarai, Cairo } from 'next/font/google'

const almarai = Almarai({
  weight:['400', '700', '800'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-almarai',
})
 
const cairo = Cairo({
  weight:['300', '400', '500', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
})
export const metadata: Metadata = {
  title: {
    template:'%s - جو فاست فوود',
    default:'جو فاست فوود'
  },
  description: 'مرحبًا بك في مطعمنا الإلكتروني ، حيث نقدم لك أشهى الأطباق من جميع أنحاء العالم.  سواء كنت تبحث عن وجبة سريعة أو عشاء رومانسي أو احتفال خاص ، لدينا ما تحتاجه.  يمكنك تصفح قائمتنا المتنوعة والمتجددة ، والتي تشمل المأكولات العربية والإيطالية والهندية والصينية وغيرها الكثير.  يمكنك أيضًا الاستمتاع بخدمة التوصيل المجانية والدفع الآمن عبر الإنترنت .',
  twitter:{
    card:'summary_large_image'
  },
}

export const viewport: Viewport = {
  themeColor: '#ffa006',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="ar" dir='rtl'>
      <head>
        <ColorSchemeScript/>
      </head>
      <MantineProvider>
      <ThemeChanger>
      <body className={`${almarai.variable} ${cairo.variable} dark:bg-stone-900 font-cairo`}>
        <NextAuthProvider>
          <Query>
          <LayoutChanger>
            {children}
          </LayoutChanger>
          <Toaster toastOptions={{className:'dark:bg-stone-800 dark:text-stone-300 dark:border dark:border-stone-600'}}/>
          </Query>
        </NextAuthProvider>
      </body>
      </ThemeChanger> 
      </MantineProvider> 
    </html>
  )
}
