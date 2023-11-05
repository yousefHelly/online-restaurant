import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import type { Metadata } from 'next'
import Query from '@/lib/Query'
import { NextAuthProvider } from '@/lib/NextAuthProvider'
import { LayoutChanger } from '@/lib/LayoutChanger'
import { Toaster } from 'react-hot-toast'
import ThemeChanger from '@/lib/ThemeChanger'
import MProvider from './../lib/MProvider';

export const metadata: Metadata = {
  title: 'جو فاست فوود | الرئيسية',
  description: 'مرحبًا بك في مطعمنا الإلكتروني ، حيث نقدم لك أشهى الأطباق من جميع أنحاء العالم.  سواء كنت تبحث عن وجبة سريعة أو عشاء رومانسي أو احتفال خاص ، لدينا ما تحتاجه.  يمكنك تصفح قائمتنا المتنوعة والمتجددة ، والتي تشمل المأكولات العربية والإيطالية والهندية والصينية وغيرها الكثير.  يمكنك أيضًا الاستمتاع بخدمة التوصيل المجانية والدفع الآمن عبر الإنترنت .',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="ar" dir='rtl'>
      <MProvider>
      <ThemeChanger>
      <body className='dark:bg-stone-900'>
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
      </MProvider> 
    </html>
  )
}
