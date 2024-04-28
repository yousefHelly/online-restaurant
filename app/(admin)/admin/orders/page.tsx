import { GetAllOrders } from "@/lib/api/server api calls/getAllOrders";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import PageHeaderWithoutLink from "@/components/layout/PageHeaderWithoutLink";
import AllOrders from "@/components/(Admin)/orders/AllOrders";
type Props = {};

export const metadata: Metadata = {
  title: "كل الطلبيات",
};
async function OrdersPage({}: Props) {
  return (
    <PageHeaderWithoutLink header='كل الطلبيات'>
      <AllOrders />
    </PageHeaderWithoutLink>
  );
}

export default OrdersPage;
