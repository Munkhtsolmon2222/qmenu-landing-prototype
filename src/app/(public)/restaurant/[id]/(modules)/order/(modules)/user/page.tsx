"use client";
import OrderDialog from "@/components/modal/OrderDialog/page";
import { FieldError } from "@/app/(public)/restaurant/components/FieldError";
import ItemWrapper from "../../components/ItemWrapper";
import { FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderUserInput, OrderUserSchema } from "../../validation";
import { Input } from "@/components/ui/input";
import { SEARCH_CUSTOMERS } from "@/graphql/query/customer";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SessionType } from "@/lib/config/constant";
import { LOGIN } from "@/graphql/mutation";
import {
  PAGE_RESTAURANT,
  PAGE_ORDER,
  PAGE_TAKE_AWAY,
  PAGE_TABLE_ORDER,
  PAGE_ORDER_OTP,
  PAGE_ORDER_TYPE,
  PAGE_ORDER_EVENT,
} from "@/lib/config/page";
import { AuthContext, getPayload } from "@/lib/providers/auth";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { OrderType } from "@/lib/types";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
const Index: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  const { input, setInput } = useRestaurantStore();
  const isCustomer = isAuthenticated && getPayload()?.role === "customer";

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    trigger,
    clearErrors,
    formState: { isValid },
  } = useForm<OrderUserInput>({
    mode: "onSubmit",
    resolver: zodResolver(OrderUserSchema),
    defaultValues: {
      phone: input?.contact,
      user: localStorage?.getItem("sessionType") === SessionType.P,
    },
  });

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => onFinish(data.signIn.token),
  });

  const { phone = "", user } = watch();
  const { t } = useTranslation();
  const [searchCustomers, { loading: searchLoading }] = useLazyQuery(
    SEARCH_CUSTOMERS,
    {
      onCompleted: (data) => {
        localStorage?.removeItem("sessionId");
        setInput((e) => ({ ...e, contact: phone }));

        const item = data.searchCustomers[0];

        if (item) {
          localStorage.setItem("sessionType", SessionType.P);
          setValue("user", true);
        } else {
          localStorage.setItem("sessionType", SessionType.R);
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_OTP}`
          );
        }
      },
    }
  );

  const onFinish = (token: string) => {
    localStorage?.removeItem("sessionType");
    localStorage?.removeItem("sessionId");
    localStorage?.removeItem("sessionStart");

    authenticate(token, () => {
      if (!input) {
        router.push(`${PAGE_RESTAURANT}/${id}`);
        return;
      }

      switch (input.type) {
        case OrderType.PreOrder:
        case OrderType.TableOrder:
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`
          );
          return;
        case OrderType.Event:
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_EVENT}`
          );
          return;
        case OrderType.TakeAway:
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TAKE_AWAY}`
          );
          return;
        default:
          router.push(`${PAGE_RESTAURANT}/${id}`);
      }
    });
  };

  const onSubmit = (e: OrderUserInput) => {
    login({ variables: { phone: e.phone, password: e.password } });
  };

  useEffect(() => {
    if (isCustomer) {
      router.push(`${PAGE_RESTAURANT}/${id}`);
      return;
    }
  }, [isCustomer, id, router]);

  return (
    <>
      <OrderDialog.Header
        onClick={
          [OrderType.PreOrder, OrderType.TakeAway].includes(
            input?.type as OrderType
          )
            ? () =>
                router.push(
                  `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`
                )
            : undefined
        }
      >
        {t("User")}
      </OrderDialog.Header>
      <OrderDialog.Container className="flex flex-col gap-4">
        <ItemWrapper title={t("Phone number")} titleClassName="mb-2">
          <FormField
            control={control}
            name="phone"
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <>
                <Input
                  {...field}
                  disabled={searchLoading}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 8) {
                      clearErrors("phone");
                      searchCustomers({ variables: { query: value } });
                    }
                    onChange((value ?? "").slice(0, 8));
                  }}
                  type="number"
                  maxLength={8}
                  placeholder={t("Phone number")}
                />
                <FieldError error={error} />
              </>
            )}
          />
        </ItemWrapper>

        {user && phone.length === 8 && (
          <>
            <ItemWrapper title="Нууц үг" titleClassName="mb-2">
              <FormField
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} type="password" placeholder="Нууц үг" />
                    <FieldError error={error} />
                  </>
                )}
              />
            </ItemWrapper>

            <div className="w-full flex items-center gap-4 my-4">
              <div className="w-full border-t" />
              <div className="text-sm text-nowrap">{t("Or")}</div>
              <div className="w-full border-t" />
            </div>

            <Button
              onClick={() => {
                trigger(["phone"]).then((valid) => {
                  if (valid) {
                    router.push(
                      `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_OTP}`
                    );
                  }
                });
              }}
            >
              {t("Login with one-time code")}
            </Button>
          </>
        )}
      </OrderDialog.Container>
      <OrderDialog.Footer
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid}
        loading={loading}
      >
        <div className="w-full text-center">{t("Continue")}</div>
      </OrderDialog.Footer>
    </>
  );
};

export default Index;
