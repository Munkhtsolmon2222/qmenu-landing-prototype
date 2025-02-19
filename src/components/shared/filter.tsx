"use client";
import React from "react";
import { Icons } from "./icons";
import ListFilter from "@/app/(public)/ListFilter";
import { useFilterContext } from "@/lib/providers/filter.context";
import { Button } from "../ui/button";

function MainFilter() {
  const { removeFilter, addFilter, filters, setOpen } = useFilterContext();

  return (
    <div className="mx-auto w-full  min-h-[60vh] flex flex-col justify-between">
      <ListFilter
        filters={filters || []}
        onClear={() => removeFilter("filters")}
        removeFilter={(value) => removeFilter(value)}
        addFilter={(key, value) => addFilter(key, value)}
      />
      <div className="self-end w-full flex items-end justify-around rounded-t-lg border-t py-3 ">
        <Button
          className="rounded-full text-current  border-current bg-secondary"
          onClick={() => {
            removeFilter("filters");
            setOpen(false);
          }}
        >
          <Icons.filterX />
        </Button>
        <Button className="rounded-full " onClick={() => setOpen(false)}>
          <Icons.close />
        </Button>
      </div>
    </div>
  );
}

export default MainFilter;
