"use client";
import { Icons } from "@/components/shared/icons";
import { MenuHeader } from "./header";
import { PAGE_HOME, PAGE_PROFILE } from "@/lib/config/page";
import { Customer } from "@/lib/types";
import user from "@/assets/images/profile/user.svg";
import favourite from "@/assets/images/profile/favourite.svg";
import discount from "@/assets/images/profile/discount.svg";
import loyalty from "@/assets/images/profile/loyalty.svg";
import gift from "@/assets/images/profile/gift.svg";
import logOut from "@/assets/images/profile/log-out.svg";
import { useTheme } from "@/hooks/useTheme";
import { Separator } from "@/components/ui/separator";
import { Fragment, useContext } from "react";
import { AuthContext } from "@/lib/providers/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MenuItems: (pathname: string) => {
  name: string;
  icon;
  active: boolean;
  path: string;
  comingsoon: boolean;
}[] = (pathname) => [
  {
    name: "Хэрэглэгчийн мэдээлэл",
    icon: user,
    comingsoon: false,
    path: pathname ? "" : "account",
    active: pathname === PAGE_PROFILE || pathname === PAGE_PROFILE + "/account",
    sort: 1,
  },
  {
    name: "Дуртай",
    icon: favourite,
    comingsoon: true,
    path: "favourite",
    active: pathname === PAGE_PROFILE + "/favourite",
    sort: 3,
  },
  {
    name: "Хөнгөлөлтийн картууд",
    icon: discount,
    comingsoon: true,
    path: "discount",
    active: pathname === PAGE_PROFILE + "/discount",
    sort: 4,
  },
  {
    name: "Урамшуулал",
    icon: loyalty,
    comingsoon: true,
    path: "loyalty",
    active: pathname === PAGE_PROFILE + "/loyalty",
    sort: 5,
  },
  {
    name: "Бэлэг (Купон)",
    icon: gift,
    comingsoon: true,
    path: "coupon",
    active: pathname === PAGE_PROFILE + "/coupon",
    sort: 6,
  },
  // {
  //   name: "Location",
  //   icon: "mappin",
  //   comingsoon: true,
  //   path: "location",
  //   active: pathname === PAGE_PROFILE + "/location",
  // },
  // {
  //   name: "Ebarimt",
  //   icon: "heart",
  //   comingsoon: true,
  //   path: "ebarimt",
  //   active: pathname === PAGE_PROFILE + "/ebarimt",
  // },
  {
    name: "Гарах",
    icon: logOut,
    comingsoon: false,
    path: "logout",
    active: false,
    sort: 7,
  },
];

type Props = {
  pathname: string;
  hideChild: boolean;
  customer?: Customer;
};

const Menu: React.FC<Props> = ({ pathname, hideChild, customer }) => {
  const router = useRouter();
  const { signout } = useContext(AuthContext);
  const { mainTheme } = useTheme();

  return (
    <div className="flex flex-col gap-5">
      <MenuHeader hideChild={hideChild} customer={customer} />

      <div className={`flex flex-col px-2 ${hideChild ? "gap-1" : "gap-4"}`}>
        {MenuItems(!hideChild ? pathname : "").map((item, index) => {
          const lastItem = index === MenuItems("").length - 1 && !hideChild;

          return (
            <Fragment key={index}>
              {lastItem && (
                <Separator
                  orientation="horizontal"
                  className=" absolute bottom-14"
                />
              )}

              <div
                key={index}
                onClick={() => {
                  if (!item.comingsoon) {
                    if (item.path === "logout")
                      signout(() => router.push(PAGE_HOME));
                    else router.push(item.path);
                  }
                }}
                className={`flex text-base sm:text-sm xl:text-base gap-3 py-3 cursor-pointer items-center justify-between rounded 
                ${hideChild ? "px-1" : "px-4"}
                ${item.active ? "bg-primary-foreground" : ""}
                ${lastItem ? " absolute bottom-0" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${
                      hideChild
                        ? "bg-primary-foreground p-1 h-7 sm:h-8 rounded-md"
                        : ""
                    }`}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={item.icon ?? "/fallback-icon.png"}
                      alt={item.name || "Icon"}
                      className="w-full h-full"
                      style={{
                        filter:
                          mainTheme === "dark"
                            ? "brightness(0) invert(100%)"
                            : "none",
                      }}
                    />
                  </div>
                  <div>
                    {item.name}{" "}
                    {item.comingsoon && (
                      <span className="text-xs text-gray-400">Тун удагүй</span>
                    )}
                  </div>
                </div>
                {hideChild && (
                  <div className="h-5">
                    <Icons.chevronRight className="w-full h-full text-gray-400" />
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
