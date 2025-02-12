"use client";
import OrderDialog from "@/components/modal/OrderDialog/page";
import { FieldError } from "../../components/page";
import { ItemWrapper } from "../../components/ItemWrapper";
import { FormField } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoaderIcon } from "lucide-react";
import { SessionType } from "@/lib/config/constant";
import { OrderOtpInput, OrderOtpSchema } from "../../validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sessionTime } from "../../utils";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GET_SESSION, REGISTER, SESSION_VERIFY } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import {
  PAGE_ORDER,
  PAGE_ORDER_USER,
  PAGE_RESTAURANT,
  PAGE_TABLE_ORDER,
  PAGE_TAKE_AWAY,
} from "@/lib/config/page";
import { Gender, OrderType } from "@/lib/types";
import { AuthContext, getPayload } from "@/lib/providers/auth";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const OrderOtp: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  const [time, setTime] = useState(sessionTime());
  const { input } = useRestaurantStore();
  const hasCalledRef = useRef(false);

  const isCustomer = isAuthenticated && getPayload()?.role === "customer";

  const { watch, control, setValue, handleSubmit, trigger, clearErrors } =
    useForm<OrderOtpInput>({
      mode: "onSubmit",
      resolver: zodResolver(OrderOtpSchema),
      defaultValues: {
        type: (localStorage.getItem("sessionType") as SessionType) ?? undefined,
        phone: input?.contact ?? "",
        sessionId: localStorage.getItem("sessionId") ?? "",
      },
    });

  const { type, phone, name, pin, sessionId } = watch();

  const [signUp, { loading: registering }] = useMutation(REGISTER, {
    onCompleted: (data) => onFinish(data.signUp.token),
  });

  const [getSession, { loading: sessionLoad }] = useMutation(GET_SESSION);

  const onVerify = (token?: string) => {
    if (token && type === SessionType.P) {
      trigger(["pin"]).then((valid) => {
        if (!valid) return;
        onFinish(token);
      });
    } else {
      trigger(["name", "pin"]).then((valid) => {
        if (!valid) return;

        signUp({
          variables: {
            input: {
              email: "",
              gender: capitalizeFirstLetter(Gender.Male),
              name,
              password: pin,
              phone: phone,
              session: sessionId,
              year: 0,
              month: 0,
              day: 0,
            },
          },
        });
      });
    }
  };

  const [sessionVerify, { loading: verifying }] = useMutation(SESSION_VERIFY, {
    onCompleted: (data) => {
      if (data.sessionVerify.verified) {
        onVerify(data.sessionVerify.token);
      } else {
        toast({
          title: "Буруу байна",
          variant: "default",
        });
      }
    },
    onError: ({ graphQLErrors }) => {
      setValue("pin", "");

      if (graphQLErrors) {
        graphQLErrors.forEach((err) => {
          const { errorType: code } = err;
          if (code === "SS0001") {
            toast({
              title: "Та шинэ код авна уу.",
              variant: "default",
            });
          }
        });
      }
    },
  });

  const getCode = useCallback(() => {
    if (time > 0 || sessionLoad || sessionId) {
      setTime(sessionTime());
      return;
    }

    if (!type) {
      router.push(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`);
      return;
    }

    if (isCustomer) {
      router.push(`${PAGE_RESTAURANT}/${id}`);
      return;
    }

    trigger(["phone"]).then((valid) => {
      if (valid) {
        if (time > 0 || sessionLoad || sessionId) {
          setTime(sessionTime());
          return;
        }

        getSession({
          variables: { phone, type },
          onCompleted: (data) => {
            localStorage.setItem(
              "sessionStart",
              new Date().getTime().toString()
            );
            localStorage.setItem("sessionId", data.getSession);
            setTime(59);
            setValue("sessionId", data.getSession);
            setValue("pin", "");
          },
        });
      } else {
        toast({
          title: "Утасны дугаараа зөв оруулна уу.",
          variant: "default",
        });
        router.push(
          `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`
        );
      }
    });
  }, [
    time,
    sessionLoad,
    sessionId,
    type,
    phone,
    router,
    getSession,
    trigger,
    id,
    isCustomer,
    setValue,
  ]);

  useEffect(() => {
    if (!hasCalledRef.current) {
      getCode();
      hasCalledRef.current = true;
    }
  }, [getCode]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (time > 0)
      interval = setInterval(() => setTime((seconds) => seconds - 1), 1000);
    else if (time === 0) {
      localStorage.removeItem("sessionStart");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (!pin || pin.length < 4) return;

    let triggerValues: (keyof OrderOtpInput)[] = ["sessionId", "pin"];

    if (type === SessionType.R) triggerValues = triggerValues.concat(["name"]);

    trigger(triggerValues).then((v) => {
      if (v) sessionVerify({ variables: { id: sessionId, pin } });
    });
  }, [pin, sessionId, type, trigger, sessionVerify]);

  const onSubmit = (e: OrderOtpInput) => {
    sessionVerify({ variables: { id: e.sessionId, pin: e.pin } });
  };

  const onFinish = (token: string) => {
    localStorage.removeItem("sessionType");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("sessionStart");

    authenticate(token, () => {
      if (!input) {
        router.push(`${PAGE_RESTAURANT}/${id}`);
        return;
      }

      if (input.type === OrderType.TakeAway)
        router.push(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TAKE_AWAY}`);
      else
        router.push(
          `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`
        );
    });
  };

  return (
    <>
      <OrderDialog.Header
        onClick={() =>
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`
          )
        }
      >
        Нэг удаагийн нэвтрэх код
      </OrderDialog.Header>
      <OrderDialog.Container className="flex flex-col gap-4">
        {type === SessionType.R && (
          <ItemWrapper title="Нэр" titleClassName="mb-2">
            <FormField
              control={control}
              name="name"
              render={({
                field: { onChange, ...field },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    {...field}
                    placeholder="Нэр"
                    onChange={(e) => {
                      onChange(e.target.value);
                      if (e.target.value.length > 3) clearErrors("name");
                    }}
                  />
                  <FieldError error={error} />
                </>
              )}
            />
          </ItemWrapper>
        )}
        <ItemWrapper title="Код" titleClassName="mb-2">
          <FormField
            control={control}
            name="pin"
            render={({ field, fieldState: { error } }) => (
              <>
                <InputOTP {...field} maxLength={4} className="px-4">
                  <InputOTPGroup className="w-full p-0 mx-auto flex justify-center">
                    <InputOTPSlot index={0} className="w-24 h-16 text-2xl" />
                    <InputOTPSlot index={1} className="w-24 h-16 text-2xl" />
                    <InputOTPSlot index={2} className="w-24 h-16 text-2xl" />
                    <InputOTPSlot index={3} className="w-24 h-16 text-2xl" />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError error={error} />
                <div className={`flex gap-1 text-sm ${!error ? "mt-4" : ""}`}>
                  <div>Код хүлээж авсангүй.</div>
                  <div
                    className={`hover:underline select-none ${
                      sessionLoad ? "opacity-50" : ""
                    } ${time > 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() =>
                      !sessionLoad && time < 1 && type && getCode()
                    }
                  >
                    Дахин авах {time > 0 && `(${time})`}
                  </div>
                  {sessionLoad && (
                    <LoaderIcon className="h-5 w-5 animate-spin" />
                  )}
                </div>
              </>
            )}
          />
        </ItemWrapper>
      </OrderDialog.Container>
      <OrderDialog.Footer
        onClick={handleSubmit(onSubmit)}
        loading={registering || verifying}
      >
        <div className="w-full text-center">Үргэлжлүүлэх</div>
      </OrderDialog.Footer>
    </>
  );
};

export default OrderOtp;
