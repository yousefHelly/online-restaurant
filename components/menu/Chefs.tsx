"use client";
import React from "react";
import { Chef } from "./Chef";
import useChefs from "@/lib/api/useChefs";
import LoadingErrorFetching from "../layout/LoadingErrorFetching";
import NotFound from "../layout/NotFound";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import AdminChef from "../(Admin)/chefs/AdminChef";
import Slider from "../layout/Slider";
import { useSearchParams } from "next/navigation";
import PaginationProvider from "@/lib/PaginationProvider";
import Loading from "@/app/loading";

type Props = {
  initialData?: { chefs: Chef[] } & WithPagination;
  admin?: boolean;
  showSlider?: boolean;
  size?: number;
};

function Chefs({ initialData, admin, showSlider = false, size }: Props) {
  const { get } = useSearchParams();
  const { data, isLoading, isError } = useChefs(
    initialData,
    parseInt(get("page") || "1"),
    size
  );
  if (isLoading && !data?.chefs) {
    return <Loading />;
  }
  return (
    <>
      {showSlider && (
        <Slider
          className='h-[350px]'
          showArrows={(data && data?.chefs.length > 0) || false}
        >
          {data && data?.chefs.length > 0 ? (
            data?.chefs.map((chef) => {
              return (
                <div key={chef.name} className='chef_slide'>
                  <Chef
                    key={chef.name}
                    name={chef.name}
                    category={chef.categoryName}
                    mealsCount={chef.numOfMeals}
                    rating={chef.rate}
                    image={chef.chefImgUrl}
                    rateNum={chef.numOfRate}
                  />
                </div>
              );
            })
          ) : (
            <NotFound name='شيفات' />
          )}
        </Slider>
      )}
      {!showSlider && (
        <PaginationProvider
          totalPages={data?.numOfPages || 1}
          showPagination={data && data.chefs.length > 0}
        >
          <div className={`grid grid-cols-4 gap-5 w-full`}>
            {!admin && data && data.chefs.length > 0
              ? data.chefs.map((chef) => {
                  return (
                    <Chef
                      key={chef.name}
                      name={chef.name}
                      category={chef.categoryName}
                      mealsCount={chef.numOfMeals}
                      rating={chef.rate}
                      image={chef.chefImgUrl}
                      rateNum={chef.numOfRate}
                    />
                  );
                })
              : !isLoading && !isError && !admin && <NotFound name='شيفات' />}
            {admin && !isLoading && (
              <Link
                href={`/admin/chefs/new`}
                className='group h-[350px] bg-main/25 rounded-2xl transition duration-150 dark:text-stone-300 dark:hover:text-main hover:bg-transparent col-span-full md:col-span-1'
              >
                <div className='h-full rounded-md overflow-hidden relative flex flex-col gap-3 items-center justify-center'>
                  <PlusSquare size={28} />
                  <p className='text-xl font-bold font-header'>شيف جديد</p>
                </div>
              </Link>
            )}
            {admin &&
              data &&
              data.chefs.length > 0 &&
              data.chefs.map((chef) => {
                return (
                  <AdminChef
                    key={chef.name}
                    id={chef.id}
                    name={chef.name}
                    category={chef.categoryName}
                    mealsCount={chef.numOfMeals}
                    rating={chef.rate}
                    image={chef.chefImgUrl}
                    rateNum={chef.numOfRate}
                  />
                );
              })}
          </div>
        </PaginationProvider>
      )}
    </>
  );
}

export default Chefs;
