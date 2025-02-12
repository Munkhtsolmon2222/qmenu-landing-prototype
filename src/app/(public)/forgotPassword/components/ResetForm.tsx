"use client";
import { FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ItemWrapper } from "../../Login/components/ItemWrapper";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "@/graphql/mutation";
import { Icons } from "@/components/shared/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignUpReturnValue } from "@/lib/types";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    password: z.string({ required_error: "Нууц үгээ оруулна уу." }).min(2, {
      message: "Нууц үгээ оруулна уу.",
    }),
    rePassword: z.string({ required_error: "Нууц үгээ давтан оруулна уу" }),
  })
  .superRefine(({ password, rePassword }, ctx) => {
    if (rePassword !== password)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Нууц үг таарахгүй байна.",
        path: ["rePassword"],
      });

    return z.NEVER;
  });

type FormSchema = z.infer<typeof FormSchema>;

interface Props {
  onFinish: (signUp: SignUpReturnValue) => void;
  session?: string;
  loading: boolean;
}

export const ResetForm = ({ onFinish, session, loading: userLoad }: Props) => {
  const [hidePassword, setHidePassword] = useState<Record<0 | 1, boolean>>({
    0: true,
    1: true,
  });
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
  });

  const [passwordReset, { loading }] = useMutation(FORGOT_PASSWORD, {
    onCompleted({ signUp }) {
      router.push("/login");
      onFinish(signUp);
    },
  });

  const onSubmit = (data: FormSchema) => {
    passwordReset({
      variables: {
        password: data.password,
        session,
      },
    });
  };

  return (
    <div className="w-max-96">
      <FormField
        control={control}
        name="password"
        render={({
          field: { value = "", ...field },
          fieldState: { error },
        }) => (
          <ItemWrapper
            error={error}
            title="Шинэ нууц үг"
            titleClassName="text-sm"
            className="mb-4"
          >
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                type={hidePassword[0] ? "password" : "text"}
                placeholder="Нууц үгээ оруулна уу"
                className="pr-10 h-12"
              />
              <div
                className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                onClick={() =>
                  setHidePassword({ ...hidePassword, 0: !hidePassword[0] })
                }
              >
                {hidePassword[0] ? (
                  <Icons.eye className="h-7 w-5" />
                ) : (
                  <Icons.eyeOff className="h-7 w-5" />
                )}
              </div>
            </div>
          </ItemWrapper>
        )}
      />
      <FormField
        control={control}
        name="rePassword"
        render={({
          field: { value = "", ...field },
          fieldState: { error },
        }) => (
          <ItemWrapper
            error={error}
            title="Шинэ нууц үг давтах"
            titleClassName="text-sm"
          >
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                type={hidePassword[1] ? "password" : "text"}
                placeholder="Нууц үгээ давтан оруулна уу"
                className="pr-10 h-12"
              />
              <div
                className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                onClick={() =>
                  setHidePassword({ ...hidePassword, 1: !hidePassword[1] })
                }
              >
                {hidePassword[1] ? (
                  <Icons.eye className="h-7 w-5" />
                ) : (
                  <Icons.eyeOff className="h-7 w-5" />
                )}
              </div>
            </div>
          </ItemWrapper>
        )}
      />

      <div className="px-2 w-full">
        <LoadingButton
          loading={loading || userLoad}
          disabled={!isValid}
          type="submit"
          className={`w-full mt-6 rounded-full bg-current ${
            isValid
              ? "bg-primary"
              : "bg-primary-foreground hover:bg-primary-foreground"
          }`}
          onClick={handleSubmit(onSubmit)}
        >
          <span className={`${isValid ? "text-white" : "text-primary"}`}>
            Нууц үг шинэчлэх
          </span>
        </LoadingButton>
      </div>
    </div>
  );
};
