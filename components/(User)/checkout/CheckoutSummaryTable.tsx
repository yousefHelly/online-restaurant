'use client'
import React from 'react'
import { Table } from '@mantine/core';
import Image from 'next/image';

type Props = {
    orderDetails: PostOrderResponse,
}

function CheckoutSummaryTable({orderDetails}: Props) {
  return (
    <Table >
    <Table.Thead>
      <Table.Tr className='dark:border-stone-600'>
        <Table.Th className='dark:text-stone-300'>الطبق</Table.Th>
        <Table.Th className='dark:text-stone-300'>الكمية</Table.Th>
        <Table.Th className='dark:text-stone-300'>السعر</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {
        orderDetails.meals.map((meal)=>{
          return <Table.Tr key={meal.mealName} className='dark:border-stone-600 transition duration-150'>
          <Table.Td className='dark:text-stone-300 flex gap-3 items-center '>
            <div className='w-24 h-24'>
              <Image
              alt={meal.mealName}
              src={meal.mealImgUrl}
              width={250}
              height={250}
              className='object-cover w-full h-full rounded-md'
              />
            </div>
            <p>{meal.mealName}</p>
          </Table.Td>
          <Table.Td className='dark:text-stone-300'>{meal.amount}</Table.Td>
          <Table.Td className='dark:text-stone-300'>{meal.amount * meal.mealPrice} ج </Table.Td>
        </Table.Tr>
        })
      }
      {
        orderDetails.staticAdditions.map((st)=>{
          return <Table.Tr key={st.staticAdditionName} className='dark:border-stone-600 transition duration-150'>
          <Table.Td className='dark:text-stone-300 flex gap-3 items-center '>
            <div className='w-24 h-24'>
              <Image
              alt={st.staticAdditionName}
              src={st.staticAdditionImgUrl}
              width={250}
              height={250}
              className='object-cover  w-full h-full rounded-md'
              />
            </div>
            <p>{st.staticAdditionName}</p>
          </Table.Td>
          <Table.Td className='dark:text-stone-300'>{st.amount}</Table.Td>
          <Table.Td className='dark:text-stone-300'>{st.amount * st.staticAdditionPrice} ج</Table.Td>
        </Table.Tr>
        })
      }
    </Table.Tbody>
    <Table.Caption className='dark:text-stone-400'>إجمالي تكلفة الطلبية {orderDetails.totalCost} ج</Table.Caption>
    </Table>
  )
}

export default CheckoutSummaryTable