"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { UpointContext } from "@/lib/providers/upoint.context";
import { BankImages } from "../../banks";
import { PAYMENT_TYPE } from "@/lib/config/constant";
import { renderCardNumber } from "..";
import { Icons } from "@/components/shared/icons";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { LoaderIcon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
type Props = {
  visible: boolean;
  id: string;
  onClose: () => void;
  onSubmit: (e: string) => void;
};

export const UpointModal = ({ visible, onClose, onSubmit }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [pin, setPin] = useState<string>("");
  const { upointBalance, setUpointBalance, upointLoadingBalance, upointStep } =
    useContext(UpointContext);

  const onChoose = (state: "balance" | "spend" | "collect") => {
    if (upointBalance) {
      setUpointBalance({ ...upointBalance, state });
      onClose();
    }
  };

  useEffect(() => {
    if ((pin || "").length === 4) onSubmit(pin);
  }, [pin, onSubmit]);

  const renderBody = [
    <div className="p-1" key={0}>
      <div className="flex flex-col justify-center items-center p-2">
        <Image
          width={100}
          height={100}
          className="w-20 rounded-lg h-auto"
          src={BankImages[PAYMENT_TYPE.UPT]}
          alt={`${PAYMENT_TYPE.UPT} Bank`}
        />
        <p>Та пин код-оо оруулна уу.</p>
      </div>
    </div>,
    <div className="p-2 px-8" key={2}>
      <div className="flex flex-col justify-center items-center p-2">
        <Image
          width={100}
          height={100}
          className="w-20 rounded-lg h-auto"
          src={BankImages[PAYMENT_TYPE.UPT]}
          alt={`${PAYMENT_TYPE.UPT} Bank`}
        />
      </div>
      <div className="flex items-center border-b border-border py-2">
        <div className="flex flex-col">
          <span className="text-sm text-misty font-bold">
            {upointBalance?.phone}
          </span>
          <div className="flex flex-no-wrap whitespace-nowrap items-center justify-start gap-1 text-misty text-xs">
            {renderCardNumber(upointBalance?.code ?? "")}
            <Icons.creditCard className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="flex flex-col whitespace-nowrap justify-center items-end ml-auto">
          <span className="text-xs">Оноо</span>
          <span className="text-base text-primary">
            {upointBalance?.balance}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-2 pb-0">
        <p className="my-1">Боломжит оноо</p>
        <p className="text-6xl text-primary">
          {upointBalance?.state === "collect" ? "--" : upointBalance?.balance}
        </p>
      </div>
    </div>,
  ];

  const renderFooter = [
    <DialogFooter
      key={1}
      className="flex justify-center sm:justify-center py-2 relative"
    >
      {upointLoadingBalance && (
        <LoaderIcon className="absolute inset-x-0 mx-auto text-2xl animate-spin" />
      )}
      <InputOTP maxLength={4} onChange={setPin} ref={ref}>
        <InputOTPGroup className="w-52 mx-auto flex justify-center">
          <InputOTPSlot index={0} className="w-full h-12 text-lg" />
          <InputOTPSlot index={1} className="w-full h-12 text-lg" />
          <InputOTPSlot index={2} className="w-full h-12 text-lg" />
          <InputOTPSlot index={3} className="w-full h-12 text-lg" />
        </InputOTPGroup>
      </InputOTP>
    </DialogFooter>,
    <DialogFooter key={4}>
      <div className="flex flex-nowrap gap-5 mt-3 justify-center p-4">
        <div
          onClick={() => onChoose("spend")}
          style={{ width: "100px" }}
          className={`flex justify-center items-center p-2 h-9 rounded-lg border  ${
            upointBalance?.state === "spend"
              ? "bg-lightapricot text-current border-current"
              : "bg-gainsboro text-misty border-grayish"
          } `}
        >
          Зарцуулах
        </div>
        <div
          className={`flex justify-center items-center p-2 h-9 rounded-lg border  ${
            upointBalance?.state === "collect"
              ? "bg-lightapricot text-current border-current"
              : "bg-gainsboro text-misty border-grayish"
          } `}
          style={{ width: "100px" }}
          onClick={() => onChoose("collect")}
        >
          Цуглуулах
        </div>
      </div>
    </DialogFooter>,
  ];

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent
        className="w-[380px] rounded-lg"
        onClick={() => ref.current?.focus()}
      >
        {renderBody[upointStep]}
        {renderFooter[upointStep]}
      </DialogContent>
    </Dialog>
  );
};
