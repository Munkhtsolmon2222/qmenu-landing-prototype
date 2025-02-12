"use client";
import { useTag } from "@/hooks/useTags";
import { TagType } from "@/lib/config/constant";
import React from "react";
import { useRouter } from "next/navigation";
function Cuisines() {
  const router = useRouter();
  const { tags } = useTag(TagType.K);

  return (
    <div className="px-5 w-full grid gap-4 items-center    h-max grid-cols-3 mt-24 ">
      {tags.map((cuisine, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${cuisine.icon})` }}
          className={`w-28 h-28 self-center flex items-center justify-center relative rounded-full  bg-cover bg-center border z-50`}
          onClick={() => router.push(`/list?cuisine=${cuisine?.name}`)}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
          <p className="relative z-10 text-primary-foreground font-[400]  translate-y-[10%]">
            {cuisine.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Cuisines;
