import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string({required_error:`البريد الإلكتروني مطلوب`}).email({message:'بريد إلكتروني خاطئ'}),
    password: z.string({required_error:`كلمة المرور مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
})
export type Login = z.infer<typeof LoginSchema>