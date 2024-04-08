import FavouriteDishes from "@/components/(User)/wishlist/FavouriteDishes";
import PageHeaderWithoutLink from "@/components/layout/PageHeaderWithoutLink";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "المفضلة",
};

type Props = {};

function WishlistPage({}: Props) {
  return (
    <PageHeaderWithoutLink header='المفضلة'>
      <div className='py-5 flex flex-col'>
        <FavouriteDishes />
      </div>
    </PageHeaderWithoutLink>
  );
}

export default WishlistPage;
