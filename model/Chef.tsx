import { z } from "zod"

export const ChefSchema = z.object({
    name: z.string({ required_error:'ادخل اسم الشيف'}).min(2, {message:'اسم اسم الشيف يجب الا يقل عن 2 حروف'}),
    image: z.any({required_error:'اختار صورة'}).refine((image)=>{
      if(!!image&&(image as FileList).length!=0)
          return true
      else
          return false
      }, {message:'اضف صورة للشيف'}),
    categoryId: z.number({required_error:'إختار التصنيف'})
    })
export type ChefForm = z.infer<typeof ChefSchema>