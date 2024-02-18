import { z } from "zod"

export const PasswordUpdateSchema = z.object({
    oldPassword:z.string({required_error:`كلمة المرور القديمة مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'}),
    newPassword:z.string({required_error:`كلمة المرور الجديدة مطلوبة`}).regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*/,{message:'ادخل كلمة مرور تتخطي 8 احرف و تحتوي علي ارقام و حرف كابيتال و رموز'})
  })
export type PasswordUpdate = z.infer<typeof PasswordUpdateSchema>