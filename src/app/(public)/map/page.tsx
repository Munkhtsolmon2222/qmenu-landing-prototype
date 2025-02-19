"use client";
import { useEffect, useState } from "react";
import { RestaurantList } from "@/components/cards/RestaurantListCard";
import CarouselBranch from "../(home)/components/CarouselBranch";
import ListFilter from "./components/ListFilter";
import { useMapList } from "@/hooks/useMapList";
import { CarouselRestaurant } from "@/components/carousel/restaurant";
import Maps from "./components/Maps";
import { useFilterContext } from "@/lib/providers/filter.context";
import { BRANCHES } from "@/lib/config/constant";
import { BranchType } from "@/lib/types";
import { useTranslation } from "react-i18next";

const fallbackCenter = {
  lat: 47.9024278,
  lng: 106.9386946,
};

export type Center = typeof fallbackCenter;

const distance = "20km";
const limit = 1000;

export default function MapList() {
  const [center, setCenter] = useState<Center>(fallbackCenter);

  const { filters, applyFilters, addFilter, removeFilter, branches } =
    useFilterContext();
  const { t } = useTranslation();

  const { params, device, resRefs } = useMapList(branches);

  useEffect(() => {
    if (params && params?.length > 0) {
      addFilter(params?.split(",")[0], BranchType.Restaurant, limit, {
        lat: center.lat,
        lon: center.lng,
        distance,
      });
    } else {
      addFilter("branch", BranchType.Restaurant, limit, {
        lat: center.lat,
        lon: center.lng,
        distance,
      });
    }
  }, [params, addFilter, center.lat, center.lng]);

  useEffect(() => {
    if (center.lat && center.lng) {
      applyFilters({
        limit: limit,
        lat: center.lat,
        lon: center.lng,
        distance,
        replace: true,
      });
    }
  }, [applyFilters, center.lat, center.lng]);

  return (
    <div className="w-screen  flex flex-col mt-14 md:mt-16 md:pt-1 gap-4 md:px-3 md:max-w-[90rem] overflow-hidden  ">
      <div className={`${device === "mobile" ? "hidden" : "block"}`}>
        <CarouselBranch branches={BRANCHES} branch={params} />
      </div>
      <div className="w-full flex gap-6 h-[80vh]">
        <div className="w-1/4 md:flex hidden gap-3 flex-col">
          <ListFilter
            filters={filters || []}
            onClear={() =>
              removeFilter("filters", {
                lat: center.lat,
                lon: center.lng,
                distance,
              })
            }
            addFilter={addFilter}
            removeFilter={(value) =>
              removeFilter(value, {
                lat: center.lat,
                lon: center.lng,
                distance,
              })
            }
          />
        </div>
        <div
          className={`${device === "mobile" ? "w-full" : "w-full"} flex gap-4 `}
        >
          <div
            className={`md:flex flex-col hidden w-3/6  h-90vh overflow-y-auto`}
          >
            <p className="font-bold">
              {t("Search Result")}: {branches?.length}
            </p>
            <div className="w-full gap-4 flex flex-col mt-2 mb-20">
              {branches?.map((e) => (
                <RestaurantList key={e.id} place={e} />
              ))}
            </div>
          </div>

          {device !== "mobile" ? (
            <div className="md:w-3/6 md:block sm:absolute md:relative rounded-lg overflow-hidden flex-col hidden ">
              <div className="mb-2">
                <p className="font-bold">{t("Location")}</p>
              </div>
              <Maps center={center} setCenter={setCenter} branches={branches} />
            </div>
          ) : (
            <div className="h-screen w-full overflow-hidden md:hidden flex rounded-md">
              <div className="h-screen w-full top-0 absolute">
                <Maps
                  center={center}
                  setCenter={setCenter}
                  branches={branches}
                />
              </div>
              <div className="absolute z-50  md:bottom-[10%] bottom-[10%] flex justify-between w-screen items-center  overflow-hidden">
                <CarouselRestaurant locations={branches} resRefs={resRefs} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
