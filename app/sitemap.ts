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
    return [
        ...siteMapForStaticUrls
    ]
}