import { z } from "zod"

export const ForgetPasswordSchema = z.object({
    email: z.string({required_error:`البريد الإلكتروني مطلوب`}).email({message:'بريد إلكتروني خاطئ'}),
})
export type ForgetPassword = z.infer<typeof ForgetPasswordSchema>