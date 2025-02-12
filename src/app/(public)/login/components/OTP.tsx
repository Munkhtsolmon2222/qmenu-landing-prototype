"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import { VERIFY_SESSION } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { LoaderIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
interface Props {
  phone: string;
  time: number;
  tryCode: () => void;
  loading: boolean;
  onFinish: () => void;
  sessionId?: string;
  goBack: () => void;
}

export const OTP: React.FC<Props> = ({
  phone,
  tryCode,
  time,
  loading: sessionLoad,
  onFinish,
  goBack,
  sessionId,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState<string>();

  const [verifySession, { loading }] = useMutation(VERIFY_SESSION, {
    onCompleted: (data) => {
      if (data.verifySession) {
        onFinish();
      } else {
        toast({
          title: "Буруу байна",
          variant: "default",
        });
      }
    },
  });

  const onSubmit = useCallback(
    (pin: string) => {
      if (pin && sessionId) {
        verifySession({ variables: { id: sessionId, pin } });
      }
    },
    [sessionId, verifySession]
  );

  useEffect(() => {
    if ((code || "").length === 4) onSubmit(code ?? "");
  }, [code, onSubmit]);

  useEffect(() => {
    if (phone) ref.current?.focus();
  }, [phone]);

  return (
    <>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
      <div
        className={`${loading ? "opacity-20" : "opacity-70"} overflow-hidden`}
      >
        <div onClick={() => ref.current?.focus()}>
          <div>Бидний саяхан илгээсэн 4 оронтой кодыг оруулна уу</div>
          <br />
          <div className="mb-4">+(976) {phone}</div>
          <InputOTP
            maxLength={4}
            onChange={setCode}
            value={code}
            ref={ref}
            className="px-4"
          >
            <InputOTPGroup className="w-full p-0 mx-auto flex justify-center">
              <InputOTPSlot index={0} className="w-24 h-16 text-2xl" />
              <InputOTPSlot index={1} className="w-24 h-16 text-2xl" />
              <InputOTPSlot index={2} className="w-24 h-16 text-2xl" />
              <InputOTPSlot index={3} className="w-24 h-16 text-2xl" />
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
      <div className="px-2 w-full">
        <LoadingButton
          loading={loading}
          type="submit"
          className={`w-full mt-10 rounded-full bg-current`}
          onClick={goBack}
        >
          <span className="text-white">Буцах</span>
        </LoadingButton>
      </div>
    </>
  );
};
