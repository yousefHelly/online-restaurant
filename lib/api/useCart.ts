'use client'

import { useMutation, useQuery, useQueryClient } from 'react-query'

export default function useCart() {
    const {data, isLoading, isError} = useQuery<Cart>({
        queryKey:'cart',
        queryFn:()=> new Promise((resolve, reject)=>{
          const cart = JSON.parse(localStorage.getItem('cart')||'[]')
          resolve(cart)
        })
      })
      return {data, isLoading, isError}
}

export function useCartItem(name: string) {
  const {data, isLoading, isError} = useQuery<Cart>({
      queryKey:'cart',
      queryFn:()=> new Promise((resolve, reject)=>{
        const cart = JSON.parse(localStorage.getItem('cart')||'[]')
        resolve(cart)
      })
    })
    if(data?.findIndex((item)=>item.name===name)!=-1){
      const quriedItem = data?.filter((item)=>item.name==name)[0]
      return {quriedItem, isLoading, isError}
    }else{
      return {isLoading, isError}
    }

}

export function useCartAddition(name: string, additionName: string) {
  const {data, isLoading, isError} = useQuery<Cart>({
      queryKey:'cart',
      queryFn:()=> new Promise((resolve, reject)=>{
        const cart = JSON.parse(localStorage.getItem('cart')||'[]')
        resolve(cart)
      })
    })
    if(data?.findIndex((item)=>item.name===name)!=-1){
      const quriedItem = data?.filter((item)=>item.name==name)[0]
      const quriedAddition = quriedItem?.additions.filter((add)=>add.val.startsWith(additionName))[0] || ''
      const additionVal = quriedAddition!=''?quriedAddition.val.slice(quriedAddition.val.indexOf(':')+1):''
      return {additionVal, isLoading, isError}
    }else{
      return {isLoading, isError}
    }

}


export function AddCartItem() {
  const clientQuery = useQueryClient()
  return useMutation({
    mutationFn: ({ id, name, price, image, selectedAdditions, amount, type = 'dish' }: {id:number, name: string, price: number, image: string, amount?: number, selectedAdditions: { id: number, val:string }[], type?: string}): any=>{
      const cart:Cart = JSON.parse(localStorage.getItem('cart')||'[]')
      if(cart.filter((el)=>el.name===name)&&cart.filter((el)=>el.name===name).length===0){
          localStorage.setItem('cart',JSON.stringify([...cart, { 
              id: id,
              type:type,                       
              name: name,
              price: price,
              amount: amount || 1,
              totalPrice: price * (amount || 1),
              mealImgUrl: image,
              additions: selectedAdditions,              
              } ]))
      }
    },
    onSuccess:()=>clientQuery.invalidateQueries(['cart'])
  })
}


export function UpdateAmountCart() {
  const clientQuery = useQueryClient()
  return useMutation({
    mutationFn: ({ name, amount }: { name: string; amount: number }): any=>{
      const cart:Cart = JSON.parse(localStorage.getItem('cart')||'[]')
      const currentItemIndex = cart.findIndex((cartItem) => cartItem.name === name);
      if (currentItemIndex !== -1){
        const currentItem = cart.filter((cartItem)=>cartItem.name===name)[0]
        const currentItemAfterUpdate = {...currentItem,amount:amount, totalPrice: currentItem.price * amount}
        const cartWithUpdate = cart.map((cartItem,i)=>{
          if(i === currentItemIndex){
            return currentItemAfterUpdate
          }else{
            return cartItem
          }
        })
        localStorage.setItem('cart', JSON.stringify(cartWithUpdate))
      }
    },
    onSuccess:()=>clientQuery.invalidateQueries(['cart'])
  })
}

export function UpdateItemAddition() {
  const clientQuery = useQueryClient()
  return useMutation({
    mutationFn: ({ itemname, additionName, additionId, additionChoice, additionPrice }: { itemname: string, additionId:number, additionName: string, additionChoice: string, additionPrice?: number }): any=>{
      const cart:Cart = JSON.parse(localStorage.getItem('cart')||'[]')
      const currentItemIndex = cart.findIndex((cartItem) => cartItem.name === itemname);
      if (currentItemIndex !== -1){
        const currentItem = cart.filter((cartItem)=>cartItem.name===itemname)[0]
        const currentItemOtherAdditions = currentItem.additions.filter((add)=>!add.val.startsWith(additionName))
        const currentItemAddition= currentItem.additions.filter((add)=>add.val.startsWith(additionName))[0]
        const updatedValue = `${additionName}:${additionChoice}${additionPrice?`+${additionPrice}ج`:''}` 
        currentItemOtherAdditions.push({id:additionId,val:updatedValue})
        const currentItemAfterUpdate = 
        {   
          ...currentItem, 
          additions:currentItemOtherAdditions, 
          price:additionPrice?additionPrice:currentItem.price, 
          totalPrice:((additionPrice?additionPrice:currentItem.price) * currentItem.amount) 
        }
        const cartWithUpdate = cart.map((cartItem,i)=>{
          if(i === currentItemIndex){
            return currentItemAfterUpdate
          }else{
            return cartItem
          }
        })
        localStorage.setItem('cart', JSON.stringify(cartWithUpdate))
      }
    },
    onSuccess:()=>clientQuery.invalidateQueries(['cart'])
  })
}

export function DeleteCartItem() {
  const clientQuery = useQueryClient()
  return useMutation({
    mutationFn: ({ name }: { name: string }): any=>{
      const cart:Cart = JSON.parse(localStorage.getItem('cart')||'[]')
      const otherItems = cart.filter((items)=>items.name!=name)
      localStorage.setItem('cart', JSON.stringify([...otherItems]))
    },
    onSuccess:()=>clientQuery.invalidateQueries(['cart'])
  })
}

export function DeleteCartAllItems() {
  const clientQuery = useQueryClient()
  return useMutation({
    mutationFn: (): any=>{
      const cart:Cart = JSON.parse(localStorage.getItem('cart')||'[]')
      localStorage.setItem('cart', JSON.stringify([]))
    },
    onSuccess:()=>clientQuery.invalidateQueries(['cart'])
  })
}