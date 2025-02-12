"use client";
import { usePathname } from "next/navigation";
import useMediaQuery from "./use-media-query";
import {
  MAP_NAV_PAGES,
  ORDER_NAV_PAGES,
  PAGE_EVENT,
  PAGE_HOME,
  PAGE_PROFILE,
  RESTAURANT_NAV_PAGES,
} from "@/lib/config/page";

function useHeader() {
  const { device } = useMediaQuery();
  const pathname = usePathname() || "/";

  const basePath = "/" + pathname.split("/")[1];

  const map = MAP_NAV_PAGES.includes(basePath);
  const order = ORDER_NAV_PAGES.includes(basePath);
  const restaurant = RESTAURANT_NAV_PAGES.includes(basePath);
  const profile = basePath.startsWith(PAGE_PROFILE) && device === "mobile";
  const home = basePath === PAGE_HOME;
  const event = basePath === PAGE_EVENT;

  return {
    home,
    pathname: basePath,
    order,
    map,
    restaurant,
    profile,
    event,
  };
}

export default useHeader;
