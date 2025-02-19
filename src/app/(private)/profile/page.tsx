"use client";
import { Menu } from "./components";
import useMediaQuery from "@/hooks/use-media-query";
import { Suspense, lazy } from "react";
import Loader from "@/components/shared/loader";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { Customer } from "@/lib/types";
import { usePathname } from "next/navigation";
const Account = lazy(() => import("./modules/account"));

const changeWidth = 768;

const Index = () => {
  const { width } = useMediaQuery();
  const pathname = usePathname();
  const { data: { me: customer } = {} } = useQuery<{ me: Customer }>(
    GET_CURRENT_CUSTOMER,
    { fetchPolicy: "cache-first" }
  );

  const showAccount = pathname.split("/").length === 2 && width > changeWidth;
  const hideChild = pathname.split("/").length === 2 && width <= changeWidth;
  const hideMenu = pathname.split("/").length > 2 && width <= changeWidth;

  return (
    <div
      className={`bg-background mt-[58px] sm:mt-[75px] h-[calc(100vh_-_75px)] overflow-y-auto mb-16 sm:mb-0 p-2 grid gap-4 ${
        hideChild ? "grid-cols-1" : "grid-cols-4"
      }`}
    >
      {!hideMenu && (
        <div className="col-span-1 relative">
          <Menu pathname={pathname} hideChild={hideChild} customer={customer} />
        </div>
      )}

      {!hideChild && (
        <div className={`pb-10 ${hideMenu ? "col-span-4" : "col-span-3"}`}>
          {showAccount && (
            <Suspense fallback={<Loader />}>
              <Account />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
