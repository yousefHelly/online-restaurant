import { convert } from "@/lib/ConvertArabicURL";
import { getOrderStatus } from "@/lib/api/server api calls/getOrderStatus";
import axios from "axios";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    const body =  await (req.json() as Promise<{success: boolean, ID?: string, token?: string}>)
    const cookieStore = cookies()
    if(!body.ID && !cookieStore.get('orderState')?.value){
        return new Response('فشل تأكيد الطلبية ، تأكد من كود تتبع الطلبية', {status:400})
    }
    if(!body.ID && body.success){
        const order = JSON.parse(convert(cookieStore.get('orderState')?.value!)) as unknown as PostOrder
        cookieStore.delete('orderState')        
        try {
            const resp = await axios.post<PostOrderResponse>(`${process.env.BACK_END_URL}/api/order`, order, {headers:{
                'token':body.token
            }})
            return new Response(JSON.stringify(resp.data))
        } catch (error) {
            return new Response('فشل تأكيد الطلبية ، برجاء التواصل مع المسؤولين', {status:400})
        }
    } else if (body.ID && body.success){
        try {
            const resp = await getOrderStatus(body.ID)
            return new Response(JSON.stringify(resp))
        } catch (error) {
            return new Response('فشل الحصول علي بيانات الطلبية', {status:404})
        }
    }
    if(!body.success){
        return new Response(undefined)
    }
    return new Response('خطأ في السيرفر', {status:500})
}
