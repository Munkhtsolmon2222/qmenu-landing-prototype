// import { lazy } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import {
//   PAGE_HOME,
//   PAGE_MAP,
//   PAGE_NOT_FOUND,
//   PAGE_PROFILE,
//   PAGE_LOGIN,
//   PAGE_ORDERS,
//   PAGE_QR,
//   PAGE_OFFERS,
//   PAGE_CUISINES,
//   PAGE_LIST,
//   PAGE_PLACES,
//   PAGE_TOPUP,
//   PAGE_FORGOT,
// } from "@/lib/config/page";
// // import RestaurantRoutes from "@/app/(public)/restaurant/routes";
// import ProfileRoutes from "@/app/(private)/profile/routes";
// import EventRoutes from "@/app/(public)/event/routes";

// const DefaultLayout = lazy(() => import("@/components/layouts/default"));
// const NavigationLayout = lazy(() => import("@/components/layouts/nav"));
// const Protected = lazy(() => import("@/components/layouts/private"));

// //Public
// const Home = lazy(() => import("@/app/(public)/(home)/page"));
// const Map = lazy(() => import("@/app/(public)/map/page"));
// const Offers = lazy(() => import("@/app/(public)/offers/page"));
// const Cuisines = lazy(() => import("@/app/(public)/cuisines/page"));
// const Places = lazy(() => import("@/app/(public)/places/page"));
// const List = lazy(() => import("@/app/(public)/list/page"));
// const NotFound = lazy(() => import("@/app/(public)/notfound/page"));
// const Login = lazy(() => import("@/app/(public)/Login/page"));
// const ForgotPassword = lazy(() => import("@/app/(public)/forgotPassword/page"));
// const Qr = lazy(() => import("@/app/(public)/qr"));
// const Domain = lazy(() => import("@/app/(public)/topup/page"));

// //Private
// const Orders = lazy(() => import("@/app/(private)/orders/page"));

// const router = createBrowserRouter([
//   {
//     path: PAGE_HOME,
//     children: [
//       {
//         path: "",
//         Component: NavigationLayout,
//         children: [
//           {
//             index: true,
//             path: "",
//             Component: Home,
//           },
//           {
//             children: RestaurantRoutes,
//           },
//           {
//             path: PAGE_LOGIN,
//             Component: Login,
//           },
//           {
//             path: PAGE_FORGOT,
//             Component: ForgotPassword,
//           },
//         ],
//       },
//       {
//         path: "",
//         Component: DefaultLayout,
//         children: [
//           {
//             path: PAGE_MAP,
//             Component: Map,
//           },
//           {
//             path: PAGE_OFFERS,
//             Component: Offers,
//           },
//           {
//             path: PAGE_CUISINES,
//             Component: Cuisines,
//           },
//           {
//             path: PAGE_PLACES,
//             Component: Places,
//           },
//           {
//             path: PAGE_LIST,
//             Component: List,
//           },
//           {
//             children: EventRoutes,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: PAGE_QR + "/:id",
//     Component: Qr,
//   },
//   {
//     path: PAGE_TOPUP + "/:domain",
//     Component: Domain,
//   },
//   {
//     path: PAGE_PROFILE,
//     Component: Protected,
//     children: ProfileRoutes,
//   },
//   {
//     path: PAGE_ORDERS,
//     Component: Protected,
//     children: [
//       {
//         path: PAGE_ORDERS,
//         Component: Orders,
//       },
//     ],
//   },
//   {
//     path: PAGE_NOT_FOUND,
//     Component: NotFound,
//   },
//   {
//     path: "*",
//     Component: NotFound,
//   },
// ]);

// export default router;
