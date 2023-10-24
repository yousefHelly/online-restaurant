'use client'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { PenBox, PlusCircle, XOctagon } from 'lucide-react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from 'zod';
import { axiosAuth } from '@/lib/api/axios';
import toast from 'react-hot-toast';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useQueryClient } from 'react-query';

export default function AddressModal({isOpen, setIsOpen, address}:{isOpen: boolean, setIsOpen:(state: boolean)=>void,address?: Partial<Address>}){
    const AddressSchema = z.object({
        street: z.string({ required_error:'ادخل اسم الشارع'}),
        city: z.string({ required_error:'ادخل اسم المدينة او المحافظة'}),
        departmentNum: z.number({required_error:'ادخل رقم المبني', invalid_type_error:'ادخل رقم صحيح'}),
        phoneNumber: z.string({ required_error:'ادخل رقم الهاتف'}).min(11, 'رقم الهاتف يجب ان يكون 11 رقم').max(11, 'رقم الهاتف يجب ان يكون 11 رقم')
      })
      type AddressInput = z.infer<typeof AddressSchema>
      useAxiosAuth()
      const queryClient = useQueryClient()
    return(
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='relative z-[999]'
        >
          <div className="fixed inset-0 dark:bg-stone-950/30 bg-black/30 backdrop-blur-md" aria-hidden="true" />
          <motion.div initial={{y:25, opacity:0}} animate={{y:0,opacity:1}} exit={{y:25, opacity:0}} className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className='bg-stone-100 dark:bg-stone-800 border dark:border-stone-600 rounded-2xl p-4'>
              <Dialog.Title className={`text-2xl font-bold text-heaader pb-4 border-b dark:border-stone-600 dark:text-stone-300 font-header flex items-center gap-3`}>
                {address?<><PenBox className='text-main mt-1'/>تعديل عنوان</>:<><PlusCircle className='text-main mt-1'/>إضافة عنوان جديد</>}
                </Dialog.Title>
              <Formik<AddressInput>
                initialValues={{
                  city:address?.city||'',
                  departmentNum:address?.departmentNum||1,
                  phoneNumber:address?.phoneNumber||'',
                  street:address?.street||'',
                }}
                enableReinitialize
                validationSchema={toFormikValidationSchema(AddressSchema)}
                onSubmit={(vals)=>{
                  console.log(vals)
                  if(address){
                    axiosAuth.put(`/api/address/${address.id}`,vals).then((res)=>toast.success(res.data.message)).catch((err)=>toast.error(err.data.message))
                  }else{
                    axiosAuth.post('/api/address',vals).then((res)=>toast.success(res.data.message)).catch((err)=>toast.error(err.data.message))
                  }
                  setIsOpen(false)
                }}
              >
                {
                  ({errors, touched, values, initialValues})=>{
                    return <Form className='grid grid-cols-2 gap-4 mt-6'>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor="departmentNum">رقم الشقة / المكتب</label>
                      <Field type='number' min='1' className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='departmentNum' name='departmentNum'/>
                      {(errors.departmentNum && touched.departmentNum)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='departmentNum' id='departmentNum'/></span>}
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor="street">الشارع</label>
                      <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='street' name='street'/>
                      {(errors.street && touched.street)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='street' id='street'/></span>}
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor="city">المدينة / المحافظة</label>
                      <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='city' name='city'/>
                      {(errors.city && touched.city)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='city' id='city'/></span>}
                    </div>
                    <div className='flex flex-col gap-3'>
                      <label className='text-header dark:text-stone-300 font-bold' htmlFor="phoneNumber">رقم الهاتف</label>
                      <Field className={`border dark:border-stone-600 px-3 py-2 rounded-2xl focus-within:border-dotted focus-within:border-main dark:focus-within:border-main focus-within:outline-none`} id='phoneNumber' name='phoneNumber'/>
                      {(errors.phoneNumber && touched.phoneNumber)&&<span className='flex items-center gap-1 text-xs text-red-500 font-bold'><XOctagon size={16} className='mt-1'/><ErrorMessage name='phoneNumber' id='phoneNumber'/></span>}
                    </div>
                    <button className='col-span-1 w-40 mr-auto px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='reset' onClick={()=>{setIsOpen(false)}}>إلغاء</button>
                    <button disabled={values.departmentNum===initialValues.departmentNum && values.street===initialValues.street && values.city===initialValues.city && values.phoneNumber ===initialValues.phoneNumber || errors.departmentNum!=undefined || errors.street!=undefined || errors.city!=undefined || errors.phoneNumber!=undefined} className='col-span-1 w-40 px-8 py-2 text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-800 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
                  </Form>
                  }
                }
              </Formik>
            </Dialog.Panel>
          </motion.div>
        </Dialog>
    )
}