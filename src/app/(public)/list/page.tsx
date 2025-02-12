"use client";
import { FilteredCard } from "@/components/cards/filteredCard";
import HomeFilter from "@/components/shared/header/components/home/components/filter";
import Loader from "@/components/shared/loader";
import { useFilterContext } from "@/lib/providers/filter.context";
import { BranchType } from "@/lib/types";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function List() {
  const {
    branches,
    hasMore,
    filters,
    removeFilter,
    addFilter,
    loading,
    applyFilters,
  } = useFilterContext();

  const params = new URLSearchParams(location.search).get("cuisine");
  const params2 = new URLSearchParams(location.search).get("offer");

  useEffect(() => {
    let filter;
    if (params) {
      filter = params.split(",")[0];
    }
    if (params2) {
      filter = params2.split(",")[0];
    }
    addFilter("cuisines", filter ?? BranchType.Restaurant);
  }, [params, params2, addFilter]);

  const handleSelect = (value: string) => {
    if (filters && filters.includes(value)) {
      removeFilter(value);
      return filters.filter((item: string) => item !== value);
    } else if (filters) {
      addFilter(value, BranchType.Restaurant);
      return [...filters, value];
    }
  };

  return (
    <InfiniteScroll
      dataLength={branches.length}
      next={applyFilters}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <div className="pt-4 w-full  mt-10 md:mt-12  px-5 h-full overflow-scroll no-scrollbar pb-36">
        <div className="my-2 flex flex-row items-center w-full justify-between mb-5 gap-2 sticky ">
          <div className="border-current border rounded-lg p-1">
            <HomeFilter />
          </div>
          <div className="gap-2 w-full overflow-y-auto no-scrollbar flex flex-row items-start ">
            {filters?.map((filter, index) => {
              return (
                <div
                  key={index}
                  className={`relative px-3 py-1 bg-current text-background border rounded-full flex items-center space-x-2 max-w-40 cursor-pointer`}
                  onClick={() => handleSelect(filter)}
                >
                  <p className="text-sm whitespace-nowrap">{filter}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-5 flex-col  h-max items-center w-full  lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 sm-grid sm-grid-cols-3">
          {[...branches]
            .sort((a, b) => a.distance - b.distance)
            .map((e, index) => (
              <div key={index} className="w-full">
                <FilteredCard key={index} place={e} services={false} />
              </div>
            ))}
        </div>
        {loading && <Loader />}
      </div>
    </InfiniteScroll>
  );
}

export default List;
