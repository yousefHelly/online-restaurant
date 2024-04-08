"use client";
import React from "react";
import useDishes from "@/lib/api/useDishes";
import DishCard from "@/components/layout/DishCard";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import NotFound from "../layout/NotFound";
import AdminDishCard from "../(Admin)/dishes/AdminDishCard";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import Slider from "../layout/Slider";
import Loading from "@/app/loading";

function TopDishes({
  filter,
  cardView = "grid",
  admin = false,
  initialData,
  showSlider = false,
}: {
  filter: Sort;
  cardView?: "grid" | "row";
  admin?: boolean;
  initialData?: Dishes;
  showSlider?: boolean;
}) {
  useAxiosAuth();
  let { data, isLoading, isError } = useDishes(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    filter,
    initialData
  );
  if (isLoading && !data?.meals) {
    return <Loading />;
  }
  return (
    <>
      {showSlider && (
        <Slider
          className={"w-full"}
          showArrows={(data && data?.meals.length > 0) || false}
        >
          {data && data.meals.length > 0 ? (
            data.meals.map((dish, i) => {
              return (
                <div key={dish.name} className='dish_slide'>
                  <DishCard
                    id={dish.id}
                    key={dish.name}
                    name={dish.name}
                    category={dish.categoryName}
                    chef={dish.chefName}
                    price={dish.price}
                    rating={dish.rate}
                    ratingCount={dish.numOfRate}
                    image={dish.mealImgUrl}
                    oldPrice={dish.oldPrice}
                    cardView={cardView}
                    favourate={dish.isFavourite}
                  />
                </div>
              );
            })
          ) : (
            <NotFound name='أطباق' />
          )}
        </Slider>
      )}
      {!showSlider && (
        <div
          className={`w-full grid ${
            cardView === "grid" ? "md:grid-cols-2 lg:grid-cols-4 " : ""
          } gap-4 p-1`}
        >
          {!admin && data?.meals && data.meals.length > 0
            ? data.meals.map((dish, i) => {
                return (
                  <DishCard
                    id={dish.id}
                    key={dish.name}
                    name={dish.name}
                    category={dish.categoryName}
                    chef={dish.chefName}
                    price={dish.price}
                    rating={dish.rate}
                    ratingCount={dish.numOfRate}
                    image={dish.mealImgUrl}
                    oldPrice={dish.oldPrice}
                    cardView={cardView}
                    favourate={dish.isFavourite}
                  />
                );
              })
            : !admin && !isLoading && !isError && <NotFound name='أطباق' />}
          {!admin && data?.meals && data?.meals.length > 1 && (
            <button
              className={`${
                cardView === "grid" ? "md:col-span-2 lg:col-span-4" : ""
              } w-24 mx-auto text-slate-50 font-bold bg-main px-3 py-2 rounded-2xl mt-5 transition duration-150 hover:bg-transparent hover:text-main`}
            >
              المزيد!
            </button>
          )}
          {admin && !isLoading && (
            <Link
              href={`/admin/dishes/new`}
              className='flex flex-col gap-3 justify-center items-center bg-main/20 p-5 rounded-2xl transition duration-150 hover:bg-transparent dark:text-stone-300 dark:hover:text-main hover:text-main cursor-pointer overflow-hidden shadow-md hover:shadow-none min-h-[191px] min-w-[75px]'
            >
              <PlusSquare size={28} />
              <p className='text-xl font-bold font-header'>طبق جديد</p>
            </Link>
          )}
          {admin && data?.meals && data.meals.length > 0
            ? data.meals.map((dish, i) => {
                return (
                  <AdminDishCard
                    id={dish.id}
                    key={dish.name}
                    name={dish.name}
                    category={dish.categoryName}
                    chef={dish.chefName}
                    price={dish.price}
                    rating={dish.rate}
                    ratingCount={dish.numOfRate}
                    image={dish.mealImgUrl}
                    oldPrice={dish.oldPrice}
                  />
                );
              })
            : admin && !isLoading && !isError && <NotFound name='أطباق' />}
        </div>
      )}
    </>
  );
}

export default TopDishes;
