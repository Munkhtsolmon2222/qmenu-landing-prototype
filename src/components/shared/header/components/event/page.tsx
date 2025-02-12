"use client";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { useLocation, useSearchParams } from "react-router-dom";
import { useRouter } from "next/navigation";
export const Event = () => {
  const [get] = useSearchParams();
  const router = useRouter();
  const pathname = useLocation().pathname;
  const name = get.get("filters") || get.get("event") || "Хүлээн авалт";

  const isDetail = pathname.split("/").length > 2;

  const onBack = () => router.back();

  return (
    <div className="absolute top-0 z-[999] pt-3 pb-2 px-5 md:mb-4 rounded-lg flex w-full justify-between gap-1 items-center flex-col bg-current-1 ">
      <div
        className={cn(
          "flex w-full gap-4",
          isDetail ? "max-w-3xl" : "lg:max-w-[90rem]"
        )}
      >
        <div
          onClick={onBack}
          className="rounded-full border p-2 cursor-pointer"
        >
          <Icons.arrowLeft
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            className="h-5 w-5 stroke-2 font-bold text-[#797979]"
          />
        </div>

        <div className="w-full flex items-center justify-center mr-10">
          <h1 className="font-medium text-lg xl:text-xl">{name}</h1>
        </div>
      </div>
    </div>
  );
};
