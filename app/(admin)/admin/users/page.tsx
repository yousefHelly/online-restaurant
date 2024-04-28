import AllUsers from "@/components/(Admin)/users/AllUsers";
import PageHeaderWithoutLink from "@/components/layout/PageHeaderWithoutLink";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "كل الأعضاء",
};

function AdminUsersPage() {
  return (
    <PageHeaderWithoutLink header='كل الأعضاء'>
      <AllUsers />
    </PageHeaderWithoutLink>
  );
}

export default AdminUsersPage;
