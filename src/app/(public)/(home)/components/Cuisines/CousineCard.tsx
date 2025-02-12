"use client";
import { Tag } from "@/lib/config/constant";
import { useFilterContext } from "@/lib/providers/filter.context";
import React from "react";
interface Props {
  cuisine: Tag;
}

function CousineCard(props: Props) {
  const { cuisine } = props;
  const { addFilter } = useFilterContext();
  if (!cuisine) return <></>;
  return (
    <div
      key={cuisine.name}
      style={{ backgroundImage: `url(${cuisine.icon})` }}
      className={`max-w-40 relative rounded-full px-6 py-3  bg-cover bg-center border z-50`}
      onClick={() => addFilter("cuisines", cuisine?.name)}
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
      <p className="relative z-10 text-primary-foreground font-[400]">
        {cuisine.name}
      </p>
    </div>
  );
}

export default CousineCard;
