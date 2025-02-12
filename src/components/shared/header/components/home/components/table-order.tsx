"use client";
import { ORDERS } from "@/lib/config/constant";
import { useState } from "react";
import { useRouter } from "next/navigation";

function TableOrders() {
  const ordersArray = Array.from(ORDERS, ([key, value]) => ({ key, value }));
  const router = useRouter();
  const [active, setActive] = useState(ordersArray[0].key);
  const onChangeOrder = (e: string) => {
    router.push(`/map?type=${e}`);
    setActive(e);
  };
  return (
    <div className="hidden md:flex w-full bg-primary-foreground rounded-md ">
      {ordersArray.map((e, index) => (
        <div
          onClick={() => onChangeOrder(e.key)}
          key={index}
          className={`flex justify-center px-4 items-center w-full  rounded-md cursor-pointer py-1  ${
            active === e.key && "bg-current-3"
          }`}
        >
          <p
            className={`text-center text-[12px] font-medium ${
              active === e.key && "text-white"
            }`}
          >
            {e.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TableOrders;
