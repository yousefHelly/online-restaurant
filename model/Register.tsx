import { z } from "zod"

export const RegisterSchema = z.object({
    firstName: z.string({required_error:`الاسم الاول مطلوب`}).min(2,{message:'يجب ان يكون الاسم الاول حرفين علي الاقل'}),
    lastName: z.string({required_error:`اسم العائلة مطلوب`}).min(2,{message:'يجب ان يكون اسم العائلة حرفين علي الاقل'}),
    userName: z.string({required_error:`اسم المستخدم مطلوب`}).min(3,{message:'يجب ان يكون اسم المستخدم 3 احرف علي الاقل'}),
    email: z.string({required_error:`البريد الإلكتروني مطلوب`}).email({message:'بريد إلكتروني خاطئ'}),
    password: z.string({required_error:`كلمة المرور مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
})
export type Register = z.infer<typeof RegisterSchema>