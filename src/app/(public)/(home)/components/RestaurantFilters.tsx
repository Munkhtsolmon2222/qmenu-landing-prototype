"use client";
import { Icons } from "@/components/shared/icons";
import { useFilterContext } from "@/lib/providers/filter.context";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
interface Props {
  reset: () => void;
}
function RestaurantFilters(props: Props) {
  const { reset } = props;
  const Params = useSearchParams();
  const { removeFilter } = useFilterContext();
  const getSearchParams = () => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      star: params.get("star"),
      type: params.get("type"),
      food: params.get("food"),
      branch: params.get("branch"),
      filters: params.get("filters")?.split(",").filter(Boolean) ?? null,
      categories: params.get("categories")?.split(",").filter(Boolean) ?? null,
      // categories: params.get("categories"),
    };
  };

  const [searchParams, setSearchParams] = useState(getSearchParams());

  useEffect(() => {
    setSearchParams(getSearchParams());
  }, [Params]);

  const onRemove = (value: string) => {
    removeFilter(value);
    setSearchParams(getSearchParams());
    reset();
  };

  const { categories } = searchParams;
  // const both = categories?.concat(filters);
  const activeFilters = categories?.filter((f): f is string => f !== null);

  return (
    <div
      className={`gap-2 overflow-y-auto no-scrollbar w-full sticky top-28  pt-2 pb-3 md:top-[8.5rem] z-50 bg-background flex-row ${
        activeFilters !== undefined && activeFilters.length > 0
          ? "flex"
          : "hidden"
      } `}
    >
      {activeFilters !== undefined && activeFilters.length > 0 && (
        <>
          {categories?.map((e, index) => {
            const active = categories?.includes(e);
            return (
              <div
                key={index}
                onClick={() => onRemove(e)}
                className={`${
                  active ? "bg-current text-background" : "bg-background"
                } relative px-3 py-1 border rounded-full shadow-sm  flex items-center justify-center space-x-1 max-w-40 cursor-pointer ${activeFilters}`}
              >
                <p className="text-sm whitespace-nowrap">{e}</p>
                <div>
                  <Icons.close className="h-3 w-3" />
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className="flex items-center justify-end">
        <Icons.filterX
          className="h-6 w-6 text-current cursor-pointer"
          onClick={() => onRemove("all")}
        />
      </div>
    </div>
  );
}
export default RestaurantFilters;
