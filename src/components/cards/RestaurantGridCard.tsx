"use client";
import { BranchDetail, FavouriteItemType, TableInfo } from "@/lib/types";
import { Icons } from "../shared/icons";
import defaultImage from "@/assets/images/restaurant.png";
import { useFavourite } from "@/hooks/useFavourite";
import { AvailableTable } from "@/app/(public)/availableTable";

import { useRouter } from "next/navigation";
import Image from "next/image";
interface Props {
  place: BranchDetail;
  services: boolean;
}
// type AvailabilityStatus = {
//   percentage: number;
//   color: string;
// };

export function getAvailabilityStatus(tableInfo: TableInfo): string {
  const percentage = tableInfo?.total
    ? (tableInfo.available * 100) / tableInfo.total
    : 0;

  let color;
  if (percentage === 0) {
    color = "red";
  } else if (percentage > 75) {
    color = "green";
  } else if (percentage > 50) {
    color = "yellow";
  } else if (percentage > 20) {
    color = "orange";
  } else {
    color = "red";
  }

  return color;
}

export function calculateDistance(value: number) {
  const meters = value * 1000;
  const kilometers = value?.toFixed(1);

  if (meters < 1000) {
    return `${meters}m`;
  } else {
    return `${kilometers}km`;
  }
}

export function RestaurantGrid(props: Props) {
  const { place } = props;
  const router = useRouter();

  const {
    onClickLike,
    liked: like,
    editing: loading,
  } = useFavourite(FavouriteItemType.BRANCH, place.branch);
  const color = getAvailabilityStatus(place?.tableInfo);

  // const getAvailable = () => {
  //   if (!place?.tableInfo) return;
  //   const seated = place.tableInfo.seated || 0;
  //   const available = place.tableInfo.available || 0;

  //   if (seated === 0 && available === 0) return;
  //   return available;
  // };

  return (
    <div
      className="rounded-2xl border overflow-clip min-w-72 max-w-72"
      onClick={() => router.push(`/restaurant/${place.id}`)}
    >
      <div className="relative">
        {color && (
          <div className="absolute  top-2.5 left-4 pt-1.5 flex items-center justify-center ">
            <div className="ml-2 w-5 flex justify-between items-center ">
              <span
                style={{ backgroundColor: color }}
                className={`absolute h-2.5 w-2.5  rounded-full  dissolve drop-shadow-3xl  z-30`}
              ></span>
              <span
                style={{ backgroundColor: color }}
                className={`absolute h-2.5 w-2.5 rounded-full  animate-dissolve  z-30`}
              ></span>
            </div>
            {/* <div className="rounded-sm text-xs text-white font-semibold  backdrop-brightness-50 px-1">
              {getAvailable()
                ? t("Available table") + ":" + getAvailable()
                : t("BranchOpen")}
            </div> */}
            <AvailableTable place={place} services={false} />
          </div>
        )}

        <Image
          width={100}
          height={100}
          alt="picture"
          className="w-full h-[16vh] object-cover"
          src={
            !place?.image || place.image === "" ? defaultImage : place?.image
          }
          style={{
            objectFit: "cover",
          }}
        />
        <Icons.heart
          aria-disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            onClickLike();
          }}
          className={`w-8 h-8 ${
            like
              ? "stroke-current-3 fill-current-3"
              : "stroke-gray-200 fill-gray-200"
          }  absolute top-0 right-0 m-2 bg-background p-1.5   rounded-full`}
        />
      </div>
      <div className="px-2 py-2 md:gap-2 gap-1.5 flex flex-col justify-between overflow-hidden text-ellipsis bg-background">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold truncate xl:text-xl capitalize">
            {place.name}
          </h2>
          <div className="flex items-center gap-0.5">
            <div>
              <Icons.star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
            </div>
            <p className=" text-sm  xl:text-base text-ellipsis truncate font-medium">
              {Number(place?.star ?? 0).toFixed(1)}
            </p>
          </div>
        </div>
        <div className="pt-0.5 w-full flex items-center gap-2 ">
          <div className="flex items-center gap-1">
            <div>
              <Icons.navigation className="text-black h-4 w-4" />
            </div>
            <p className="text-xs  xl:text-base text-ellipsis truncate  text-black font-medium opacity-75">
              {calculateDistance(place.distance)}
            </p>
          </div>
          <div className="w-[4px] h-[4px] rounded-full bg-secondary-text mx-0.5"></div>
          <div className="flex items-center gap-1">
            <div>
              <Icons.wallet className="h-4 w-4 text-black" />
            </div>
            <p className="text-xs xl:text-base text-ellipsis truncate  text-black font-medium opacity-75">
              {place.rate}
            </p>
          </div>
          <div className="w-[4px] h-[4px] rounded-full bg-secondary-text mx-0.5"></div>
          <div className="flex items-center gap-1">
            <div>
              <Icons.store className="fill-white h-4 w-4 text-black text-xs" />
            </div>
            <p className=" text-xs  xl:text-base text-ellipsis truncate  text-black font-medium opacity-75">
              {place?.type}
            </p>
          </div>
        </div>
        <div className=" flex items-center  gap-1 max-w-80">
          <div>
            <Icons.pinCard className="fill-white h-5 w-5 text-current" />
          </div>
          <p className=" text-xs  xl:text-base text-ellipsis truncate  text-secondary-text font-medium opacity-75">
            {place?.address}
          </p>
        </div>
      </div>
    </div>
  );
}
