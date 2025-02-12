import { SEVICES_MAP } from "@/lib/config/types";
import { OrderType } from "@/lib/types";
import React from "react";

function Services({ services }: { services: OrderType[] }) {
  const displayedServices = services
    ?.map((name) => SEVICES_MAP.get(name as OrderType))
    .filter((e) => e !== undefined);

  if (services?.length === 0) return <div className="h-8 w-full">asdas</div>;

  return (
    <>
      {displayedServices?.map((e) => (
        <div
          key={e?.name}
          className="md:flex flex-col items-center md:gap-[0.3rem] w-8 fill-current h-max"
        >
          {e?.icon}
          <span className="md:text-[10px] md:block hidden text-[11px] leading-none text-center font-semibold">
            {e?.name}
          </span>
        </div>
      ))}
    </>
  );
}

export default Services;
