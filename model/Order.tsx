import { z } from "zod"



export const OrderSchema = z.object({
    isPaid: z.boolean().optional(),
    orderStatus: z.string({required_error:'إختار حالة الطلبية'})   
})
export type OrderForm = z.infer<typeof OrderSchema>