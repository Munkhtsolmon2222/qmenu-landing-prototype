"use client";
import { Order } from "@/lib/types";
import React from "react";
import BaseCard from "./base-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
interface Props {
  order: Order;
}
function CompletedCard(props: Props) {
  const { order } = props;
  const { t } = useTranslation();

  return (
    <Card className="px-3 py-2">
      <BaseCard order={order} />
      <div className="w-full flex justify-between gap-8  py-1">
        <Button
          variant={"outline"}
          size={"sm"}
          className="rounded-full bg-secondary-background w-full text-current "
        >
          {t("Re-Order")}
        </Button>
        <Button size={"sm"} className="rounded-full  bg-current  w-full ">
          {t("Write a comment")}
        </Button>
      </div>
    </Card>
  );
}

export default CompletedCard;
