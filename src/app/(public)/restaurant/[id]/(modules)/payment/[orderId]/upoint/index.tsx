"use client";
import { Customer, Order, Payment, Transaction } from "@/lib/types";
import React, { useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { PAYMENT_TYPE } from "@/lib/config/constant";
import { BankImages } from "../banks";
import { Icons } from "@/components/shared/icons";
import { UpointModal } from "./components/UpointModal";
import { UpointContext } from "@/lib/providers/upoint.context";
import { BlockItem } from "../..";
import Image from "next/image";
type Props = {
  user: Customer;
  payment?: Payment;
  order?: Order;
};

export const UpointForm: React.FC<Props> = ({ user, payment, order }) => {
  const [visible, setVisible] = useState(false);
  const { getUpointBalance, upointBalance, setUpointBalance } =
    useContext(UpointContext);

  const onSubmitPin = (pin_code: string) => {
    const input = {
      mobile: user.phone,
      pin_code,
      order: order?.id,
      payment: payment?.id,
      card_number: "",
      verify: true,
    };
    getUpointBalance({
      variables: { input },
      onError: (err: Error) =>
        toast({
          title: "Алдаа",
          variant: "default",
          description: err.message,
        }),
    });
  };

  const showModal = () => {
    if (
      !order?.transactions.find(
        (item: Transaction) =>
          item.state === "PAID" && item.type === PAYMENT_TYPE.UPT
      )
    ) {
      if (upointBalance && upointBalance.state !== "balance") {
        setUpointBalance({ ...upointBalance, state: "balance" });
      } else {
        setVisible(true);
      }
    } else {
      toast({
        title: "Алдаа",
        variant: "default",
        description: "Урамшуулал тооцогдсон байна.",
      });
    }
  };

  const renderChoosedText = () => {
    if (upointBalance?.state === "balance") {
      return "Боломжит оноо";
    } else if (upointBalance?.state === "collect") {
      return "Цуглуулах";
    } else {
      return "Зарцуулах";
    }
  };

  if (!payment?.id) return <></>;

  return (
    <>
      <BlockItem
        onClick={showModal}
        active={["spend", "collect"].includes(upointBalance?.state ?? "")}
        className="relative py-2"
      >
        <div className="flex justify-start gap-1 items-center">
          <div className="rounded-lg flex place-self-center">
            <Image
              width={100}
              height={100}
              className={`w-13 h-full rounded-lg`}
              src={BankImages[PAYMENT_TYPE.UPT]}
              alt={`${PAYMENT_TYPE.UPT} Bank`}
            />
          </div>
          {upointBalance ? (
            <>
              <div className="flex flex-col">
                <span className="text-sm">U-Point</span>
                <div className="flex flex-no-wrap whitespace-nowrap items-center justify-start gap-1 text-misty text-xs">
                  {renderCardNumber(upointBalance.code)}
                  <Icons.creditCard className="w-4 h-4 text-current" />
                </div>
              </div>
              <div className="flex flex-col whitespace-nowrap justify-center items-end ml-auto">
                <span className="text-xs">{renderChoosedText()}</span>
                {upointBalance.state !== "collect" && (
                  <span className="text-base ">{upointBalance.balance}</span>
                )}
              </div>
            </>
          ) : (
            <span className="text-misty text-base">U-Point</span>
          )}
        </div>
      </BlockItem>
      <UpointModal
        id={order?.id || ""}
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={onSubmitPin}
      />
    </>
  );
};

export const renderCardNumber = (e: string) => {
  const str = e ? e : "";
  let arr: string[] = str.replace(/\s/g, "").match(/.{1,4}/g) ?? [];
  if (arr.length === 4) {
    const lastItem = arr[arr.length - 1].split("");
    const sym = lastItem.map(() => "*");
    arr = arr.map((val, i) => (i === arr.length - 1 ? sym.join("") : val));
  }
  return arr.join(" ");
};
