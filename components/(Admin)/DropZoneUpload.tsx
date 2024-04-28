import { DishFormType } from "@/model/Dish";
import { useFormikContext } from "formik";
import { Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { UseFormSetValue } from "react-hook-form";
import { TCategoryForm } from "@/model/Category";

type Props = {
  setPreview: (val: { url: null | string }) => void;
  setValue?: UseFormSetValue<DishFormType | TCategoryForm>;
};

function DropZoneUpload<T>({ setPreview, setValue }: Props) {
  // const { setFieldValue } = useFormikContext<T>();

  const onDrop = (acceptedFiles: File[]) => {
    if (setValue) {
      setValue("image", acceptedFiles[0]);
    }
    // else{
    //   setFieldValue('image', acceptedFiles[0]);
    // }
    try {
      setPreview({ url: URL.createObjectURL(acceptedFiles[0]) });
    } catch {
      toast.error("فشل تحميل الصورة تأكد من نوع الملف ثم اعد المحاولة");
      // setFieldValue('image', null)
      setValue && setValue("image", undefined);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/ico": [".ico"],
    },
  });

  return (
    <section>
      <div
        {...getRootProps({
          className:
            "bg-slate-100 dark:bg-stone-700 dark:text-stone-300 border border-dotted border-main flex flex-col gap-3 items-center justify-center p-5 cursor-pointer hover:bg-slate-200 transition duration-150",
        })}
      >
        <input {...getInputProps()} />
        <Upload className='text-lighterText' />
        <p className='text-sm font-bold text-lighterText dark:text-stone-400'>
          ضع صورة هنا ، او اضغط لاختيار صورة
        </p>
      </div>
    </section>
  );
}

export default DropZoneUpload;
