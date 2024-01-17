import toast from "react-hot-toast"
import { z } from "zod"
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/ico']
export const DishSchema = z.object({
    name: z.string({ required_error:'ادخل اسم الطبق'}).min(2,{message:'ادخل اسم اكتر من حرفين'}),
    image: z.any({required_error:'اختار صورة'}).refine((image)=>{
        if(!!image&&(image as FileList).length!=0)
            return true
        else
            return false
    }, {message:'اضف صورة للطبق'}),
    categoryId: z.number({required_error:'إختار التصنيف',invalid_type_error:'إختار التصنيف'}).min(1, {message:'إختار التصنيف'}),
    chefId: z.number({required_error:'إختار الشيف',invalid_type_error:'إختار الشيف'}).min(1, {message:'إختار الشيف'}),
    Price: z.number({required_error:'ادخل السعر',invalid_type_error:'ادخل السعر'}).min(10,{message:'لا يمكن إضافة طبق اقل من 10 جنيهات'}),
    oldPrice: z.number({invalid_type_error:'ادخل السعر'}).min(10,{message:'لا يمكن إضافة طبق اقل من 10 جنيهات'}).optional(),
    description: z.string().min(10,{message:'الوصف لا يمكن ان يكون اقل من 10 احرف'}).optional(),
    additions:z.array(z.object({
        id:z.number().optional(),
        name:z.string({required_error:'ادخل اسم الإضافة'}).min(2, {message:"ادخل اسم الإضافة"}),
        choices:z.array(z.object({
            id:z.number().optional(),
            name:z.string({required_error:'ادخل اسم الإختيار'}).min(2, {message:"ادخل اسم الإختيار"}),
            price:z.number({required_error:'ادخل السعر'}).optional(),
            hasPrice:z.boolean(),
        },{required_error:'ادخل الاختيار'}),{required_error:'ادخل الاختيارات'}).min(1, {message:"ادخل الاختيارات"}),
    })).optional()
    })
export type DishFormType = z.infer<typeof DishSchema>