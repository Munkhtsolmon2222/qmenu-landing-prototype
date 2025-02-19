"use client";
import { Icons } from "@/components/shared/icons";
import InputSuffix from "@/components/ui/input-suffix";
import useHeader from "@/hooks/use-header";
import { PATH_NAMES } from "@/lib/config/page";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export const Default = () => {
  const { restaurant } = useHeader();
  const router = useRouter();
  const pathName = usePathname();

  if (restaurant) return <></>;

  return (
    <div className="absolute top-0 z-[999] pt-3 pb-2 px-5 md:mb-4 rounded-lg flex w-full justify-between gap-1 items-center flex-col bg-current-1 ">
      <div className="flex w-full  gap-4 lg:max-w-[90rem]">
        <div
          onClick={() => router.back()}
          className="rounded-full border p-2 cursor-pointer"
        >
          <Icons.arrowLeft
            onClick={(e) => {
              e.stopPropagation();
              router.back();
            }}
            className="h-5 w-5 stroke-2 font-bold text-[#797979]"
          />
        </div>
        {pathName === "/list" ? (
          <InputSuffix
            placeholder="Хоол, Ресторан..."
            prefix={
              <Icons.search className="bg-background text-current h-5 w-5 md:h-6 md:w-6" />
            }
            suffix={null}
          />
        ) : (
          <div className="w-full flex items-center justify-center mr-10">
            <h1 className="font-medium text-lg xl:text-xl">
              {PATH_NAMES.get(pathName)}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
