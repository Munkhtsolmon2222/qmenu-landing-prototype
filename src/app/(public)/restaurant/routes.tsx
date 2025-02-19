// "use client";
// import { PAGE_RESTAURANT, PAGE_PAYMENT, PAGE_ORDER } from "@/lib/config/page";
// import { lazy } from "react";
// import { RouteObject } from "react-router-dom";
// import OrderRouter from "./modules/Order/modules/routes";

// const Restaurant = lazy(() => import("./containers/page"));
// const Payment = lazy(() => import("./modules/Payment/page"));

// const RestaurantRoutes: RouteObject[] = [
//   {
//     path: PAGE_RESTAURANT,
//     Component: Restaurant,
//     children: [
//       {
//         path: ":id/" + PAGE_ORDER + "/*",
//         Component: OrderRouter,
//       },
//       {
//         path: ":id/" + PAGE_PAYMENT + "/:orderId",
//         Component: Payment,
//       },
//       {
//         path: ":id",
//         Component: Restaurant,
//       },
//     ],
//   },
// ];

// export default RestaurantRoutes;
