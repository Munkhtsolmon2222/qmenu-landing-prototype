"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFilterContext } from "@/lib/providers/filter.context";

function Empty() {
  const { removeFilter } = useFilterContext();
  return (
    <div className="flex justify-center items-center flex-col gap-4 mt-8 w-screen">
      <p> Хайлтын илэрц олдсонгүй</p>
      <Button
        variant={"outline"}
        size={"sm"}
        className="rounded-full"
        onClick={() => removeFilter("all")}
      >
        {/* <Icons.spinner /> */}
        Дахин оролдох
      </Button>
    </div>
  );
}

export default Empty;
