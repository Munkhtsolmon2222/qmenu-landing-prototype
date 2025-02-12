"use client";
import { Icons } from "@/components/shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Customer, Gender } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ItemWrapper } from "../ItemWrapper";
import { useEffect, useState } from "react";
import female from "@/assets/images/profile/female.svg";
import male from "@/assets/images/profile/male.svg";
import { useTheme } from "@/hooks/useTheme";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "@/graphql/mutation";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
const Genders: { label: string; icon?: string; value: Gender }[] = [
  {
    label: "Эрэгтэй",
    value: Gender.Male,
    icon: male,
  },
  {
    label: "Эмэгтэй",
    value: Gender.Female,
    icon: female,
  },
  {
    label: "Бусад",
    value: Gender.Custom,
  },
];

interface Props {
  customer?: Customer;
}

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Нэрээ оруулна уу.",
  }),
  lastName: z.string().min(2, {
    message: "Овгоо оруулна уу.",
  }),
  gender: z.enum([Gender.Custom, Gender.Female, Gender.Male], {
    required_error: "Утгыг оруулна уу.",
  }),
});

export const Info: React.FC<Props> = ({ customer }) => {
  const { mainTheme } = useTheme();
  const [changed, setChanged] = useState<boolean>(false);

  const { handleSubmit, control, setValue, watch } = useForm<
    z.infer<typeof FormSchema>
  >({
    mode: "all",
    resolver: zodResolver(FormSchema),
  });

  const { gender, firstName, lastName } = watch();

  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    update(cache, { data: { updateProfile } }) {
      const caches = cache.readQuery<{ me: Customer }>({
        query: GET_CURRENT_CUSTOMER,
      });
      if (caches && caches.me) {
        cache.writeQuery({
          query: GET_CURRENT_CUSTOMER,
          data: { me: updateProfile },
        });
      }
    },
    onCompleted() {
      toast({
        title: "Амжилттай",
        variant: "default",
      });
    },
  });

  useEffect(() => {
    setChanged(
      (gender && firstName && lastName && gender !== customer?.gender) ||
        lastName !== customer?.lastName ||
        firstName !== customer?.firstName
    );
  }, [gender, firstName, lastName, customer]);

  useEffect(() => {
    if (customer) {
      setValue("firstName", customer.firstName ?? "");
      setValue("lastName", customer.lastName ?? "");
      setValue("gender", customer.gender ?? Gender.Male);
    }
  }, [customer, setValue]);

  function onSubmit(input: z.infer<typeof FormSchema>) {
    updateProfile({ variables: { input } });
  }

  return (
    <>
      <div className="text-lg font-medium mb-5">Хэрэглэгчийн мэдээлэл</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 text-white">
            <AvatarImage alt="AI Assistant" src="/placeholder-user.jpg" />
            <AvatarFallback className="text-xl bg-current-3">
              {(customer?.firstName ?? "Gu").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-xl xl:text-2xl font-medium">
            {customer?.firstName}
          </div>
        </div>
        <LoadingButton
          loading={loading}
          variant={changed ? "default" : "outline"}
          disabled={!changed}
          className="flex items-center gap-2"
          onClick={handleSubmit(onSubmit)}
        >
          <div className="font-normal">Засах</div>
          <div className="h-5">
            <Icons.pencilLine className="h-full w-full" />
          </div>
        </LoadingButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col gap-5 sm:mr-5">
          <Controller
            control={control}
            name="lastName"
            render={({
              field: { value = "", ...field },
              fieldState: { error },
            }) => (
              <ItemWrapper title="Овог" error={error}>
                <Input
                  placeholder="Овог"
                  {...field}
                  value={value}
                  className="h-12"
                />
              </ItemWrapper>
            )}
          />

          <Controller
            control={control}
            name="firstName"
            render={({
              field: { value = "", ...field },
              fieldState: { error },
            }) => (
              <ItemWrapper title="Нэр" error={error}>
                <Input
                  placeholder="Нэр"
                  {...field}
                  value={value}
                  className="h-12"
                />
              </ItemWrapper>
            )}
          />
        </div>

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <ItemWrapper title="Хүйс" error={error}>
              <div className="flex gap-2">
                {Genders.map((item, index) => {
                  const active = item.value === gender;
                  return (
                    <Button
                      onClick={() => onChange(item.value)}
                      key={index}
                      variant={active ? "default" : "outline"}
                    >
                      {item.icon && (
                        <Image
                          width={100}
                          height={100}
                          className="w-auto h-auto"
                          src={item.icon ?? "/fallback-icon.png"}
                          alt={"Icon"}
                          style={{
                            filter:
                              (mainTheme === "light" && active) ||
                              (mainTheme !== "light" && !active)
                                ? "brightness(0) invert(100%)"
                                : "none", //
                          }}
                        />
                      )}
                      <div className="ml-1">{item.label}</div>
                    </Button>
                  );
                })}
              </div>
            </ItemWrapper>
          )}
        />
      </div>
    </>
  );
};
