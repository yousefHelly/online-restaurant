import { z } from "zod"

export const ResetPasswordSchema = z.object({
    email: z.string({required_error:`البريد الإلكتروني مطلوب`}).email({message:'بريد إلكتروني خاطئ'}),
    token: z.string(),
    newPassword:z.string({required_error:`كلمة المرور الجديدة مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%_&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
})
export type ResetPassword = z.infer<typeof ResetPasswordSchema>