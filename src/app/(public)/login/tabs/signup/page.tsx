"use client";
import { z } from "zod";
import { ChildProps } from "../../page";
import { ItemWrapper } from "../../components/ItemWrapper";
import { OTP } from "../../components/OTP";
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
import { RegisterForm } from "./components/RegisterForm";
import { SignUpReturnValue } from "@/lib/types";
import { AuthContext } from "@/lib/providers/auth";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
interface Props extends ChildProps {
  additionalProp?: string;
}

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

const Signup: React.FC<Props> = ({ setTab, tab }) => {
  const [step, setStep] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>();
  const { t } = useTranslation();
  const [time, setTime] = useState(() => {
    const sessionTime = localStorage.getItem("sessionTime");
    return sessionTime ? Number(sessionTime) : 0;
  });

  const [getMe, { loading: userLoading }] = useLazyQuery(GET_CURRENT_CUSTOMER, {
    onCompleted() {
      setTab("signin");
      router.push("/");
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

  useEffect(() => {
    setStep(0);
  }, [tab]);

  const onSubmit = ({ phone }: FormSchema) => {
    const sessionPhone = localStorage.getItem("sessionPhone");
    if (step < Steps.length - 1) {
      if (phone !== sessionPhone) {
        getSession({
          variables: { phone, type: SessionType.R },
          onCompleted: (data) => {
            setSessionId(data.getSession);
            setStep(step + 1);
            setTime(59);
            localStorage.setItem("sessionPhone", phone);
          },
        });
      } else {
        setStep(step + 1);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("sessionTime", time.toString());

    let interval: ReturnType<typeof setInterval> | undefined;
    if (time > 0)
      interval = setInterval(() => setTime((seconds) => seconds - 1), 1000);
    else if (time === 0) {
      localStorage.removeItem("sessionPhone");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  const onSuccessVerify = () => {
    localStorage.removeItem("sessionTime");
    localStorage.removeItem("sessionPhone");
    setStep(step + 1);
  };

  const onFinish = (e: SignUpReturnValue) => {
    toast({
      title: "Амжилттай бүртгэгдлээ.",
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
          <ItemWrapper title={t("Phone")} error={error} className="mb-6">
            <Input
              {...field}
              maxLength={8}
              value={value}
              className="h-12 w-80"
              placeholder="00000000"
            />
          </ItemWrapper>
        )}
      />
      <div className="opacity-70 px-2 w-[350px]">
        {t("You will receive a 4-digit verification code")}
      </div>
      <div className="px-2 ">
        <LoadingButton
          loading={loading}
          disabled={!isValid}
          type="submit"
          className={` mt-10 rounded-full bg-current w-80`}
          onClick={handleSubmit(onSubmit)}
        >
          <span>{t("login")}</span>
        </LoadingButton>
      </div>
    </>,
    <OTP
      key="phone"
      phone={phone}
      tryCode={tryCode}
      time={time}
      loading={loading}
      onFinish={onSuccessVerify}
      sessionId={sessionId}
      goBack={() => setStep(step - 1)}
    />,
    <RegisterForm
      key="register"
      onFinish={onFinish}
      setTab={setTab}
      tab={tab}
      session={sessionId}
      phone={phone}
      loading={userLoading}
    />,
  ];

  return (
    <div
      className={`relative py-4 mb-3 flex flex-col overflow-y-auto ${
        step === 2 ? "sm:h-[calc(75vh_-_100px)]" : "sm:h-[calc(60vh_-_100px)]"
      }`}
    >
      {Steps[step]}
    </div>
  );
};

export default Signup;
