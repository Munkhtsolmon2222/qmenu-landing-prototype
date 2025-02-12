"use client";
import { getFilteredItems } from "@/lib/providers/restaurant";
import { Category, Product as ProductType } from "@/lib/types";
import { useMemo, useState } from "react";
import { Product } from "./Product";
import { ChildProps } from "./page";
import { MenuDetail } from "./MenuDetail";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";

export const CardList: React.FC<ChildProps> = ({
  menuCategories,
  categoryId,
  subCategoryId,
  setCategoryId,
  setSubCategoryId,
  setVisibleDetail,
  setProduct,
  participant,
}) => {
  const [search, setSearch] = useState<string>();

  const { products, categories, subCategories, subCategory, count } =
    useMemo(() => {
      const categories = menuCategories ?? [];

      const searchFilter = (e: ProductType): boolean => {
        return !search || e.name.toLowerCase().includes(search.toLowerCase());
      };

      const count = categories.reduce((res, curr) => {
        const items = (curr.products ?? []).concat(
          curr.children.flatMap((e) => e.products ?? [])
        );
        const filtered = getFilteredItems(items, searchFilter);
        res += filtered.length;
        return res;
      }, 0);

      let subCategory: Category | undefined;
      let subCategories: Category[] = [];

      const products = categories.reduce((res: ProductType[], parent) => {
        if (parent.id === categoryId) {
          subCategories = parent.children ?? [];
          subCategory =
            subCategories.find((e) => e.id === subCategoryId) ??
            subCategories[0];
          if (subCategory)
            res = getFilteredItems(subCategory.products, searchFilter);
          else res = getFilteredItems(parent.products, searchFilter);
        }

        return res;
      }, []);

      return {
        products,
        categories,
        subCategories,
        subCategory,
        count,
      };
    }, [categoryId, subCategoryId, menuCategories, search]);

  return (
    <div className="flex flex-col mb-20">
      <MenuDetail count={count} />
      <div className="relative sm:my-4 my-3">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl px-11 sm:max-w-96"
          placeholder="Хайх"
        />
        <Icons.search className="text-current-2 absolute top-2 left-3" />
      </div>
      <nav className="sticky z-40 sm:top-[62px] top-16 bg-background">
        <div className="overflow-x-scroll py-2 no-scrollbar gap-2 flex">
          {categories.map((e, index) => {
            const active = e.id === categoryId;
            return (
              <div
                key={index}
                className={`px-2 border justify-center h-9 flex items-center rounded-2xl cursor-pointer text-sm sm:text-base ${
                  active ? "border-current-2 text-current-2 font-medium" : ""
                } ${e.name.length > 10 ? "w-max text-nowrap" : " min-w-28"}`}
                onClick={() => {
                  setCategoryId(e.id);
                  setSubCategoryId(undefined);
                }}
              >
                {e.name}
              </div>
            );
          })}
        </div>
        {subCategories.length > 0 && (
          <div className="overflow-x-scroll px-3 pb-2 no-scrollbar gap-2 flex">
            {subCategories.map((e, index) => {
              const active = e.id === subCategory?.id;
              return (
                <div
                  key={index}
                  className={`px-2 border justify-center h-9 flex items-center rounded-2xl cursor-pointer text-sm sm:text-base ${
                    active ? "border-current-2 text-current-2 font-medium" : ""
                  } ${e.name.length > 10 ? "w-max text-nowrap" : " min-w-28"}`}
                  onClick={() => setSubCategoryId(e.id)}
                >
                  {e.name}
                </div>
              );
            })}
          </div>
        )}
      </nav>
      <div className="py-4 pt-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {products
            .slice()
            .sort((a, b) => a.sort - b.sort)
            .map((item) => (
              <Product
                participant={participant}
                key={item.id}
                product={item}
                onClick={() => {
                  setProduct(item);
                  setVisibleDetail(true);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
