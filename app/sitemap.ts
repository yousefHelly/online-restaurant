import { getDishes } from "@/lib/api/server api calls/getDishes";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticUrls: string[] = [
        '', 'login', 'register', 'about-us', 
        'cart', 'checkout', 'menu', 'menu/chefs', 
        'menu/categories', 'menu/all-dishes'
    ]
    const siteMapForStaticUrls: MetadataRoute.Sitemap = staticUrls.map((url)=>{
        return {
            url:`${process.env.URL}/${url}`
        }
    })
    let allDishes: MealCard[] = []
    const DishesData = await getDishes(undefined, undefined, undefined, undefined, undefined, 1, 200)
    let siteMapForDishes: MetadataRoute.Sitemap = []
    if(DishesData?.meals){
        siteMapForDishes = DishesData?.meals.map((meal)=>{
            return {
                url:`${process.env.URL}/${meal.name}`
            }
        })
    }

    return [
        ...siteMapForStaticUrls,
        ...siteMapForDishes
    ]
}