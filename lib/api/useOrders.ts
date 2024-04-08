'use client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { axiosAuth } from './axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import useAxiosAuth from '../hooks/useAxiosAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation'
function useOrders(page?: number, size?: number) {
  useAxiosAuth()
  const { data, isLoading, isError } = useQuery<{ orders: UserOrder[], numOfUserOrders: number } & WithPagination>({
    queryKey: ['orders', page || 1],
    queryFn: () => axiosAuth.get(`/api/Order/GetAllUserOrders?Page=${page ?? 1}&Size=${size ?? 8}`).then((res) => res.data)
  })
  return { data, isLoading, isError }
}

export default useOrders


export function PostOrder() {
  useAxiosAuth()
  return useMutation({
    mutationFn: async ({ order }: { order: PostOrder }): Promise<PostOrderResponse> => {
      return await axiosAuth.post(`/api/order`, order).then((res) => res.data).catch((err) => toast.error((err as any).response.data as string))
    },
  })
}

export function ConfirmOrder() {
  const router = useRouter()
  return useMutation({
    mutationFn: async ({ success, ID, token }: { success: boolean, ID?: string, token: string }): Promise<PostOrderResponse> => {
      return await axios.post(`/api/checkout/confirm`, { success: success, ID: ID, token: token }).then((res) => res.data).catch((err) => { toast.error((err as any).response.data as string); router.replace("/") })
    },
  })
}

export function useAllOrders(initialData: { orders: AllUsersOrders[] } & WithPagination, page?: number, size?: number) {
  useAxiosAuth()
  const { data, isLoading, isError } = useQuery<{ orders: AllUsersOrders[] } & WithPagination>({
    queryKey: ['all-orders'],
    initialData: initialData,
    queryFn: () => axiosAuth.get(`/api/Order/GetAllOrders?Page=${page ?? 1}&Size=${size ?? 8}`).then((res) => res.data)
  })
  return { data, isLoading, isError }
}



export function UpdateOrderStatus() {
  useAxiosAuth()
  return useMutation({
    mutationFn: async ({ id, isPaid, orderStatus }: { id: string, isPaid?: boolean, orderStatus: string }) => {
      if (isPaid) {
        await axiosAuth.post(`/api/order/ConfirmPayment`, { orderId: id }).then((res) => toast.error(res.data as string)).catch((err) => toast.error((err as any).response.data as string))
      }
      return await axiosAuth.put(`/api/order/changeOrderStatus`, { orderId: id, status: orderStatus }).then((res) => res.data).catch((err) => toast.error((err as any).response.data as string))
    },
  })
}

