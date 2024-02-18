'use client'
import ViewActionTable from '@/components/cart/ViewActionTable'
import { RadioGroup } from '@headlessui/react'
import { Plus, X } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import {Accordion, ActionIcon, Center} from '@mantine/core'
import CheckoutAccordionItem from './CheckoutAccordionItem'
import { signIn, useSession } from 'next-auth/react'
import useAddress from '@/lib/api/UseAddress'
import AddressItem from '../profile/AddressItem'
import AddressModal from '../profile/AddressModal'
import NotFound from '@/components/layout/NotFound'
import ActionModal from '@/components/layout/ActionModal'
import useCart, { DeleteCartAllItems } from '@/lib/api/useCart'
import { PostOrder } from '@/lib/api/useOrders'
import { paymentMethods } from '@/Data'
import ShowAddress from '../layout/ShowAddress'
import axios from 'axios'
import { useRouter } from 'next/navigation'
type Props = {}  

function CheckoutSteps({}: Props) {
    const [payment, setPayment] = useState<{name: string} | undefined>(undefined);
    const [address, setAddress] = useState<Address>();
    const [staticAddition, setStaticAddition] = useState<PostOrder['staticAdditionOrders']>([])
    const [meals, setMeals] = useState<PostOrder['mealOrders']>([])
    const [order, setOrder] = useState<PostOrder>({addressId:address?.id || 0 , paymentMethod:payment?.name || '', mealOrders:meals, staticAdditionOrders:staticAddition, totalPrice:0})
    const {data:cart, isLoading} = useCart()
    const emptyCart = DeleteCartAllItems()
    const [orderResponse, setOrderResponse] = useState<PostOrderResponse>()
    useEffect(()=>{
        setOrder({
            ...order,
            paymentMethod:payment?.name!
        })
    },[payment])
    useEffect(()=>{
        setOrder({
            ...order,
            addressId:address?.id!
        })
    },[address])
    useEffect(()=>{
        let staticAddition:PostOrder['staticAdditionOrders']  = []
        let meals: PostOrder['mealOrders'] = []
        cart?.map((cartItem)=>{
            if(cartItem.type == 'side dish'){
                staticAddition.push({
                    id:+cartItem.id,
                    amount:cartItem.amount}
                )
    
            } else if (cartItem.type == 'dish'){
                meals.push({
                    id:+cartItem.id,
                    addition:cartItem.additions.map((add)=>add.val).join('\n'),
                    amount:cartItem.amount,
                    name:cartItem.name
                })
            }
        })
        setStaticAddition(staticAddition)
        setMeals(meals)
    },[cart])

    useEffect(()=>{
        setOrder({
            ...order,
            mealOrders:meals
        })
    },[meals.length])
    useEffect(()=>{
        setOrder({
            ...order,
            staticAdditionOrders:staticAddition
        })
    },[staticAddition.length])
    const [DonePayment, setDonePayment] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [confirmOrder, setConfirmOrder] = useState<boolean>(false);
    const {data:session} = useSession()
    const {data:addresses} = useAddress()
    const postOrder = PostOrder()
    const router = useRouter()
  return (
    <>
    <div className='lg:mt-12 col-span-full lg:col-span-3 flex flex-col w-full bg-slate-100 dark:bg-stone-800 dark:border-stone-600'>
        <Accordion classNames={{item:'dark:border-stone-600', chevron:'dark:text-stone-400'}} value={!session?.user?'loginToAccount':!address?'addressSelection':!payment?'paymentSelection':'done'} variant="contained">
            <CheckoutAccordionItem name='loginToAccount'>
                <Accordion.Control disabled={!!session?.user}>
                    <CheckoutAccordionItem.Header stepIsDone={!!session?.user}>
                        {
                        session?.user?
                        <CheckoutAccordionItem.HeaderAfterSelection>
                        تم تسجيل الدخول   
                        </CheckoutAccordionItem.HeaderAfterSelection> : 
                        <CheckoutAccordionItem.HeaderBeforeSelection>
                            قم بتسجيل الدخول   
                        </CheckoutAccordionItem.HeaderBeforeSelection> 
                        }
                        <CheckoutAccordionItem.CurrentState>
                            {session?.user.userName}
                        </CheckoutAccordionItem.CurrentState>
                    </CheckoutAccordionItem.Header>
                </Accordion.Control>
                <Accordion.Panel>
                    <CheckoutAccordionItem.PanelSkeleton action={'قم بتسجيل الدخول لتتمكن من المتابعة :'}>
                        <button className='self-center text-slate-50 dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main' onClick={()=>signIn()}>
                            تسجيل الدخول
                        </button>
                    </CheckoutAccordionItem.PanelSkeleton>
                </Accordion.Panel>
            </CheckoutAccordionItem>
            <CheckoutAccordionItem name='addressSelection'>
            <Center>
                <Accordion.Control disabled={!!address}>
                    <CheckoutAccordionItem.Header stepIsDone={!!address}>
                        {
                         !!address?<CheckoutAccordionItem.HeaderAfterSelection>
                            تم اختيار عنوان التوصيل   
                        </CheckoutAccordionItem.HeaderAfterSelection>:
                        <CheckoutAccordionItem.HeaderBeforeSelection>
                            إختار عنوان التوصيل   
                        </CheckoutAccordionItem.HeaderBeforeSelection>
                        }  
                        {address&&<CheckoutAccordionItem.CurrentState>
                            <ShowAddress city={address?.city} departmentNum={address?.departmentNum} phoneNumber={address?.phoneNumber} street={address?.street}/>
                        </CheckoutAccordionItem.CurrentState>}
                    </CheckoutAccordionItem.Header>
                </Accordion.Control>
                <ActionIcon size="lg" variant="subtle" color="red" className='ml-2' onClick={()=>setAddress(undefined)}>
                    <X/>
                </ActionIcon>
                </Center>
                <Accordion.Panel>
                    <CheckoutAccordionItem.PanelSkeleton action={'اختار عنوان توصيل :'}>
                        <div className='w-full grid lg:grid-cols-2 items-center'>
                            {
                            addresses&&addresses.length>0?addresses?.map((add, i)=>{
                                return (
                                    <AddressItem key={i} address={add} i={i} setSelectedAddress={setAddress}/>
                                )
                            }):<NotFound name='عنواين'/>
                            }
                        </div>
                    <button onClick={()=>{setIsOpen(true)}} className='self-center flex gap-1 items-center px-3 py-2 rounded-2xl text-slate-50 dark:text-stone-900 dark:hover:text-main bg-main hover:bg-transparent hover:text-main transition duation-150'>
                    <Plus/>
                        عنوان جديد
                    </button>
                    </CheckoutAccordionItem.PanelSkeleton>
                </Accordion.Panel>
            </CheckoutAccordionItem>
            <CheckoutAccordionItem name='paymentSelection'>
            <Center>
                <Accordion.Control disabled={!!payment}>
                    <CheckoutAccordionItem.Header stepIsDone={!!payment}>
                        {
                         !!payment?<CheckoutAccordionItem.HeaderAfterSelection>
                            تم اختيار طريقة الدفع   
                        </CheckoutAccordionItem.HeaderAfterSelection>:
                        <CheckoutAccordionItem.HeaderBeforeSelection>
                            إختار طريقة الدفع   
                        </CheckoutAccordionItem.HeaderBeforeSelection>
                        }  
                        <CheckoutAccordionItem.CurrentState>
                            {payment?.name}
                        </CheckoutAccordionItem.CurrentState>
                    </CheckoutAccordionItem.Header>
                </Accordion.Control>
                <ActionIcon size="lg" variant="subtle" color="red" className='ml-2' onClick={()=>setPayment(undefined)}>
                    <X/>
                </ActionIcon>
                </Center>
                <Accordion.Panel>
                    <CheckoutAccordionItem.PanelSkeleton action={'اختار طريقة دفع :'}>
                    <RadioGroup value={payment} onChange={setPayment}>
                        {
                        paymentMethods.map((payment, i)=>{
                            return (
                            <RadioGroup.Option key={i}  className={`my-4`} value={payment}>
                            {({ checked }) => (
                                <div className='flex flex-col gap-3'>
                                    <span className={`px-3 py-2 cursor-pointer rounded-2xl transition duration-150 ${checked ? 'bg-main text-slate-50 dark:text-stone-900 ' : 'hover:bg-main/20'}`}>{payment.name}</span>
                                </div>
                            )}
                            </RadioGroup.Option>
                            )
                        })
                        }
                    </RadioGroup>
                    </CheckoutAccordionItem.PanelSkeleton>
                </Accordion.Panel>
            </CheckoutAccordionItem>
        </Accordion>
    </div>
    <ViewActionTable disable={!session?.user || !payment || !address} action={setConfirmOrder} order={order} setOrder={setOrder} actionName='تأكيد الطلب' />
    <AddressModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    <ActionModal 
    isOpen={confirmOrder} 
    setIsOpen={setConfirmOrder} 
    action={
        async ()=>
            {   if(order.paymentMethod==='دفع عند الإستلام'){
                await postOrder.mutateAsync({order:order}, {
                    onSuccess(data, variables, context) {
                        setOrderResponse((data))
                        setDonePayment(true)
                        emptyCart.mutate()
                        router.replace(`/checkout/payment-confirmation?s=success&id=${data.id}`)
                    }
                ,})}
                else {
                    axios.post('/api/checkout', order).then((res)=>router.push(res.data))
                }        
            }
    }
    title={'هل انت متأكد من تفاصيل طلبك ؟'} 
    description='لا يمكنك التعديل في الطلب بعد تأكيده لذلك تأكد من جميع التفاصيل مسبقاً، سنرسل لك رسالة تفيد بتأكيد و حالة الطلبية بمجرد التأكيد' 
    deleteAction={false}
    />
  </>
  )
}

export default CheckoutSteps