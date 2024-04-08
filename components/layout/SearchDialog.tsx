"use client";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import {
  Search,
  UserCircle2,
  Home,
  MenuSquare,
  UtensilsCrossed,
} from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import NotFound from "./NotFound";
import useDishes from "@/lib/api/useDishes";

type Props = {};

function SearchDialog({}: Props) {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const dishes = useDishes(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "SD"
  );
  const dishActions: SpotlightActionData[] = [];
  dishes.data?.meals.forEach((dish) => {
    dishActions.push({
      id: `${dish.id}`,
      label: dish.name,
      description: `مقدمة من الشيف ${dish.chefName} في تصنيف ${dish.categoryName}`,
      onClick: () => router.push(`/menu/${dish.name}`),
      leftSection: <UtensilsCrossed size={23} className='text-main' />,
    });
  });
  return (
    <Spotlight
      classNames={{
        root: "dark:bg-stone-800",
        search: "dark:text-stone-300 dark:bg-stone-800",
        body: "dark:bg-stone-800 ",
        action: "gap-3",
        actionSection: "flex justify-center items-center",
        actionLabel: "dark:text-stone-300",
      }}
      actions={[
        {
          group: "صفحات",
          actions: [
            {
              id: "الرئيسية",
              label: "الرئيسية",
              description: "الذهاب الي الصفحة الرئيسية",
              onClick: () => router.push("/"),
              leftSection: <Home size={23} className='text-main' />,
            },
            {
              id: "قائمة الطعام",
              label: "قائمة الطعام",
              description: "الذهاب الي قائمة الطعام (المنيو)",
              onClick: () => router.push("/menu"),
              leftSection: <MenuSquare size={23} className='text-main' />,
            },
            {
              id: "صفحتي الشخصية",
              label: "صفحتي الشخصية",
              description: "الذهاب الي صفحتي الشخصية",
              onClick: () => router.push("/profile"),
              leftSection: <UserCircle2 size={23} className='text-main' />,
            },
          ],
        },
        {
          group: "أطباق",
          actions: dishActions,
        },
      ]}
      shortcut={"mod + J"}
      nothingFound={
        <div className='flex flex-col items-center gap-5'>
          <NotFound name='نتائج مطابقة لكلمة البحث' />
          <button
            className={`w-28 mx-auto text-sm text-slate-50 font-bold bg-main px-3 py-2 rounded-2xl mt-5 transition duration-150 hover:bg-transparent hover:text-main`}
            onClick={() => {
              router.push(`/menu/all-dishes?f=search&n=${query}`);
              spotlight.close();
            }}
          >
            بحث متقدم
          </button>
        </div>
      }
      highlightQuery
      limit={7}
      searchProps={{
        leftSection: <Search />,
        placeholder: "إبحث",
        onChange: (e) => setQuery(e.target.value),
      }}
    />
  );
}

export default SearchDialog;
