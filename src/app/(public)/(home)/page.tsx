"use client";
import { useHome } from "@/hooks/useHome";
import { useFilterContext } from "@/lib/providers/filter.context";
import CarouselBranch from "./components/CarouselBranch";
import RestaurantFilters from "./components/RestaurantFilters";
import CarouselRestaurants from "./components/CarouselRestaurant";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { BannerType, BRANCHES } from "@/lib/config/constant";
import FilteredBranches from "./components/FilteredBranches";
import { Fragment, useEffect, useState } from "react";
// import CarouselFoods from "./components/CarouselFoods";
import { SmartBanner } from "@/components/banner/page";
import CarouselEvents from "./components/CarouselEvents";

export default function Home() {
  const { loading, list } = useHome();
  const [activeFilters, setActiveFilters] = useState([""]);
  const { getActiveFilters } = useFilterContext();

  useEffect(() => {
    const activeFilters = getActiveFilters("all") as string[];

    setActiveFilters(activeFilters);
  }, [getActiveFilters]);
  const onRemove = () => {
    const activeFilters = getActiveFilters("all") as string[];
    setActiveFilters(activeFilters);
  };

  function isArrayFullyEmpty(arr) {
    return arr.every((item) => item === null || item === undefined);
  }

  const renderContent = () => {
    if (loading) return <LoadingSkeleton />;

    if (!isArrayFullyEmpty(activeFilters)) {
      return (
        <div className="gap-3 w-full over">
          <FilteredBranches />
        </div>
      );
    }

    return list
      ?.filter((e) => e.branches ?? e.events)
      .map((e, index: number) => (
        <Fragment key={index}>
          {index === 2 && <SmartBanner types={[BannerType.M]} dot />}
          {e.events && e.events.length > 0 ? (
            <CarouselEvents events={e.events} name={e.name} />
          ) : e.branches && e.branches.length > 0 ? (
            <CarouselRestaurants
              key={index}
              branches={e.branches}
              name={e.name}
              index={index}
            />
          ) : (
            <></>
          )}
          {list.length - 1 === index && (
            <SmartBanner types={[BannerType.E]} dot />
          )}
        </Fragment>
      ));
  };

  return (
    <div className="flex flex-col h-max w-full justify-between px-3 z-0 mt-3">
      <CarouselBranch branches={BRANCHES} />
      {/* <CarouselFoods foods={products} name="" /> */}
      <RestaurantFilters reset={onRemove} />
      {renderContent()}
    </div>
  );
}
