'use client'
import { ChangeRole } from '@/lib/api/useUsers'
import { ActionIcon, Table } from '@mantine/core'
import { Edit, Save, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import  Select  from 'react-select';

type Props = {
    userData: User
}
type RoleOption = {label:string, value:Role}
const roleOptions: RoleOption[] = [
    {
        label:'عضو',
        value:'User'
    }, 
    {
        label:'مسئول',
        value:'Admin'
    }
]

function UserItem({userData:u}: Props) {
    const {data:session} = useSession()
    const updateRole = ChangeRole()
    const [role,setRole] = useState<RoleOption>(roleOptions.find((r)=>r.value===u.role) || roleOptions[0]) 
    const [src, setSrc] = useState(u.userImgUrl || '/static/default-user-icon.jpg')
    const [editable, setEditable] = useState<boolean>(false)
    return (
        <Table.Tr className='dark:border-stone-600 transition duration-150'>
            <Table.Td className='dark:text-stone-300 flex gap-3 items-center '>
            <Image
            src={src }
            alt={u.userName}
            width={250}
            height={250}
            onError={()=>setSrc('/static/default-user-icon.jpg')}
            className='object-cover w-16 h-16 rounded-full'
            />
            </Table.Td>
            <Table.Td className='dark:text-stone-300'>{u.userName} {session?.user.userName === u.userName && ' ( انت ) '}</Table.Td>
            <Table.Th className='dark:text-stone-300'>
                <Select<RoleOption>
                options={roleOptions} 
                isRtl 
                classNames={
                {
                    loadingIndicator : () => "!text-main",
                    control : (state)=> `!border !rounded-2xl dark:!bg-stone-700 dark:!border-stone-600 dark:!text-stone-300 ${state.isFocused&&"!border-main dark:!bg-stone-700 dark:!text-stone-300 !border-dotted !outline-none !shadow-none"} ${state.isDisabled&&'dark:!opacity-50'}`,
                    option: (state)=>`${state.isSelected?"!bg-main !text-slate-50 dark:!text-stone-900":"!bg-transparent hover:!bg-main/90 dark:hover:!bg-main/90 hover:text-slate-50 dark:hover:bg-main/90 dark:hover:!text-stone-900 active:!bg-main focus-within:!bg-main focus-visible:!bg-main"}`,
                    menuList:()=>"focus-within:bg-main focus-visible:bg-main dark:!bg-stone-700 dark:!text-stone-300",
                    singleValue:()=>"dark:!text-stone-300",
                    menu:(p)=>"focus-within:!bg-main focus-visible:!bg-main",
                    menuPortal:()=>'focus-within:!bg-main focus-visible:!bg-main',
                }
                }
                isDisabled={!editable}
                onChange={(uR)=>setRole(roleOptions.find((r)=>r.value===(uR?.value || u.role))!)}
                value={role}
                placeholder="إختار دور..." 
                id='roleId'
                />
            </Table.Th>
            <Table.Td className='dark:text-stone-300'>
                {
                    !editable?
                    <ActionIcon variant='subtle' color='gray' onClick={()=>{
                        if (session?.user.userName != u.userName) {
                            setEditable(true)
                        } else{
                          toast.error('لا يمكنك تعديل دورك !')  
                        }
                        }}>
                    <Edit/>
                </ActionIcon>:<div className='flex'>
                <ActionIcon variant='subtle' color='red' onClick={()=>setEditable(false)}>
                    <X/>
                    </ActionIcon>            
                <ActionIcon variant='subtle' color='green' className='mr-2' onClick={()=>{
                    updateRole.mutate({userId:u.userId, role:role.value},{ onSuccess(data, variables, context) {
                        if(data){
                            setEditable(false);
                            toast.success("تم تغيير الدور بنجاح")
                        }else{
                            setRole(roleOptions.find((r)=>r.value===u.role) || roleOptions[0])
                            setEditable(false)
                            toast.error("فشل تغيير الدور")

                        }
                    }})
                }}>
                <Save/>
            </ActionIcon>
            </div>
                }

            </Table.Td>
        </Table.Tr>
    )
}

export default UserItem