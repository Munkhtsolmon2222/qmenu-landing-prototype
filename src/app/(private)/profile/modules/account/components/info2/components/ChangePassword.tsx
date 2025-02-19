"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import ItemWrapper from "../../ItemWrapper";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";
import CloseButton from "./CloseButton";
import { LoadingButton } from "@/components/ui/loading-button";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "@/graphql/mutation";
import { toast } from "@/components/ui/use-toast";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const BaseSchema = z.object({
  oldPassword: z
    .string({ required_error: "Хуучин ууц үгээ оруулна уу." })
    .min(2, {
      message: "Хуучин ууц үгээ оруулна уу.",
    }),
  password: z.string({ required_error: "Шинэ нууц үгээ оруулна уу." }).min(4, {
    message: "Нууц үг 4-с дээш тэмдэгтээс бүрдэнэ.",
  }),
  rePassword: z.string({ required_error: "Нууц үгээ давтан оруулна уу." }),
});

const FormSchema = BaseSchema.superRefine(({ password, rePassword }, ctx) => {
  if (rePassword !== password)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Нууц үг таарахгүй байна.",
      path: ["rePassword"],
    });

  return z.NEVER;
});

const ChangePassword: React.FC<Props> = ({
  onClose: onCloseModal,
  visible,
}) => {
  const [hidePassword, setHidePassword] = useState<{
    old: boolean;
    new: boolean;
  }>({ old: true, new: true });

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<z.infer<typeof FormSchema>>({
    mode: "all",
    resolver: zodResolver(FormSchema),
  });

  const onClose = () => {
    setValue("oldPassword", "");
    setValue("password", "");
    setValue("rePassword", "");
    onCloseModal();
  };

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD, {
    onCompleted() {
      toast({
        title: "Нууц үг амжилттай шинэчлэгдлээ.",
        variant: "default",
      });
      onClose();
    },
  });

  const onSubmit = (e: FieldValues) => {
    const input = { password: e.oldPassword, newPassword: e.password };
    updatePassword({ variables: { ...input } });
  };

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="h-full sm:h-max rounded-none px-0 sm:px-4">
        <CloseButton onClick={onClose} />
        <DialogHeader className="px-4 sm:px-0">
          <DialogTitle className="text-start">Нууц үг солих</DialogTitle>
        </DialogHeader>
        <div className="relative p-4">
          <FormField
            control={control}
            name="oldPassword"
            render={({
              field: { value = "", ...field },
              fieldState: { error },
            }) => (
              <ItemWrapper
                error={error}
                title="Хуучин нууц үг"
                titleClassName="text-sm"
              >
                <div className="relative w-full">
                  <Input
                    {...field}
                    value={value}
                    type={hidePassword.old ? "password" : "text"}
                    placeholder="Одоогийн нууц үгээ оруулна уу"
                    className="pr-10 h-12"
                  />
                  <div
                    className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                    onClick={() =>
                      setHidePassword({
                        ...hidePassword,
                        old: !hidePassword.old,
                      })
                    }
                  >
                    {hidePassword.old ? (
                      <Icons.eye className="h-7 w-5" />
                    ) : (
                      <Icons.eyeOff className="h-7 w-5" />
                    )}
                  </div>
                </div>
              </ItemWrapper>
            )}
          />

          <br />

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
                className="mb-3"
              >
                <div className="relative w-full">
                  <Input
                    {...field}
                    value={value}
                    type={hidePassword.new ? "password" : "text"}
                    placeholder="Нууц үгээ оруулна уу"
                    className="pr-10 h-12"
                  />
                  <div
                    className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                    onClick={() =>
                      setHidePassword({
                        ...hidePassword,
                        new: !hidePassword.new,
                      })
                    }
                  >
                    {hidePassword.new ? (
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
              <ItemWrapper error={error} titleClassName="text-sm">
                <Input
                  {...field}
                  value={value}
                  type={hidePassword ? "password" : "text"}
                  placeholder="Нууц үгээ давтан оруулна уу"
                  className="h-12"
                />
              </ItemWrapper>
            )}
          />
        </div>
        <DialogFooter className="px-3 flex">
          <LoadingButton
            loading={loading}
            disabled={!isValid}
            type="submit"
            className={`w-full sm:w-48 ${
              isValid
                ? "bg-primary"
                : "bg-primary-foreground hover:bg-primary-foreground"
            }`}
            onClick={handleSubmit(onSubmit)}
          >
            <span className={`${isValid ? "text-white" : "text-primary"}`}>
              Шинэчлэх
            </span>
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ChangePassword;
