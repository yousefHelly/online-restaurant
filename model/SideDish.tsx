import { z } from "zod";

export const SideDishSchema = z.object({
  name: z
    .string({ required_error: "ادخل اسم الطبق الجانبي" })
    .min(3, { message: "اسم اسم الطبق الجانبي يجب الا يقل عن 3 حروف" }),
  image: z.any({ required_error: "اختار صورة" }).refine(
    (image) => {
      if (!!image && (image as FileList).length != 0) return true;
      else return false;
    },
    { message: "اضف صورة للطبق الجانبي" }
  ),
  price: z
    .number({
      required_error: "إدخل سعر الطبق الجانبي",
      invalid_type_error: "إدخل سعر الطبق الجانبي",
    })
    .min(5, { message: "لا يمكن إضافة طبق جانبي اقل من 5 جنيهات" }),
});
export type TSideDishForm = z.infer<typeof SideDishSchema>;
