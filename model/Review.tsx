import { z } from "zod"

export const ReviewSchema = z.object({
    rating:z.number({required_error:'إختار تقييم الطبق من بين 1 الي 5'}).min(0.5,'يجب ان يكون التقييم اكبر من او يساوي 0.5').max(5),
    review:z.string({required_error:'اضف مراجعتك للطبق'})
})
export type ReviewType = z.infer<typeof ReviewSchema>