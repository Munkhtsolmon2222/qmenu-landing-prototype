"use client";
import { Icons } from "@/components/shared/icons";
import useMediaQuery from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import ListFilter from "./ListFilter";
import CarouselBranch from "../../(home)/components/CarouselBranch";
import { branches } from "@/lib/config/categories";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  filters: string[];
  onClear: () => void;
  addFilter: (value: string) => void;
  remove: (all: boolean, values: string | null) => void;
  drawer?: boolean;
}

function Filter(props: Props) {
  const { filters, remove, addFilter, onClear, drawer } = props;
  const [open, setOpen] = useState(false);
  const { device } = useMediaQuery();

  const content = () => {
    return (
      <div className="mx-auto w-full p-4 h-max">
        <div className="self-end w-full flex items-end justify-between">
          <div
            className="rounded-full  cursor-pointer text-sm w-max mt-2 underline"
            onClick={() => remove(true, "")}
          >
            Дахин тохируулах
          </div>
          <Icons.close onClick={() => setOpen(false)} />
        </div>
        <CarouselBranch branches={branches} branch={filters[0]} plain={true} />
        <ListFilter
          filters={filters ?? []}
          onClear={onClear}
          removeFilter={(value) => remove(false, value)}
          addFilter={addFilter}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex gap-2 items-center w-full overflow-hidden">
        {device === "mobile" ? (
          <div
            className={` rounded-full  bg-primary-foreground cursor-pointer ${
              drawer ? "border-none p-0" : "border p-2"
            }`}
          >
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Icons.filter className="h-4 w-4" />
              </DrawerTrigger>
              <DrawerContent>{content()}</DrawerContent>
            </Drawer>
          </div>
        ) : (
          <>
            {drawer ? (
              <div className=" rounded-full  bg-primary-foreground cursor-pointer">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Icons.filter className="h-5 w-5" />
                  </DialogTrigger>
                  <DialogContent>{content()}</DialogContent>
                </Dialog>
              </div>
            ) : (
              <p className="font-bold">Шүүлтүүр:</p>
            )}
          </>
        )}
        {!drawer && (
          <div className="flex gap-2 w-max  overflow-x-auto ">
            {filters?.map((e) => (
              <div
                key={e}
                className="border px-2 flex  max-w-max items-center justify-center rounded-full bg-primary text-primary-foreground cursor-pointer gap-1  py-1 md:py-0.5 text-sm md:text-base"
                onClick={() => remove(false, e)}
              >
                <p>{e}</p>
                <Icons.close className="md:w-4 md:h-4 w-[14px] h-[14px] " />
              </div>
            ))}
          </div>
        )}
      </div>
      {filters.length > 0 && device !== "mobile" && !drawer && (
        <div
          className="rounded-full px-2 py-1 cursor-pointer border text-sm w-max mt-2 underline bg-primary-foreground"
          onClick={() => remove(true, "")}
        >
          Дахин тохируулах
        </div>
      )}
    </>
  );
}

export default Filter;
