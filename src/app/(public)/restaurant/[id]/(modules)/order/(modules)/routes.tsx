import {
  PAGE_ORDER_BASKET,
  PAGE_ORDER_OTP,
  PAGE_ORDER_SUCCESS,
  PAGE_ORDER_TYPE,
  PAGE_ORDER_USER,
  PAGE_TABLE_ORDER,
  PAGE_TABLE_ORDER_TABLE,
  PAGE_TAKE_AWAY,
} from "@/lib/config/page";
import { AuthContext, getPayload } from "@/lib/providers/auth";
import NotFound from "@/app/(public)/notfound/page";
import { lazy, useContext } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const Basket = lazy(() => import("./Basket/page"));
const Type = lazy(() => import("./Type/page"));
const TableOrder = lazy(
  () =>
    import("@/app/(public)/restaurant/modules/Order/modules/TableOrder/page")
);
const Table = lazy(
  () => import("@/app/(public)/restaurant/modules/Order/modules/Table/page")
);
const TakeAway = lazy(
  () => import("@/app/(public)/restaurant/modules/Order/modules/TakeAway/page")
);
const Success = lazy(
  () => import("@/app/(public)/restaurant/modules/Order/modules/Success/page")
);
const User = lazy(
  () => import("@/app/(public)/restaurant/modules/Order/modules/User/page")
);
const Otp = lazy(
  () => import("@/app/(public)/restaurant/modules/Order/modules/User/otp")
);

const PrivateRoutes: RouteObject[] = [
  {
    path: PAGE_TABLE_ORDER,
    Component: TableOrder,
  },
  {
    path: PAGE_TABLE_ORDER_TABLE,
    Component: Table,
  },
  {
    path: PAGE_TAKE_AWAY,
    Component: TakeAway,
  },
  {
    path: PAGE_ORDER_SUCCESS,
    Component: Success,
  },
];

const PublicRoutes: RouteObject[] = [
  {
    path: "",
    Component: Basket,
  },
  {
    path: PAGE_ORDER_BASKET,
    Component: Basket,
  },
  {
    path: PAGE_ORDER_TYPE,
    Component: Type,
  },
  {
    path: PAGE_ORDER_USER,
    Component: User,
  },
  {
    path: PAGE_ORDER_OTP,
    Component: Otp,
  },
  {
    path: "*",
    Component: NotFound,
  },
];

const OrderRouter: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const isCustomer = isAuthenticated && getPayload()?.role === "customer";

  const routes = isCustomer
    ? [...PublicRoutes, ...PrivateRoutes]
    : PublicRoutes;

  return useRoutes(routes);
};

export default OrderRouter;
