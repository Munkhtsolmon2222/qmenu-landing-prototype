"use client";
import {
  PAGE_HOME,
  PAGE_LOGIN,
  PAGE_MAP,
  PAGE_ORDERS,
  PAGE_PROFILE,
} from "@/lib/config/page";
import { Icons } from "./icons";
import { getPayload } from "@/lib/providers/auth";
import useHeader from "@/hooks/use-header";

const pathname = typeof window !== "undefined" ? window.location.pathname : "";

export const navs = (user: boolean) => {
  const navs = [
    {
      key: "home",
      name: "Нүүр",
      path: PAGE_HOME,
      sort: 1,
    },
    {
      key: "search",
      name: "Хайх",
      path: PAGE_MAP,
      sort: 2,
    },

    {
      key: "profile",
      name: "Хэрэглэгч",
      path: user ? PAGE_PROFILE : PAGE_LOGIN,
      sort: 4,
    },
  ];
  const order = {
    key: "orders",
    name: "Захиалга",
    path: PAGE_ORDERS,
    sort: 3,
  };
  return user ? [...navs, order] : navs;
};

const icons = (name: string, active: boolean) => {
  const navIcons: Record<string, React.ReactNode> = {
    home: (
      <Icons.home
        className={`${active ? "fill-current " : "fill-[#797979]  "}`}
      />
    ),
    search: (
      <Icons.compass
        className={`${active ? "fill-current ml-5  " : "fill-[#797979] "}`}
      />
    ),
    profile: (
      <Icons.profile
        className={`${active ? "fill-current " : "fill-[#797979]"}  `}
      />
    ),
    orders: (
      <Icons.notePad
        className={`${
          active
            ? "fill-[#e37373] stroke-current "
            : "fill-[#cbcbcb] stroke-[#797979]"
        }`}
      />
    ),
  };
  return navIcons[name];
};

export function BottomNav() {
  const user = getPayload()?.role === "customer";
  const { restaurant } = useHeader();

  if (restaurant) return <></>;

  return (
    <div className="fixed bottom-0 z-50  max-w-[46rem] w-full  border-t rounded-t-xl justify-center  bg-background">
      <div className="flex  items-center justify-center w-full px-4">
        <div className="flex items-center w-full justify-between">
          {navs(user)
            .sort((a, b) => a.sort - b.sort)
            .map((navItem) => {
              const isActive = pathname === navItem.path;
              return (
                <NavItem
                  key={navItem.key}
                  path={navItem.path}
                  // icon={navItem.icon}
                  isActive={isActive}
                  name={navItem.name}
                  nav={navItem.key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

const NavItem = ({ path, isActive, name, nav }) => {
  return (
    <a
      className="flex flex-col items-center justify-center text-sm font-medium py-2"
      href={path}
    >
      <div
        className={`py-2 px-7 rounded-full flex items-center gap-0.5 flex-col ${
          isActive ? "bg-popover" : ""
        }`}
      >
        {isActive && (
          <div className="absolute top-0 rounded-b-xl bg-current h-2 w-4"></div>
        )}
        {icons(nav, isActive)}
        <p
          className={`text-xs ${
            isActive ? "text-current " : "text-[#797979]"
          } `}
        >
          {name}
        </p>
      </div>
    </a>
  );
};
