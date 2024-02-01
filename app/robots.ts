import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    
    return {
        rules:[{
            userAgent:'*',
            allow:'/',
            disallow:[
                '/api', 
                '/admin', 
                '/checkout/payment-confirmation', 
                '/my-orders', 
                '/profile', 
                '/wishlist'
            ],
        }],
        sitemap:`${process.env.URL}/sitemap.xml`
    }
}