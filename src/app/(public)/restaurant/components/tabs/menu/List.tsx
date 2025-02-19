"use client";

import { getFilteredItems } from "@/lib/providers/restaurant";
import { Branch, Category, Product as IProduct } from "@/lib/types";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Product } from "./Product";
import { ChildProps } from "./page";
import useMediaQuery from "@/hooks/use-media-query";
import { MenuDetail } from "./MenuDetail";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";
import { useTranslation } from "react-i18next";
import { Translate } from "@/components/translator";

type ListCategory = Category & {
  child?: boolean;
  emptyParent?: boolean;
  parentId?: string;
  participant?: Branch;
};

export const List: React.FC<ChildProps> = ({
  hideImage = false,
  isList,
  menuCategories,
  categoryId,
  subCategoryId,
  participant,
  setCategoryId,
  setSubCategoryId,
  setVisibleDetail,
  setProduct,
}) => {
  const [search, setSearch] = useState<string>();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [delay, setDelay] = useState<boolean>(false);
  const { width } = useMediaQuery();

  const { categories, count } = useMemo(() => {
    let count = 0;

    const searchFilter = (e: IProduct): boolean => {
      return !search || e.name.toLowerCase().includes(search.toLowerCase());
    };

    const categories = menuCategories.reduce((res: ListCategory[], curr) => {
      if (curr.products && curr.products.length > 0) {
        const filteredProducts = getFilteredItems(
          curr.products ?? [],
          searchFilter
        );
        count += filteredProducts.length;
        res = res.concat([{ ...curr, products: filteredProducts }]);
      } else if (curr.children && curr.children.length > 0) {
        res = res.concat(
          { ...curr, emptyParent: true },
          curr.children.map((item) => {
            const filteredProducts = getFilteredItems(
              item.products,
              searchFilter
            );
            count += filteredProducts.length;
            return {
              ...item,
              products: filteredProducts,
              child: true,
              parentId: curr.id,
            };
          })
        );
      }
      return res;
    }, []);

    return { categories, count };
  }, [menuCategories, search]);

  const handleScroll = useCallback(() => {
    if (!delay) {
      const headers = document.querySelectorAll(".category-header");
      let currentStickyCategory: string | undefined;

      headers.forEach((header) => {
        const rect = header.getBoundingClientRect();
        if (rect.top <= 80) {
          currentStickyCategory = (header as HTMLElement).dataset.category;
        }
      });

      const category = categories.find((e) => e.id === currentStickyCategory);
      if (category?.child) {
        setSubCategoryId(currentStickyCategory);
        setCategoryId(category.parentId);
      } else {
        setCategoryId(currentStickyCategory ?? categories[0]?.id);
        setSubCategoryId(undefined);
      }

      setIsSticky(Boolean(currentStickyCategory));
    }
  }, [delay, categories, setCategoryId, setSubCategoryId]);

  useEffect(() => {
    if (typeof window !== "undefined" && window) {
      window?.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined" && window) {
        window?.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const { t } = useTranslation();
  const onClickCategory = (e: ListCategory) => {
    if (e.child) {
      setCategoryId(e.parentId);
      setSubCategoryId(e.id);
    } else {
      setCategoryId(e.id);
      setSubCategoryId(undefined);
    }

    const element = document.querySelector(
      `[data-category-relative='${e.id}']`
    );
    if (element) {
      setDelay(true);
      const offset =
        (width ?? (typeof window !== "undefined" ? window.innerWidth : 0)) < 640
          ? 0
          : -64;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window?.scrollTo({
        top: offsetPosition,
        behavior: "instant",
      });
      setTimeout(() => setDelay(false), 100);
    }
  };

  return (
    <div className="flex w-full mb-20 relative">
      <MenuDetail count={count} className="absolute w-full" />
      <nav className="w-1/4 xl:w-1/5 sticky mt-10 z-40 sm:top-[62px] top-16 self-start bg-background min-w-[6rem]">
        <div className="overflow-y-auto px-0 sm:px-3 py-2 no-scrollbar gap-2 flex flex-col max-h-[100vh] overflow-x-hidden pb-8">
          {categories.map((e, index) => {
            const active = e.id === categoryId || e.id === subCategoryId;
            return (
              <div
                key={index}
                className={`flex flex-nowrap relative px-2 text-start py-1.5 rounded-none cursor-pointer xl:px-7 ${
                  active
                    ? "bg-background text-black font-bold dark:text-white"
                    : "text-primary bg-background"
                }
                `}
                onClick={() => onClickCategory(e)}
              >
                {active && (subCategoryId ? e.child : true) && (
                  <div className="h-full absolute top-0 left-0 w-1 sm:w-1.5 bg-current-2" />
                )}
                {e.child && (
                  <span className="mr-0 hidden sm:block sm:mr-1 text-primary opacity-40 truncate text-wrap">
                    -
                  </span>
                )}

                <span className="ml-1 sm:ml-3 text-sm sm:text-base">
                  <Translate>{e.name}</Translate>
                </span>
              </div>
            );
          })}
        </div>
      </nav>
      <div className="p-1 mt-10 sm:px-4 pt-0 w-3/4 xl:w-4/5">
        <div className="relative mt-2">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl px-11 sm:max-w-96"
            placeholder={t("Search")}
          />
          <Icons.search className="text-current-2 absolute top-2 left-3" />
        </div>
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div data-category-relative={category.id} />
            <div
              className={`sticky z-40 sm:top-[62px] top-16 h-8 sm:h-12 flex items-center category-header bg-background font-medium text-base sm:text-xl ${
                (categoryId === category.id || subCategoryId === category.id) &&
                !category.emptyParent &&
                isSticky
                  ? "border-b"
                  : ""
              } ${category.child ? "font-normal text-md" : ""} ${
                category.emptyParent ? "h-5 mt-2 sm:mt-5" : ""
              }`}
              data-category={category.id}
            >
              <Translate>{category.name}</Translate>
            </div>
            <div
              className={`${
                width < 500 ? "grid-cols-1" : "grid-cols-2"
              } grid xl:grid-cols-4 gap-4`}
            >
              {category.products
                .slice()
                .sort((a, b) => a.sort - b.sort)
                .map((item) => (
                  <Product
                    participant={participant}
                    hideImage={hideImage}
                    list={isList}
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
        ))}
      </div>
    </div>
  );
};
