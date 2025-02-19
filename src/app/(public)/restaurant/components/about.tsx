"use client";
import { Icons } from "@/components/shared/icons";
import { Branch, OrderInput, OrderType } from "@/lib/types";
import {
  PAGE_ORDER,
  PAGE_ORDER_USER,
  PAGE_RESTAURANT,
  PAGE_TABLE_ORDER,
} from "@/lib/config/page";
import { cn } from "@/lib/utils";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import defaultImage from "@/assets/images/restaurant.png";
import { Button } from "@/components/ui/button";
import { calculateDistance } from "@/components/cards/filteredCard";
import ReviewForm from "@/components/forms/review-form";
import { useContext, useState } from "react";
import { ShareModal } from "@/components/modal/ShareModal";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { AuthContext, getPayload } from "@/lib/providers/auth";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Props {
  branch: Branch;
  width: number;
}

type Action = {
  router: ReturnType<typeof useRouter>; // Correct type for Next.js router
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleShare: React.Dispatch<React.SetStateAction<boolean>>;
};

const About: React.FC<Props> = ({ branch }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleShare, setVisibleShare] = useState<boolean>(false);
  const { id } = useParams();
  const { setStore } = useRestaurantStore();
  const { current } = useRestaurantStore();
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter(); // Use the Next.js router
  const { t } = useTranslation();

  const Buttons = [
    {
      name: t("Write a comment"),
      icon: (
        <Icons.star className="w-5 h-5 min-w-5 min-h-5 text-primary group-hover:text-white dark:group-hover:text-black" />
      ),
      onClick: ({ setVisible }: Action) => setVisible(true),
      active: true,
    },
    {
      name: t("Share"),
      icon: (
        <Icons.upload className="w-5 h-5 min-w-5 min-h-5 text-primary group-hover:text-white dark:group-hover:text-black" />
      ),
      onClick: ({ setVisibleShare }: Action) => setVisibleShare(true),
      active: true,
    },
  ];

  const onTableOrder = () => {
    let path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`;

    setStore((set) =>
      set({
        input: { type: OrderType.TableOrder } as OrderInput,
        inputParticipants: [],
      })
    );

    const isCustomer = isAuthenticated && getPayload()?.role === "customer";
    if (!isCustomer)
      path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`;

    router.push(path); // Use Next.js's router.push() here
  };

  return (
    <>
      <Flex className="sm:pt-5 pt-2 px-4 pb-2 items-start gap-5 relative z-50">
        <div className="w-full sm:hidden block bg-background absolute h-4 -top-3 rounded-t-2xl border-no left-0" />
        {/* about area */}
        <Flex className="w-full md:w-1/2 xl:w-1/3 items-stretch flex-col gap-3  overflow-hidden md:h-[295px]">
          <Flex className="absolute left-4 -top-[75px] gap-3 pl-5 pb-2 items-end w-[calc(100%_-_25px)]">
            <div className="min-w-28 min-h-28 w-28 h-28 z-50 rounded-2xl border-border border shadow overflow-hidden bg-background">
              <Image
                width={100}
                height={100}
                src={branch.logo}
                alt={`${branch.name} logo`}
                className="w-full h-full object-contain bg-transparent"
                loading="lazy"
              />
            </div>
            <span className="text-2xl mb-2.5 truncate sm:w-full">
              {branch.name}
            </span>
            <div className="gap-2 xl:flex hidden w-full justify-end">
              {Buttons.map((item, i) => (
                <Button
                  key={i}
                  className="group flex gap-2 rounded-xl px-5 bg-primary-foreground"
                  onClick={() =>
                    item.onClick({ router, setVisible, setVisibleShare })
                  }
                >
                  {item.icon}
                  <div className="group-hover:text-white text-primary dark:group-hover:text-black">
                    {item.name}
                  </div>
                </Button>
              ))}
            </div>
          </Flex>
          <Flex className="gap-1 mt-10">
            <div className="text-current-2">
              <Icons.star className="h-5 fill-current-2" />
            </div>
            <div className="font-medium opacity-75 text-secondary-text">
              {branch.star}
            </div>
            <div className="font-medium text-nowrap opacity-75 text-secondary-text">
              ({branch.totalReviews ?? 0} {t("Rating")})
            </div>
          </Flex>

          <Flex className="text-white flex-wrap">
            <Flex>
              <Icon name="navigation" />
              <GrayText className="ml-1">
                {calculateDistance(+(branch?.distance || 0)?.toFixed(2) || 0)}
              </GrayText>
            </Flex>

            <div className="rounded-full w-1.5 h-1.5 min-w-1.5 min-h-1.5 dark:bg-gray-300 bg-black ml-3 mr-2" />

            <Flex>
              <Icon name="creditCard" />
              <GrayText className="ml-1">{branch.rate ?? "$"}</GrayText>
            </Flex>

            <div className="rounded-full w-1.5 h-1.5 min-w-1.5 min-h-1.5 dark:bg-gray-300 bg-black ml-3 mr-2" />

            <Flex>
              <Icon name="store" />
              <GrayText className="ml-1">{branch.type ?? "$"}</GrayText>
            </Flex>
          </Flex>
          <Flex className="gap-1 text-white">
            <Icon name="mappin" />
            <GrayText className="whitespace-pre-line truncate line-clamp-5">
              {branch.address}
            </GrayText>
          </Flex>

          {current?.orderable ? (
            <Button
              onClick={onTableOrder}
              className="hidden sm:block w-full bg-current-2 h-12 rounded-lg hover:bg-current-3 mt-auto"
            >
              {t("Table order")}
            </Button>
          ) : (
            ""
          )}
        </Flex>

        <Flex className="flex-col hidden md:flex w-full items-end gap-3 mt-10">
          {/* map area */}
          {branch.latitude && branch.longitude && (
            <div className="hidden md:block w-full h-64 rounded-lg overflow-hidden">
              <Map
                mapId="d34c272a99808261"
                defaultZoom={18}
                defaultCenter={{
                  lat: branch.latitude,
                  lng: branch.longitude,
                }}
                gestureHandling={"greedy"}
              >
                <AdvancedMarker
                  position={{ lat: branch.latitude, lng: branch.longitude }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    className="fill-red-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="m23.08 44.702l.14.08l.056.032a1.52 1.52 0 0 0 1.446 0l.056-.03l.142-.082q.182-.106.51-.305c.434-.266 1.048-.66 1.78-1.178a39.2 39.2 0 0 0 5.364-4.564c3.888-3.98 7.926-9.96 7.926-17.654a16.5 16.5 0 0 0-33 0c0 7.694 4.038 13.674 7.926 17.654a39.2 39.2 0 0 0 5.364 4.564a34 34 0 0 0 2.29 1.484M24 27a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
                      clipRule="evenodd"
                    />
                    <defs>
                      <clipPath id="circleView">
                        <circle cx="24" cy="21" r="14" />
                      </clipPath>
                    </defs>
                    <Image
                      width={100}
                      height={100}
                      src={
                        typeof branch.logo === "string"
                          ? branch.logo
                          : defaultImage
                      }
                      alt={`${branch.name} logo`}
                      className="w-full h-full object-contain bg-transparent"
                      loading="lazy"
                    />
                  </svg>
                </AdvancedMarker>
              </Map>
            </div>
          )}
        </Flex>
      </Flex>
      <ReviewForm visible={visible} onClose={() => setVisible(false)} />
      <ShareModal
        title={branch.name}
        visible={visibleShare}
        onClose={() => setVisibleShare(false)}
      />
    </>
  );
};

const Flex: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => <div className={cn("flex items-center", className)}>{children}</div>;

const GrayText: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <span className={cn("text-secondary-text opacity-75", className)}>
    {children}
  </span>
);

const Icon: React.FC<{ name: keyof typeof Icons; className?: string }> = ({
  className,
  name,
}) => {
  const Item = Icons[name];
  return (
    <Item className={cn("min-h-6 min-w-6 h-6 fill-current-2", className)} />
  );
};

export default About;
