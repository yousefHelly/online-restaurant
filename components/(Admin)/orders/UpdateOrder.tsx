'use client'
import { UpdateOrderStatus } from '@/lib/api/useOrders';
import { OrderForm, OrderSchema } from '@/model/Order';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@mantine/core';
import { XOctagon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import  Select  from 'react-select';

type Props = {
    order: PostOrderResponse
}
enum Status {
    Processing = 'Processing',
    Cooking = 'Cooking',
    Delivering = 'Delivering',
    Delivered = 'Delivered'
}
const orderStatus =  [
    {
        label: 'تم الإستلام',
        value:Status.Processing
    },
    {
        label: 'جاري الطهي',
        value:Status.Cooking
    },
    {
        label: 'جاري التوصيل',
        value:Status.Delivering
    },
    {
        label: 'تم التوصيل',
        value:Status.Delivered
    },
]

function UpdateOrder({order: o}: Props) {
    const {get:g} = useSearchParams()
    const id = g('o')
    const {
        handleSubmit,
        watch,
        control,
        formState: {errors}
      } = useForm<OrderForm>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            isPaid:o.isPaid,
            orderStatus:o.status
        },
      })
      const watchAllFields = watch();
      const updateOrder= UpdateOrderStatus()
      const isFormChanged = () => {
        return (watchAllFields.orderStatus != o.status && watchAllFields.orderStatus != undefined) || watchAllFields.isPaid != o.isPaid
      }
      const onSubmit: SubmitHandler<OrderForm> = (vals)=>{
        if(id){
            updateOrder.mutate({
                id:id,
                isPaid: o.isPaid?undefined:vals.isPaid,
                orderStatus: vals.orderStatus
              })
        }
      }
  return (
    <div className='col-start-4 rounded-2xl bg-slate-200 dark:bg-stone-900 p-4 border border-dashed border-main dark:shadow-md dark:shadow-main/25'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <label className='text-header dark:text-stone-300 font-bold' htmlFor='status'>
                حالة الطلبية
            </label>
            <Controller 
            name='orderStatus'
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select 
                options={orderStatus} 
                isRtl 
                classNames={
                    {
                    loadingIndicator : (state) => "!text-main",
                    control : (state)=> `!border !rounded-2xl dark:!bg-stone-700 dark:!border-stone-600 dark:!text-stone-300 ${state.isFocused&&"!border-main dark:!bg-stone-700 dark:!text-stone-300 !border-dotted !outline-none !shadow-none"}`,
                    option: (state)=>`${state.isSelected?"!bg-main !text-slate-50 dark:!text-stone-900":"!bg-transparent hover:!bg-main/90 dark:hover:!bg-main/90 hover:text-slate-50 dark:hover:bg-main/90 dark:hover:!text-stone-900 active:!bg-main focus-within:!bg-main focus-visible:!bg-main"}`,
                    menuList:()=>"focus-within:bg-main focus-visible:bg-main dark:!bg-stone-700 dark:!text-stone-300",
                    singleValue:()=>"dark:!text-stone-300",
                    menu:(p)=>"focus-within:!bg-main focus-visible:!bg-main",
                    menuPortal:()=>'focus-within:!bg-main focus-visible:!bg-main',
                    }
                }
                onChange={(st)=>onChange(st?.value)}
                onBlur={onBlur}
                value={orderStatus.find((os)=>os.value===value) || (orderStatus.find((os)=>os.value===watch("orderStatus")?watch("orderStatus").valueOf():undefined)?orderStatus.find((os)=>os.value===watch("orderStatus")?watch("orderStatus").valueOf():undefined):null)}
                placeholder="إختار حالة الطلب..." 
                id='status'
                ref={ref}
                />
            )}
            />
            {(errors.orderStatus) && (
                <span className='flex items-center gap-1 text-xs text-red-500 font-bold'>
                  <XOctagon size={16} className='mt-1' />
                  {errors.orderStatus.message}
                </span>
              )}
            <label className='text-header dark:text-stone-300 font-bold' htmlFor='isPaid'>
                عملية الدفع
            </label>
            <Controller 
            name='isPaid'
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <Checkbox
                    checked={o.isPaid?o.isPaid:value}
                    disabled={o.isPaid}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    label="تأكيد الدفع"
                    description="يمكنك تأكيد الدفع في حالة اختيار العميل الدفع عند الاستلام فقط"
                    color="#ffa006"
                />
            )}
            /> 
         <button disabled={!isFormChanged() } className='self-center  w-40 px-8 py-2 mx-auto text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:text-main hover:bg-transparent transition duration-150 rounded-2xl dark:disabled:bg-stone-700 dark:disabled:text-main disabled:bg-lighterText disabled:text-slate-50' type='submit'>حفظ</button>
        </form>
    </div>
  )
}

export default UpdateOrder