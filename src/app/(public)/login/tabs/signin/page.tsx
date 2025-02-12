"use client";
import { z } from "zod";
import { ChildProps } from "../../page";
import { ItemWrapper } from "../../components/ItemWrapper";
import { useContext, useState } from "react";
import { AuthContext, getPayload } from "@/lib/providers/auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";
import { LoadingButton } from "@/components/ui/loading-button";
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
  password: z.string().min(2, {
    message: "Нууц үгээ оруулна уу.",
  }),
});

const Signin: React.FC<Props> = ({ nextPath }) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const { t } = useTranslation();
  const router = useRouter();

  const { authenticate } = useContext(AuthContext);

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      authenticate(data.signIn.token, () => {
        router.push(nextPath ?? "/");
      });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (getPayload()?.role === "customer") {
      router.push(nextPath ?? "/");
    } else {
      login({ variables: { phone: data.phone, password: data.password } });
    }
  }

  return (
    <div className="flex-col overflow-y-auto mb-20 flex items-center w-full max-w-96 ">
      {/* <p className="w-full text-center text-xl font-semibold">Нэвтрэх</p> */}
      <p className="w-full text-center text-md text-secondary-text">
        {t("Hello! Welcome")}
      </p>
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
              className="h-12 w-80 text-secondary-text opacity-90 bg-secondary-background "
              placeholder="00000000"
            />
          </ItemWrapper>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({
          field: { value = "", ...field },
          fieldState: { error },
        }) => (
          <ItemWrapper
            error={error}
            title={t("Password")}
            titleClassName="text-sm"
          >
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                type={hidePassword ? "password" : "text"}
                placeholder={t("Please enter your password")}
                className="pr-10 h-12  w-80  text-secondary-text opacity-90 bg-secondary-background"
              />
              <div
                className="absolute cursor-pointer bottom-2.5 right-16 opacity-40 hover:opacity-100"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? (
                  <Icons.eye className="h-7 w-5" />
                ) : (
                  <Icons.eyeOff className="h-7 w-5" />
                )}
              </div>
            </div>
            <div
              className="text-sm hover:underline ml-auto mt-2 underline mr-12"
              onClick={() => router.push("/forgot-password")}
            >
              {t("Forgot your password")}
            </div>
          </ItemWrapper>
        )}
      />
      <div className="px-2 w-full">
        <LoadingButton
          loading={loading}
          disabled={!isValid}
          type="submit"
          className={`w-80 mt-10 rounded-full bg-current `}
          onClick={handleSubmit(onSubmit)}
        >
          <span>{t("login")}</span>
        </LoadingButton>
      </div>
    </div>
  );
};

export default Signin;
