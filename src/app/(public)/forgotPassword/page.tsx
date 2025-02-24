"use client";
import { z } from "zod";
import ItemWrapper from "@/app/(public)/login/components/ItemWrapper";
// import ItemWrapper from "../login/components/ItemWrapper";
import { OTP } from "@/app/(public)/login/components/OTP";
import { useContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_SESSION } from "@/graphql/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { SessionType } from "@/lib/config/constant";
import { toast } from "@/components/ui/use-toast";
import { ResetForm } from "./components/ResetForm";
import { SignUpReturnValue } from "@/lib/types";
import { AuthContext } from "@/lib/providers/auth";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  phone: z
    .string({
      required_error: "Утасны дугаараа оруулна уу",
    })
    .refine(
      (phone) => {
        return /^\d{8}$/.test(phone);
      },
      { message: "Утасны дугаар буруу байна" }
    ),
});

type FormSchema = z.infer<typeof FormSchema>;

const ForgotPassword = () => {
  const [step, setStep] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>();
  const { t } = useTranslation();

  const [time, setTime] = useState(() => {
    if (typeof window !== "undefined") {
      const sessionTime = localStorage?.getItem("sessionTime");
      return sessionTime ? Number(sessionTime) : 0;
    }
    return 0;
  });

  const [getMe, { loading: userLoading }] = useLazyQuery(GET_CURRENT_CUSTOMER, {
    onCompleted() {
      router.push("/profile");
      setSessionId(undefined);
      setStep(0);
    },
  });

  const router = useRouter();

  const { authenticate } = useContext(AuthContext);

  const [getSession, { loading }] = useMutation(GET_SESSION);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { phone } = watch();

  const tryCode = () => {
    getSession({
      variables: { phone, type: SessionType.R },
      onCompleted: (data) => {
        setTime(59);
        setSessionId(data.getSession);
      },
    });
  };

  const onSubmit = ({ phone }: FormSchema) => {
    if (typeof window !== "undefined") {
      const sessionPhone = localStorage?.getItem("sessionPhone");
      if (step < Steps.length - 1) {
        if (phone !== sessionPhone) {
          getSession({
            variables: { phone, type: SessionType.P },
            onCompleted: (data) => {
              setSessionId(data.getSession);
              setStep(step + 1);
              setTime(59);
              localStorage?.setItem("sessionPhone", phone);
            },
          });
        } else {
          setStep(step + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage?.setItem("sessionTime", time.toString());
    }

    let interval: ReturnType<typeof setInterval> | undefined;
    if (time > 0) {
      interval = setInterval(() => setTime((seconds) => seconds - 1), 1000);
    } else if (time === 0) {
      if (typeof window !== "undefined") {
        localStorage?.removeItem("sessionPhone");
      }
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  const onSuccessVerify = () => {
    if (typeof window !== "undefined") {
      localStorage?.removeItem("sessionTime");
      localStorage?.removeItem("sessionPhone");
    }
    setStep(step + 1);
  };

  const onFinish = (e: SignUpReturnValue) => {
    toast({
      title: "Амжилттай шинэчлэгдлээ.",
      variant: "default",
    });
    authenticate(e.token, () => {
      getMe();
    });
  };

  const Steps = [
    <>
      <FormField
        control={control}
        name="phone"
        render={({
          field: { value = "", ...field },
          fieldState: { error },
        }) => (
          <ItemWrapper title="Утас" error={error} className="mb-6">
            <Input
              {...field}
              maxLength={8}
              value={value}
              className="h-12"
              placeholder="00000000"
            />
          </ItemWrapper>
        )}
      />
      <div className="opacity-70 px-2">
        {t("You will receive a 4-digit verification code")}
      </div>
      <div
        className="text-sm hover:underline ml-auto mt-2 text-secondary-text underline text-end"
        onClick={() => router.push("/login")}
      >
        {t("login")}
      </div>
      <div className="px-2 w-full">
        <LoadingButton
          loading={loading}
          disabled={!isValid}
          type="submit"
          className={`w-full mt-8 rounded-full bg-current`}
          onClick={handleSubmit(onSubmit)}
        >
          <span> {t("Password recovery")}</span>
        </LoadingButton>
      </div>
    </>,
    <OTP
      key="otp"
      phone={phone}
      tryCode={tryCode}
      time={time}
      loading={loading}
      onFinish={onSuccessVerify}
      sessionId={sessionId}
      goBack={() => setStep(step - 1)}
    />,
    <ResetForm
      key="resetForm"
      onFinish={onFinish}
      session={sessionId}
      loading={userLoading}
    />,
  ];

  return (
    <div
      className={`relative  mb-3 flex flex-col overflow-y-auto  my-16 py-4 px-5 w-full   items-center    ${
        step === 2 ? "sm:h-[calc(75vh_-_100px)]" : "sm:h-[calc(60vh_-_100px)]"
      }`}
    >
      <div className="max-w-96 w-full">
        <div className="w-full justify-center items-center flex  py-2 mb-4 rounded-md ">
          <h2 className="text-xl font-medium">{t("Password recovery")}</h2>
        </div>
        {Steps[step]}
      </div>
    </div>
  );
};

export default ForgotPassword;
