import BreadCrumb from '@/components/layout/BreadCrumb'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template:'%s - جو فاست فوود',
    default:'جو فاست فوود'
  },
  description: 'يمكنك تصفح قائمة الطعام الخاصة بنا بكل سهولة مع امكانية الاختيار حسب تصنيف الطبق او الشيف القائم عليه.',
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div>
            <BreadCrumb/>
            {children}
        </div>
  )
}
