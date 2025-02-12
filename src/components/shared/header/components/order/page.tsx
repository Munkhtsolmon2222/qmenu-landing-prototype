"use client";
import { Icons } from "@/components/shared/icons";
import { useRouter } from "next/navigation";

export const Order = () => {
  const router = useRouter();

  return (
    <div className="absolute top-1 z-50 py-2 px-3 flex w-full justify-between gap-1 items-center flex-col">
      <div className="flex w-full  gap-4">
        <div className="rounded-full border bg-primary-foreground p-1">
          <Icons.chevronLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
};
