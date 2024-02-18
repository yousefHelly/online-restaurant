import { Trash2 } from 'lucide-react'
import React from 'react'

type Props = {}

function AccountSettings({}: Props) {
  return (
    <div className='flex flex-col gap-5 w-full mb-5 px-8'>
            <h2 className='text-2xl lg:text-3xl dark:text-stone-300'>حذف الحساب</h2>
            <form>
                <button className='mx-auto flex gap-2 items-center justify-center bg-red-500 text-slate-50 transition duration-150 hover:bg-red-600 rounded-md px-2 py-1 my-1 text-xs' type="submit">
                    <Trash2/>
                    حذف الحساب
                </button>
            </form>
    </div>
  )
}

export default AccountSettings