import { z } from "zod"

export const UserDataSchema = z.object({
    firstName: z.string({required_error:`الاسم الاول مطلوب`}).min(2,{message:'يجب ان يكون الاسم الاول حرفين علي الاقل'}),
    lastName: z.string({required_error:`اسم العائلة مطلوب`}).min(2,{message:'يجب ان يكون اسم العائلة حرفين علي الاقل'}),
    userName: z.string({required_error:`اسم المستخدم مطلوب`}).min(3,{message:'يجب ان يكون اسم المستخدم 3 احرف علي الاقل'}),
  })
export type User = z.infer<typeof UserDataSchema>