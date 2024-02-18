import { z } from "zod"

export const AddressSchema = z.object({
    street: z.string({ required_error:'ادخل اسم الشارع'}),
    city: z.string({ required_error:'ادخل اسم المدينة او المحافظة'}),
    departmentNum: z.number({required_error:'ادخل رقم المبني', invalid_type_error:'ادخل رقم صحيح'}),
    phoneNumber: z.string({ required_error:'ادخل رقم الهاتف'}).min(11, 'رقم الهاتف يجب ان يكون 11 رقم').max(11, 'رقم الهاتف يجب ان يكون 11 رقم')
  })
export type AddressInput = z.infer<typeof AddressSchema>