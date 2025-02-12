import { PAGE_EVENT } from "@/lib/config/page";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const List = lazy(() => import("./page"));
const Detail = lazy(() => import("../restaurant/components/tabs/event/page"));

const EventRoutes: RouteObject[] = [
  {
    path: PAGE_EVENT,
    children: [
      {
        path: "",
        Component: List,
      },
      {
        path: ":id",
        Component: Detail,
      },
    ],
  },
];

export default EventRoutes;
