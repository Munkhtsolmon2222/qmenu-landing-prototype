"use client";
import React from "react";
import CousineCard from "./CousineCard";
import { TagType } from "@/lib/config/constant";
import { useTag } from "@/hooks/useTags";
import Loader from "@/components/shared/loader";
import Link from "next/link";
function Cuisines() {
  const { tags, loading } = useTag(TagType.K);
  if (loading) return <Loader />;
  if (!tags) return <></>;

  return (
    <div className="">
      <div className="flex w-full flex-row justify-between items-center">
        <h1 className="font-medium text-lg xl:text-xl">Төрөл</h1>
        <Link href="/cuisines">
          <p className="text-current text-sm text-end font-medium z-50">Бүгд</p>
        </Link>
      </div>
      <div className="w-full py-2 flex flex-row overflow-x-scroll no-scrollbar gap-3">
        {tags?.map((e) => (
          <CousineCard cuisine={e} key={e.name} />
        ))}
      </div>
    </div>
  );
}

export default Cuisines;
