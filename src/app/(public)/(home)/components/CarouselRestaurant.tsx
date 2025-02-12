"use client";
import { RestaurantGrid } from "@/components/cards/RestaurantGridCard";
import Empty from "@/components/shared/empty";
import { Button } from "@/components/ui/button";
import { BranchDetail } from "@/lib/types";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Translate } from "react-auto-translate";
import Link from "next/link";
interface Props {
  index: number;
  name: string;
  branches: BranchDetail[];
}

function CarouselRestaurants(props: Props) {
  const { branches, name } = props;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { width = window.innerWidth } = useMediaQuery();
  const { t } = useTranslation();
  // const [currentPage, setCurrentPage] = useState(0);
  // const branchesPerPage = 5;
  // const totalPages = Math.ceil(branches?.length / branchesPerPage);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 300,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 300,
        behavior: "smooth",
      });
    }
  };

  if (branches?.length === 0) return <></>;

  return (
    <div className="mb-10">
      <div className="top-28 md:top-32 sticky z-40  bg-background py-2">
        <div className="flex items-center justify-between max-w-[90rem]  ">
          <h1 className="font-medium text-lg xl:text-xl">
            <Translate>{name}</Translate>
          </h1>
          <Link href={`/list?cuisine=${name}`} legacyBehavior>
            <a className="text-current text-sm text-end font-medium z-50">
              {t("All")}
            </a>
          </Link>
        </div>
      </div>

      <div className="no-scrollbar w-full flex flex-row transition-all ease-in-out relative">
        {branches?.length === 0 ? (
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
              ref={scrollContainerRef}
              className="gap-3 overflow-x-auto no-scrollbar w-full flex flex-row"
            >
              {[...branches]
                .sort((a, b) => a.distance - b.distance)
                .map((branch, index) => (
                  <RestaurantGrid place={branch} key={index} services />
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
}

export default CarouselRestaurants;
