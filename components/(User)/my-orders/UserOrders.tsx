"use client";
import Loading from "@/app/loading";
import useOrders from "@/lib/api/useOrders";
import React from "react";
import OrderItem from "./OrderItem";
import PaginationProvider from "@/lib/PaginationProvider";
import { useSearchParams } from "next/navigation";

type Props = {};

function UserOrders({}: Props) {
  const { get } = useSearchParams();
  const { data: orders, isLoading } = useOrders(parseInt(get("page") || "1"));
  if (isLoading && !orders?.orders) {
    return <Loading />;
  }
  return (
    <PaginationProvider
      totalPages={orders?.numOfPages || 1}
      showPagination={orders && orders.orders?.length > 0}
    >
      <div className='flex flex-col items-center gap-2'>
        {orders &&
          orders.orders.length > 0 &&
          orders.orders.map((order, i) => {
            return (
              <OrderItem
                key={order.id}
                order={order}
                index={
                  orders.numOfUserOrders -
                  8 * (parseInt(get("page") || "1") - 1) -
                  i
                }
              />
            );
          })}
      </div>
    </PaginationProvider>
  );
}

export default UserOrders;
