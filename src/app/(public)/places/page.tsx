"use client";
import { useTag } from "@/hooks/useTags";
import { BRANCHES, TagType } from "@/lib/config/constant";
import { useRouter } from "next/navigation";
import React from "react";

function Places() {
  const router = useRouter();
  const { tags, loading } = useTag(TagType.K);
  console.log(tags, loading);
  return (
    <div className="px-5 w-full grid gap-4 items-center    h-max grid-cols-3 mt-24 ">
      {BRANCHES.map((branch, index) => (
        <div
          key={index}
          className={`w-28 h-28 self-center flex items-center justify-center relative rounded-full  bg-cover bg-center border z-50`}
          onClick={() => router.push(`/list?cuisine=${branch?.key}`)}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
          <p className="relative z-10 text-primary-foreground font-[400]  translate-y-[10%]">
            {branch.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Places;
