"use client";
import ReviewForm from "@/components/forms/review-form";
import { Icons } from "@/components/shared/icons";
import { useFavourite } from "@/hooks/useFavourite";
import {
  PAGE_LOGIN,
  PAGE_ORDER,
  PAGE_ORDERS,
  PAGE_PAYMENT,
  PAGE_PROFILE,
} from "@/lib/config/page";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { FavouriteItemType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShareModal } from "@/components/modal/ShareModal";
import useMediaQuery from "@/hooks/use-media-query";
import { AuthContext, getPayload } from "@/lib/providers/auth";
import { useRouter } from "next/navigation";
import SelectLanguage from "@/components/ui/selectLanguage";

export const Restaurant = () => {
  const router = useRouter();
  const { current } = useRestaurantStore();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState<boolean>(false);
  const { width = window.innerWidth } = useMediaQuery();
  const [isSticky, setIsSticky] = useState<boolean>(true);
  const { isAuthenticated } = useContext(AuthContext);

  const { onClickLike, liked, editing } = useFavourite(
    FavouriteItemType.BRANCH,
    current?.branch.id ?? "",
    false
  );

  const lastPage = pathname.split("/");

  const sub =
    lastPage[lastPage.length - 2] === PAGE_ORDER ||
    lastPage[lastPage.length - 2] === PAGE_PAYMENT;

  const lastPath = lastPage.pop();

  const checkIfNavIsSticky = () => {
    const navElement = document.getElementById("restaurant-sticky-tab");

    if (navElement) {
      const rect = navElement.getBoundingClientRect();
      const navStyle = window.getComputedStyle(navElement);

      const top = Number(navStyle.top.replace("px", ""));

      setIsSticky(!isNaN(top) && typeof top === "number" && rect.top <= top);
    }
  };

  useEffect(() => {
    checkIfNavIsSticky();

    window.addEventListener("scroll", checkIfNavIsSticky);
    window.addEventListener("resize", checkIfNavIsSticky);

    return () => {
      window.removeEventListener("scroll", checkIfNavIsSticky);
      window.removeEventListener("resize", checkIfNavIsSticky);
    };
  }, []);

  if ((lastPath && [PAGE_ORDER].includes(lastPath)) || sub) return <></>;

  const isCustomer = getPayload()?.role === "customer" && isAuthenticated;

  return (
    <div
      style={{ zIndex: 99999 }}
      className={cn(
        !isSticky ? "fixed" : "absolute",
        "top-0 w-full h-16 z-50 px-3 flex items-center justify-between",
        "sm:px-6 pt-2",
        width >= 768
          ? width >= 1280
            ? width >= 1440
              ? "max-w-[1390px]"
              : "max-w-[calc(100%_-_50px)]"
            : "max-w-3xl"
          : ""
      )}
    >
      <ItemWrapper onClick={() => router.back()}>
        <Icons.arrowLeft />
      </ItemWrapper>

      <div className="flex gap-2">
        <div className="mr-4 text-center">
          <SelectLanguage />
        </div>
        <ItemWrapper onClick={() => setVisibleShare(true)}>
          <Icons.share2 />
        </ItemWrapper>
        <ItemWrapper loading={editing} onClick={onClickLike}>
          <Icons.heart
            className={`${!liked ? "" : "text-current-2 fill-current-2"}`}
          />
        </ItemWrapper>
        {isCustomer && (
          <ItemWrapper onClick={() => router.push(PAGE_ORDERS)}>
            <Icons.notePad />
          </ItemWrapper>
        )}
        <ItemWrapper
          onClick={() => {
            if (isCustomer) router.push(PAGE_PROFILE);
            else router.push(PAGE_LOGIN);
          }}
        >
          <Icons.user />
        </ItemWrapper>
      </div>

      <ReviewForm visible={visible} onClose={() => setVisible(false)} />
      <ShareModal
        title={current?.branch.name}
        visible={visibleShare}
        onClose={() => setVisibleShare(false)}
      />
    </div>
  );
};

const ItemWrapper: React.FC<
  React.PropsWithChildren & {
    loading?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }
> = ({ loading, children, className, onClick }) => {
  return (
    <div
      onClick={(e) => onClick?.(e)}
      className={cn(
        "relative cursor-pointer bg-background p-2 rounded-full flex items-center justify-center shadow-md",
        className,
        loading && "opacity-45"
      )}
    >
      {children}
    </div>
  );
};
