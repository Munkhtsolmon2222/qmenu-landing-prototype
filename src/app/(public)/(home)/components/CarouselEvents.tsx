import { CarouselEventCard } from "@/components/cards/EventCard/CarouselEventCard";
import Empty from "@/components/shared/empty";
import { Button } from "@/components/ui/button";
import { useItemMediaQuery } from "@/hooks/use-item-media-query";
import useMediaQuery from "@/hooks/use-media-query";
import { PAGE_EVENT } from "@/lib/config/page";
import { IEvent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Props {
  name: string;
  events?: IEvent[];
}

const CarouselEvents: React.FC<Props> = ({ events = [], name }) => {
  const { width = window.innerWidth } = useMediaQuery();
  const [itemref, { width: itemWidth }] = useItemMediaQuery();
  const router = useRouter();
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + itemWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft - itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-10 px-2">
      <div className="top-28 md:top-32 sticky z-40  bg-background py-2">
        <div className="flex items-center justify-between max-w-[90rem]  ">
          <h1 className="font-medium text-lg xl:text-xl">{name}</h1>
          <Link href={`${PAGE_EVENT}?filters=${name}`}>
            <p className="text-current text-sm text-end font-medium">
              {t("All")}
            </p>
          </Link>
        </div>
      </div>

      <div className="no-scrollbar w-full flex flex-row transition-all ease-in-out relative">
        {events.length === 0 ? (
          <Empty />
        ) : (
          <>
            <div
              className={cn(
                "rounded absolute top-0 z-20 h-full flex items-center",
                width < 1526 ? "left-1" : "-left-12"
              )}
              onClick={handlePrevious}
            >
              <Button
                size="icon"
                className="rounded-full opacity-60 bg-background text-primary hover:bg-background"
                onClick={handlePrevious}
              >
                <ChevronLeft className="cursor-pointer" />
              </Button>
            </div>
            <div
              ref={ref}
              className="gap-4 overflow-x-auto no-scrollbar w-full flex flex-row"
            >
              {events.map((event, index) => (
                <CarouselEventCard
                  ref={index === 0 ? itemref : undefined}
                  event={event}
                  key={index}
                  onClick={() => router.push(`${PAGE_EVENT}/${event.id}`)}
                />
              ))}
            </div>
            <div
              className={cn(
                "rounded absolute top-0 z-20 h-full flex items-center",
                width < 1526 ? "right-1" : "-right-12"
              )}
              onClick={handleNext}
            >
              <Button
                size="icon"
                className="rounded-full opacity-60 bg-background text-primary hover:bg-background"
                onClick={handleNext}
              >
                <ChevronRight className="cursor-pointer" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarouselEvents;
