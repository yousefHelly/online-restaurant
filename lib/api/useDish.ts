'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import useAxiosAuth from '../hooks/useAxiosAuth';
import toast from 'react-hot-toast';
import { DishFormType } from '@/model/Dish';
import { useRouter } from 'next/navigation';
import { convert } from '../ConvertArabicURL';

function useDish(mealName: (string|undefined)) {
    const {data: returnData, isLoading, isError, isLoadingError} = useQuery<Dish>({
      queryKey:['dish', mealName],
      queryFn:async ()=>(await axiosAuth.get(`/api/meal?name=${mealName}`)).data,
      refetchInterval:1500
    })
const newAdditions = returnData?.mealAdditions.map((add)=>{
  return {
    id: add.id,
    name: add.name,
    choices: add.choices.map((choice)=>{
      return{
        id: choice.id,
        name: choice.name,
        price: +choice.price!>0 ? choice.price : undefined,
        hasPrice:choice.price?true:false
      }
      })
    }
  })
  const data = {
    ...returnData,
    mealAdditions:newAdditions
  }
  return {data, isLoading, isError, isLoadingError}
}

export default useDish



export function useAdminDish(mealName: (string|undefined), initialData: Dish) {
  useAxiosAuth()
  const router = useRouter()
  const {data: returnData, isLoading, isError} = useQuery<Dish>({
    queryKey:['dish', mealName],
    initialData:initialData,
    queryFn: typeof mealName === "string" ? async ()=>(await axiosAuth.get(`/api/meal?name=${mealName}`)).data : undefined as any,
    onError(err) {
      toast.error((err as any).response.data)
      router.replace("/admin/dishes")
    },
    retry:false,
  })
  const newAdditions = returnData?.mealAdditions.map((add)=>{
  return {
    id: add.id,
    name: add.name,
    choices: add.choices.map((choice)=>{
      return{
        id: choice.id,
        name: choice.name,
        price: choice.price,
        hasPrice:choice.price?true:false
      }
      })
      }
    })
    const data = {
      ...returnData,
      mealAdditions:newAdditions
    }
  return {data, isLoading, isError}
}




export function PostDish() {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ name, chefId, categoryId, Price, oldPrice, mealImg, description, additions  }: { name: string, chefId: number, categoryId: number, Price: number, oldPrice?: number, mealImg: File, description?: string , additions:DishFormType['additions']}): any=>{
      const formData = new FormData()
        name&&formData.append('name', name)
        chefId&&formData.append('chefId', `${chefId}`)
        categoryId&&formData.append('categoryId', `${categoryId}`)
        Price&&formData.append('Price', `${Price}`)
        oldPrice&&formData.append('oldPrice', `${oldPrice}`)
        mealImg&&formData.append('mealImg', mealImg)
        description&&formData.append('description', description) 
      axiosAuth.post(`/api/meal`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
        clientQuery.invalidateQueries(['dishes']);        
        toast.success((res as any).data.message);
        router.push('/admin/dishes')
        setTimeout(()=>{
          additions?.map((add, i )=>{
            const requestedAdd:{
              choices:{
                name: string,
                price: number | undefined
              }[],
              name: string,
              mealId: number
            } = {
              ...add,
              choices:[],
              mealId:res.data.meal.id
            }
            add.choices.map((choice)=>{
              requestedAdd.choices.push({
                name:choice.name,
                price:choice.hasPrice?+choice.price!:undefined
              })
            })
            axiosAuth.post('/api/addition',JSON.stringify(requestedAdd), {headers:{'Content-Type':'application/json'}}).then((res)=>toast.success((res as any).data.message))
          })   
        },250)
      }).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}

export function UpdateDish(mealName: string) {
  const clientQuery = useQueryClient()
  const router = useRouter()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ name, chefId, categoryId, Price, oldPrice, mealImg, description, additions  }: { name: string, chefId: number, categoryId: number, Price: number, oldPrice?: number, mealImg: File, description?: string , additions:DishFormType['additions']}): any=>{
      const formData = new FormData()
        name&&formData.append('name', name)
        chefId&&formData.append('chefId', `${chefId}`)
        categoryId&&formData.append('categoryId', `${categoryId}`)
        Price&&formData.append('Price', `${Price}`)
        formData.append('oldPrice', `${oldPrice?oldPrice:0}`)
        mealImg&&formData.append('mealImg', mealImg)
        formData.append('description', `${description}`) 
      axiosAuth.put(`/api/meal/${mealName}`,formData, {headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
        clientQuery.invalidateQueries(['dish', convert(name)]);        
        toast.success((res as any).data.message);
        router.push('/admin/dishes')
        setTimeout(()=>{
          additions?.map((add, i )=>{
              const requestedAdd:{
                choices:{
                  name: string,
                  price: number | undefined
                }[],
                name: string,
                mealId: number
              } = {
                ...add,
                choices:[],
                mealId:(res as any).data.updatedData.id
              }
              add.choices.map((choice)=>{
                requestedAdd.choices.push({
                  name:choice.name,
                  price:choice.hasPrice?+choice.price!:undefined
                })
              })
              if(!add.id){
              axiosAuth.post('/api/addition',JSON.stringify(requestedAdd), {headers:{'Content-Type':'application/json'}}).then((res)=>toast.success((res as any).data.message,{id:'addChoice'}))
              } else{
                add.choices.forEach((choice)=>{
                  const choiceData = {
                    name: requestedAdd.name,
                    choice: requestedAdd.choices.find((ch)=> ch.name===choice.name),
                    mealId:requestedAdd.mealId
                  }
                  if(choice.id){
                    axiosAuth.put(`/api/addition/${add.id}/${choice.id}`,JSON.stringify(choiceData), {headers:{'Content-Type':'application/json'}}).then((res)=>toast.success((res as any).data.message,{id:'updateChoice'}))
                  }else{
                    axiosAuth.post(`/api/Addition/AddChoice/${add.id}`,JSON.stringify(choiceData.choice), {headers:{'Content-Type':'application/json'}}).then((res)=>toast.success((res as any).data.message,{id:'addChoice'}))
                  }
                })
              }
          })   
        },250)
      }).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}



export function DeleteDish() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ name }: { name: string }): any=>{
      axiosAuth.delete(`/api/meal/${name}`).then((res)=>{clientQuery.invalidateQueries(['dishes']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
    },
  })
}

export function DeleteAdditions() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ additions }: { additions: number[] }): any=>{
      setTimeout(()=>{
        additions.map((add)=>{
          axiosAuth.delete(`/api/addition/${add}`).then((res)=>{clientQuery.invalidateQueries(['dishes']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
        })
      }, 100)
    },
  })
}


export function DeleteChoices() {
  const clientQuery = useQueryClient()
  useAxiosAuth()
  return useMutation({
    mutationFn: ({ choices }: { choices: {addId: number, choiceId: number}[] }): any=>{
      setTimeout(()=>{
        choices.map((add)=>{
          axiosAuth.delete(`/api/addition/deleteChoice/${add.addId}/${add.choiceId}`).then((res)=>{clientQuery.invalidateQueries(['dishes']);toast.success((res as any).data.message)}).catch((err)=> toast.error((err as any).response.data as string))
        })
      }, 100)    
    },
  })
}