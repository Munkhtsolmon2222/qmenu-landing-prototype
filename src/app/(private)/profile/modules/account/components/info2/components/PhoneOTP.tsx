"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { Customer } from "@/lib/types";
import { MutationFunctionOptions } from "@apollo/client";
import { LoaderIcon } from "lucide-react";

interface Props {
  sessionId?: string;
  phone: string;
  time: number;
  tryCode: () => void;
  loading: boolean;
  onFinish: () => void;
  updatePhone: (e: MutationFunctionOptions) => void;
}

export const PhoneOTP: React.FC<Props> = ({
  phone,
  sessionId,
  tryCode,
  time,
  loading: sessionLoad,
  onFinish,
  updatePhone,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState<string>();

  const onSubmit = useCallback(
    (code: string) => {
      if (sessionId) {
        updatePhone({
          variables: { session: sessionId, pin: code },
          update(cache) {
            const caches = cache.readQuery<{ me: Customer }>({
              query: GET_CURRENT_CUSTOMER,
            });
            if (caches && caches.me) {
              cache.writeQuery({
                query: GET_CURRENT_CUSTOMER,
                data: {
                  me: { ...caches.me, phone },
                },
              });
            }
          },
          onCompleted: (data) => {
            if (data.updatePhone) onFinish();
            else setCode("");
          },
          onError: () => setCode(""),
        });
      }
    },
    [sessionId, phone, updatePhone, onFinish]
  );

  useEffect(() => {
    if ((code || "").length === 4) onSubmit(code ?? "");
  }, [code, onSubmit]); // Use memoized onSubmit

  useEffect(() => {
    if (phone) ref.current?.focus();
  }, [phone]);

  return (
    <div className="opacity-70">
      <div onClick={() => ref.current?.focus()}>
        <div>Бидний саяхан илгээсэн 4 оронтой кодыг оруулна уу</div>
        <br />
        <div className="mb-4">+(976) {phone}</div>
        <InputOTP maxLength={4} onChange={setCode} value={code} ref={ref}>
          <InputOTPGroup className="w-72 mx-auto flex justify-center">
            <InputOTPSlot index={0} className="w-full h-16 text-2xl" />
            <InputOTPSlot index={1} className="w-full h-16 text-2xl" />
            <InputOTPSlot index={2} className="w-full h-16 text-2xl" />
            <InputOTPSlot index={3} className="w-full h-16 text-2xl" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-1 mt-4 text-sm">
        <div>Код хүлээж авсангүй.</div>
        <div
          className={`hover:underline select-none ${
            sessionLoad ? "opacity-50" : ""
          } ${time > 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !sessionLoad && time < 1 && tryCode()}
        >
          Дахин авах ({time})
        </div>
        {sessionLoad && <LoaderIcon className="h-5 w-5 animate-spin" />}
      </div>
    </div>
  );
};
