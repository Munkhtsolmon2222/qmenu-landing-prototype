import { Order } from "@/lib/types";
import React from "react";
import BaseCard from "./base-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface Props {
  order: Order;
}
function CancelledCard(props: Props) {
  const { order } = props;

  return (
    <Card className="px-3 py-2">
      <BaseCard order={order} />
      <div className="w-full flex justify-between gap-8  py-1">
        <Button size={"sm"} className="rounded-full  w-full bg-current  ">
          Дахин захиалах
        </Button>
      </div>
    </Card>
  );
}

export default CancelledCard;
