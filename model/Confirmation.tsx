import { z } from "zod"

export const ConfirmSchema = z.object({
    confirmationCode:z.string({required_error:'رسالة التأكيد مطلوبة'}).min(6,{message:'رسالة التأكيد يجب ان تتكون من 6 ارقام'}).max(6,{message:'رسالة التأكيد يجب ان تتكون من 6 ارقام'})
})
export type Confirm = z.infer<typeof ConfirmSchema>