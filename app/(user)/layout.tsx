import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: {
      template:'%s - جو فاست فوود',
      default:'جو فاست فوود'
    },
    description: 'مرحبًا بك في مطعمنا الإلكتروني ، حيث نقدم لك أشهى الأطباق من جميع أنحاء العالم.  سواء كنت تبحث عن وجبة سريعة أو عشاء رومانسي أو احتفال خاص ، لدينا ما تحتاجه.  يمكنك تصفح قائمتنا المتنوعة والمتجددة ، والتي تشمل المأكولات العربية والإيطالية والهندية والصينية وغيرها الكثير.  يمكنك أيضًا الاستمتاع بخدمة التوصيل المجانية والدفع الآمن عبر الإنترنت .',
    twitter:{
      card:'summary_large_image'
    },
    themeColor:'#ffa006',
  }
function UserPagesLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
  return (
    <main className="min-h-[35vh] flex flex-col items-start py-2 md:py-0 px-8 md:px-24 overflow-x-hidden">
        <div className='flex flex-col gap-5 w-full'>
            {
                children
            }
        </div>
    </main>
    )
}

export default UserPagesLayout