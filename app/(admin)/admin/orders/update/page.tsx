import TrackingOrder from "@/components/(User)/my-orders/TrackingOrder";
import { getOrderStatus } from "@/lib/api/server api calls/getOrderStatus";
import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import PageHeaderWithoutLink from "@/components/layout/PageHeaderWithoutLink";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const data = await getOrderStatus(searchParams?.o as string);
  if (!data) {
    return {
      title: "تعديل طلبية غير موجودة",
    };
  }
  return {
    title: `تعديل الطلبية`,
  };
}

function UpdateOrderPage({ searchParams }: Props) {
  if (!searchParams || !searchParams?.o) {
    notFound();
  }
  return (
    <PageHeaderWithoutLink header='تعديل الطلبية'>
      <TrackingOrder id={searchParams?.o as string} admin={true} />
    </PageHeaderWithoutLink>
  );
}

export default UpdateOrderPage;
