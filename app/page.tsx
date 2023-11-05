import CustomersReviews from "@/components/home/CustomersReviews";
import Features from "@/components/home/Features";
import JoinUs from "@/components/home/JoinUs";
import Landing from "@/components/home/Landing";
import MeetOurChefs from "@/components/home/MeetOurChefs";
import OurBranches from "@/components/home/OurBranches";
import TopSellingDishes from "@/components/home/TopSellingDishes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-20 px-12 xl:px-24 overflow-x-hidden dark:bg-stone-900">
      <Landing/>
      <Features/>
      <TopSellingDishes/>
      <MeetOurChefs/>
      <OurBranches/>
      <CustomersReviews/>
      <JoinUs/>
    </main>
  )
}
