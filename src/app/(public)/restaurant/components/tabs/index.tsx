"use client";
import {
  Tabs as TabsComponent,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useContext, useState } from "react";
import MenuTab from "./menu/page";
import ReviewTab from "./review/page";
import AboutTab from "./about-tab";
import GalleryTab from "./gallery/page";
import EventTab from "./event/page";
import { OrderInput, OrderType, Participant } from "@/lib/types";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { Icons } from "@/components/shared/icons";
import useMediaQuery from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import {
  PAGE_ORDER,
  PAGE_ORDER_BASKET,
  PAGE_ORDER_USER,
  PAGE_RESTAURANT,
  PAGE_TABLE_ORDER,
} from "@/lib/config/page";
import { AuthContext, getPayload } from "@/lib/providers/auth";
import OrderDialog from "@/components/modal/OrderDialog/page";

import { useTranslation } from "react-i18next";
export enum Tab {
  Event = "Event",
  About = "About",
  Menu = "Menu",
  Gallery = "Gallery",
  Review = "Review",
}

interface Props {
  participant: Participant;
}

const Tabs: React.FC<Props> = ({ participant }) => {
  const router = useRouter();
  const { device } = useMediaQuery();
  const { total, totalPrice, items, current, setStore } = useRestaurantStore();
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const tabs = [
    {
      name: t("Menu"),
      value: Tab.Menu,
      content: <MenuTab participant={participant} />,
    },
    {
      name: t("About"),
      value: Tab.About,
      content: <AboutTab branch={participant?.branch} />,
    },
    {
      name: t("Picture"),
      value: Tab.Gallery,
      content: <GalleryTab branch={participant?.branch} />,
    },
    {
      name: t("Rating"),
      value: Tab.Review,
      content: <ReviewTab branch={participant?.branch?.id} />,
    },
  ];

  if (participant?.events && participant?.events?.length > 0)
    tabs.unshift({
      name: "Хүлээн авалт",
      value: Tab.Event,
      content: <EventTab participant={participant} />,
    });

  const [selected, setSelected] = useState(tabs[0].value);

  const onClickOrder = () => {
    const tableOrder = items.length < 1 && device === "mobile";

    if (tableOrder) {
      setStore((set) =>
        set({
          input: { type: OrderType.TableOrder } as OrderInput,
          inputParticipants: [],
        })
      );

      if (isAuthenticated && getPayload()?.role === "customer") {
        router.push(
          `${PAGE_RESTAURANT}/${current?.id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`
        );
      } else {
        router.push(
          `${PAGE_RESTAURANT}/${current?.id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`
        );
      }
    } else {
      router.push(
        `${PAGE_RESTAURANT}/${current?.id}/${PAGE_ORDER}/${PAGE_ORDER_BASKET}`
      );
    }
  };

  return (
    <>
      <TabsComponent
        value={selected}
        className="relative mr-auto h-full w-full"
      >
        <div
          id="restaurant-sticky-tab"
          className="px-4 sticky top-0 bg-background z-50"
        >
          <div className="border-b w-full overflow-x-auto no-scrollbar bg-background px-3">
            <TabsList
              className="w-full bg-transparent justify-center h-16 rounded-none p-0"
              style={{ minWidth: 80 * tabs.length }}
            >
              {tabs.map((e, index) => {
                const active = selected === e.value;
                return (
                  <TabsTrigger
                    key={index}
                    onClick={() => {
                      setSelected(e.value);
                    }}
                    value={e.value}
                    className="relative rounded-none border-b border-b-transparent text-base sm:text-lg bg-transparent w-full font-semibold text-muted-foreground transition-none focus-visible:ring-0 !shadow-none"
                  >
                    <p
                      className={`${
                        active ? "text-current-2" : ""
                      } font-medium`}
                    >
                      {e.name}
                    </p>
                    {active && (
                      <div className="bg-current-2 rounded-t-md h-1.5 w-full absolute -bottom-[16px] sm:-bottom-[14px]" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>
        {tabs.map((e, index) => (
          <TabsContent
            key={index}
            value={e.value}
            className="w-full h-full px-4"
          >
            {e.content}
          </TabsContent>
        ))}
      </TabsComponent>
      {device === "mobile" ? (
        <OrderDialog.Footer
          onClick={onClickOrder}
          containerClassName="mx-auto inset-x-0 -bottom-1 z-50 fixed"
        >
          {items.length > 0 ? (
            <>
              <div className="flex items-center gap-1 text-white">
                <Icons.shoppingCart className="w-5 h-5" />
                <span>
                  ( {total} ) {t("Order")}
                </span>
              </div>
              <span className="font-medium text-white">
                {totalPrice.toLocaleString()} MNT
              </span>
            </>
          ) : (
            <span className="text-white block mx-auto">
              {" "}
              {t("Table order")}
            </span>
          )}
        </OrderDialog.Footer>
      ) : (
        current?.orderable && (
          <div
            onClick={onClickOrder}
            className={`fixed bottom-6 right-6 flex items-center justify-center z-50 rounded-full p-3 dissolve drop-shadow-3xl cursor-pointer ${
              total > 0 ? "bg-primary-foreground" : "bg-current-2"
            }`}
          >
            {total > 0 && (
              <div className="flex items-center justify-center h-5 w-5 bg-current-2 fixed -top-2 right-0 rounded-full">
                <div className="text-white text-sm">{total}</div>
              </div>
            )}
            <span className="absolute h-7 w-7 rounded-full animate-dissolve z-50" />
            <Icons.shoppingCart
              className={`${total > 0 ? "text-current-2" : "text-white"}`}
            />
          </div>
        )
      )}
    </>
  );
};

export default Tabs;
