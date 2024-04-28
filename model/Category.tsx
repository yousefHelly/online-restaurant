import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string({ required_error: "ادخل اسم التصنيف" })
    .min(5, { message: "اسم التصنيف يجب الا يقل عن 5 حروف" }),
  image: z.any({ required_error: "اختار صورة" }).refine(
    (image) => {
      if (!!image && (image as FileList).length != 0) return true;
      else return false;
    },
    { message: "اضف صورة للتصنيف" }
  ),
});
export type TCategoryForm = z.infer<typeof CategorySchema>;
