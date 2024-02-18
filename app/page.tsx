import CustomersReviews from "@/components/home/CustomersReviews";
import Features from "@/components/home/Features";
import JoinUs from "@/components/home/JoinUs";
import Landing from "@/components/home/Landing";
import LandingVideo from "@/components/home/LandingVideo";
import MeetOurChefs from "@/components/home/MeetOurChefs";
import OurBranches from "@/components/home/OurBranches";
import TopSellingDishes from "@/components/home/TopSellingDishes";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'الرئيسية - جو فاست فوود'
}

export default function Home() {
  return (
    <>
    <LandingVideo/>
    <main className="flex min-h-screen flex-col items-center justify-between pt-20 px-12 xl:px-24 overflow-x-hidden">
      <Landing/>
      <Features/>
      <TopSellingDishes/>
      <MeetOurChefs/>
      <OurBranches/>
      <CustomersReviews/>
      <JoinUs/>
    </main>
  </>
  )
}
