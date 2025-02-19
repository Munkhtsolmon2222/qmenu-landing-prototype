"use client";
import { Icons } from "@/components/shared/icons";
import Loader from "@/components/shared/loader";
import { Separator } from "@/components/ui/separator";
import { GET_EVENT } from "@/graphql/query";
import { IEvent, priceType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import ImageList from "../components/ImageList";
import { Button } from "@/components/ui/button";
import { PAGE_RESTAURANT } from "@/lib/config/page";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Edit: React.FC = () => {
  const { id } = useParams();
  const setSearchParams = useSearchParams()[1];
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const { data: { getEvent: event } = { getEvent: null }, loading } = useQuery<{
    getEvent: IEvent;
  }>(GET_EVENT, {
    fetchPolicy: "network-only",
    variables: { id, times: true },
    onCompleted({ getEvent }) {
      setSearchParams({ event: getEvent.name }, { replace: true });
    },
  });

  const branch = event?.branch;

  const onBranch = () => {
    router.push(`${PAGE_RESTAURANT}/${event?.channelId ?? event?.channel?.id}`);
  };

  if (loading) return <Loader />;
  if (!event) return <></>;

  return (
    <>
      <div className="px-4 sm:px-7 pt-20 overflow-y-auto pb-16 sm:pb-0 no-scrollbar">
        <div className="max-w-3xl mx-auto">
          <ItemWrapper className="mb-4 group">
            <div className="flex gap-5">
              <div
                className="min-w-20 min-h-20 w-20 h-20 rounded-2xl border-border border shadow overflow-hidden bg-background cursor-pointer"
                onClick={() => onBranch()}
              >
                <Image
                  width={100}
                  height={100}
                  src={branch?.logo}
                  alt={`${branch?.name} logo`}
                  className="w-full h-full object-contain bg-transparent"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => onBranch()}
                >
                  <span className="text-xl truncate max-w-96 group-hover:underline">
                    {branch?.name}
                  </span>
                  <div className="text-current-2 flex items-center">
                    <Icons.chevronRight className="w-5 h-5" />
                    <div className="hidden group-hover:block">
                      {t("More detail")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.store className="text-current-2 w-4 h-4" />
                  <span className="text-secondary-text opacity-70">
                    {branch?.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Icons.phone className="text-current-2 w-4 h-4" />
                  <span className="text-secondary-text opacity-70">
                    {branch?.phone}
                  </span>
                </div>
              </div>
              <Button
                className="hidden sm:block bg-current-2 hover:bg-current-2 ml-auto"
                onClick={() => (window.location.href = `tel:${branch?.phone}`)}
              >
                {t("Contact")}
              </Button>
            </div>
          </ItemWrapper>
          <ItemWrapper>
            <div
              className="mb-2 event-description"
              dangerouslySetInnerHTML={{ __html: event?.description ?? "" }}
            />
            <Separator className="my-2" />
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:gap-5">
              <div className="text-nowrap min-w-40">
                • {priceType[event.priceType]}
              </div>
              <div className="text-current-2 font-medium">
                {event.price.toLocaleString()} ₮
              </div>
            </div>
            {(event.advancePrice ?? 0) > 0 && (
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:gap-5">
                <div className="text-nowrap min-w-40">
                  • {t("More detail")}:
                </div>
                <div className="text-current-2  font-medium">
                  {event!.advancePrice.toLocaleString()} ₮
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:gap-5">
              <div className="text-nowrap min-w-40">
                • {t("Seating Capacity")}
              </div>
              <div className="text-current-2 font-medium flex flex-nowrap items-center gap-1">
                <div className="text-nowrap">{event.minGuests}</div>
                <Icons.minus className="w-3" />
                <div className="text-nowrap">{event.maxGuests}</div>
                <Icons.user className="w-5" />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:gap-5">
              <div className="text-nowrap min-w-40">• {t("Address")}</div>
              <div className="text-secondary-text opacity-80 font-medium">
                {branch?.address}
              </div>
            </div>

            <div className="flex gap-1 mt-4 mb-2 items-center">
              <div className="text-nowrap min-w-40 text-lg font-medium">
                {t("Available days")}
              </div>
              <Badge className="w-max bg-green-700 hover:bg-green-700 justify-center h-7">
                {t("Full")}
              </Badge>
              <Badge
                className="w-max bg-background text-primary hover:bg-background justify-center h-7"
                variant="outline"
              >
                {t("Available")}
              </Badge>
            </div>
            <div className="text-secondary-text font-medium">
              <div
                className="grid grid-cols-3 sm:flex sm:flex-wrap gap-1 cursor-pointer my-2"
                onClick={() => {
                  if ((event.dates ?? []).length > 0) setVisible(true);
                }}
              >
                {(event.dates ?? []).slice(0, 7).map((e, index) => (
                  <Badge
                    key={index}
                    className={cn(
                      "px-2 py-1 justify-center h-7",
                      e.state !== "available"
                        ? "bg-green-700 text-white cursor-no-drop"
                        : "opacity-70"
                    )}
                    variant="outline"
                  >
                    {e.date}
                  </Badge>
                ))}
                {(event.dates ?? []).length > 7 && (
                  <Badge
                    className="px-2 bg-green-700 text-white justify-center"
                    variant="outline"
                  >
                    ...
                  </Badge>
                )}
              </div>
            </div>
          </ItemWrapper>
          <ItemWrapper>
            <ImageList event={event} />
          </ItemWrapper>
          <br />
        </div>

        <Dialog onOpenChange={setVisible} open={visible}>
          <DialogContent className="w-[calc(100%_-_20px)] p-4">
            <div className="text-lg font-medium">{t("Full")}</div>
            <div className="flex gap-2">
              <Button className="w-full bg-green-700 hover:bg-green-700 h-8">
                {t("Available days to order ")}
              </Button>
              <Button
                className="w-full bg-background text-primary hover:bg-background h-8"
                variant="outline"
              >
                {t("Available")}
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 my-2 overflow-y-auto max-h-[550px]">
              {(event.dates ?? []).map((e, index) => (
                <Badge
                  key={index}
                  className={cn(
                    "px-4 py-2 justify-center",
                    e.state !== "available"
                      ? "bg-green-700 text-white cursor-no-drop"
                      : "opacity-70"
                  )}
                  variant="outline"
                >
                  {e.date}
                </Badge>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ItemWrapper wrapperClassName="sticky sm:bottom-2 bottom-20 px-2">
        <Button
          className="bg-current-2 hover:bg-current-2 h-12 rounded-xl w-full max-w-3xl mx-auto"
          onClick={() => (window.location.href = `tel:${branch?.phone}`)}
        >
          {t("Contact")} {branch?.phone && `( +976 ${branch?.phone} )`}
        </Button>
      </ItemWrapper>
    </>
  );
};

const ItemWrapper: React.FC<
  React.PropsWithChildren<{
    wrapperClassName?: string;
    className?: string;
    titleClassName?: string;
    title?: string;
  }>
> = ({ children, className, titleClassName, title, wrapperClassName }) => {
  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      <div className={cn("text-xl font-medium", titleClassName)}>{title}</div>
      <div className={cn("flex flex-col px-0 sm:px-5", className)}>
        {children}
      </div>
    </div>
  );
};

export default Edit;
