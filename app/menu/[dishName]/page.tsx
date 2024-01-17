import DishPageContent from "@/components/menu/DishPageContent"
import { convert } from "@/lib/ConvertArabicURL"
import { getDish } from "@/lib/api/server api calls/getDish"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
    params:{
        dishName: string
    }
}

export async function generateMetadata({params:{dishName}}: Props): Promise<Metadata> {
    const arabicName = dishName ? convert(dishName) : undefined
    const DishData = await getDish(arabicName)
    if(!DishData){
      return {
        title: 'طبق غير موجود',
      }
    } else{
      return {
        title: `طبق ${DishData.name}`,
        description:DishData.description || `طبق ${DishData.name} المميز المقدم من الشيف ${DishData.chefName} تحت تصنيف ${DishData.categoryName}`,
        keywords:['go fast food', 'جو فاست فوود', DishData.name,  DishData.chefName, DishData.categoryName],
        authors:{name:"جو فاست فوود", url:process.env.URL},
      }
    }    
}

async function DishViewPage({params:{dishName}}: Props) {
    const arabicName = dishName ? convert(dishName) : undefined
    const DishData = await getDish(arabicName)
    if(!DishData){
        notFound()
    }
    return (
        <DishPageContent dishName={dishName} initialData={DishData}/>
    )
}

export default DishViewPage