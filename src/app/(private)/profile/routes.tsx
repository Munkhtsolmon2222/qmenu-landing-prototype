import { PAGE_PROFILE } from "@/lib/config/page";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Index = lazy(() => import("./page"));
const Account = lazy(() => import("./modules/account/page"));
const Favourite = lazy(() => import("./modules/favourite"));

const ProfileRoutes: RouteObject[] = [
  {
    path: PAGE_PROFILE,
    Component: Index,
    children: [
      {
        path: "account",
        Component: Account,
      },
      {
        path: "favourite",
        Component: Favourite,
      },
    ],
  },
];

export default ProfileRoutes;
