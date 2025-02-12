"use client";
import { GET_ORDER } from "@/graphql/query";
import { Customer, Order, Transaction } from "@/lib/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { LoaderIcon } from "lucide-react";
// import {
//   BanksForm,
//   OrderInfo,
//   QpayForm,
//   SuccesOrder,
//   UpointForm,
//   VatForm,
//   VoucherForm,
//   WaitPaymentModal,
// } from "@/pages/public/Restaurant/modules/Payment/components";
import { BanksForm } from "./[orderId]/page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icons } from "@/components/shared/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  LoyaltyType,
  PAYMENT_TYPE,
  PartnerObjType,
  SystemType,
} from "@/lib/config/constant";
import { PAGE_HOME, PAGE_RESTAURANT } from "@/lib/config/page";
import {
  CORRECTION_TRANSACTION,
  GET_PAY_ORDER,
  PAY_ORDER_WITH_SUB_PAYMENTS,
  VALIDATE_TRANSACTION,
} from "@/graphql/mutation";
import { toast } from "@/components/ui/use-toast";
import { useContext, useEffect, useState } from "react";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { UpointContext } from "@/lib/providers/upoint.context";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { getPayload } from "@/lib/providers/auth";
import OrderDialog from "@/components/modal/OrderDialog/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import { OrderInfo } from "./components/OrderInfo";
import { OrderInfo } from "./[orderId]/page";
import {
  QpayForm,
  SuccesOrder,
  UpointForm,
  VatForm,
  VoucherForm,
  WaitPaymentModal,
} from "./[orderId]/page";
const baseSchema = z.object({
  vatType: z.string({ required_error: "НӨАТ-ийн төрлөө сонгоно уу" }),
  code: z.string().optional(),
  register: z.string().optional(),
  buyer: z.string().optional(),
  payment: z.string().optional(),
  paymentType: z.string().optional(),
});

const formSchema = baseSchema.superRefine(
  ({ vatType, register, payment, paymentType }, ctx) => {
    if (vatType && vatType === "3") {
      if (!register || register.length < 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Байгууллагын регистер-ээ оруулна уу",
          path: ["register"],
        });
      }
    }

    if (!payment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Төлбөрийн төрлөө сонгоно уу",
        path: ["payment"],
      });
    }

    if (!paymentType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Төлбөрийн төрлөө сонгоно уу",
        path: ["payment"],
      });
    }

    return z.NEVER;
  }
);

export type PaymentSchemaType = z.infer<typeof formSchema>;

const Index = () => {
  const router = useRouter();
  const { current } = useRestaurantStore();
  const orderId = useSearchParams();
  const [partner, setPartner] = useState<SystemType>();
  const [visiblePending, setVisiblePending] = useState(false);
  const [visibleSucces, setVisibleSucces] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const [cancelTransactionId, setCancelTransactionId] = useState<string>();
  const { upointBalance, addOrderLoyalty, addingLoyalty, clearUpointState } =
    useContext(UpointContext);

  const [returnTransaction, { loading: returning }] = useMutation(
    CORRECTION_TRANSACTION
  );

  const { control, watch, setValue, handleSubmit } = useForm<PaymentSchemaType>(
    {
      mode: "onSubmit",
      resolver: zodResolver(formSchema),
      defaultValues: { vatType: "1" },
    }
  );

  const { paymentType = "" } = watch();

  const [
    refetch,
    { data: { getOrder: order } = { getOrder: undefined }, loading },
  ] = useLazyQuery<{
    getOrder: Order;
  }>(GET_ORDER, {
    variables: { id: orderId },
    onError: () => {
      if (current) router.push(`${PAGE_RESTAURANT}/${current.id}`);
      else router.push(`${PAGE_HOME}`);
    },
  });

  const { data: { me: user } = { me: undefined }, loading: loadUser } =
    useQuery<{ me: Customer }>(GET_CURRENT_CUSTOMER, {
      fetchPolicy: "cache-first",
    });

  const [validateTransaction, { loading: validating }] = useMutation(
    VALIDATE_TRANSACTION,
    {
      onCompleted(data) {
        if (data.validateTransaction.paymentState === "PAID") {
          setVisiblePending(false);
          setVisibleSucces(true);
        }
        //  else if (data.validateTransaction.paymentState !== "PAID") {
        //   toast({
        //     title: "Төлөгдөөгүй",
        //     variant: "default",
        //     description: "Таны төлбөр төлөгдөөгүй байна.",
        //   });
        // }
      },
    }
  );

  const [payOrderByPayment, { loading: paying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: async (data) => {
      if (data.payOrder.order.paymentState === "PAID") {
        setVisiblePending(false);
        setVisibleSucces(true);
      } else {
        setTransaction(data.payOrder.transaction);
        let link = null;
        if (data.payOrder.transaction.links) {
          link = data.payOrder.transaction.links.find(
            (link) => link.name.toUpperCase() === paymentType.toUpperCase()
          )?.link;
        }

        if (link) {
          window.location.href = link;
          setVisiblePending(true);
        } else {
          toast({
            title: "Алдаа",
            variant: "default",
            description: "Payment link not found",
          });
        }
      }
    },
    onError(err) {
      toast({
        title: "Алдаа",
        variant: "default",
        description: err.message,
      });
    },
  });

  const onCompletedPayOrder = (data) => {
    if (upointBalance?.state === "spend")
      setCancelTransactionId(
        data.order.transactions?.find(
          (item: Transaction) =>
            item.state === "PAID" && item.type === PAYMENT_TYPE.UPT
        )?.id
      );

    setTransaction(data.transaction);
    const link = data.transaction.links.find(
      (link) => link.name.toUpperCase() === paymentType.toUpperCase()
    )?.link;
    if (link) {
      window.location.href = link;
      setVisiblePending(true);
    } else {
      toast({
        title: "Алдаа",
        variant: "default",
        description: "Payment link not found",
      });
    }
  };

  const [payOrderByPayments, { loading: paying2 }] = useMutation(
    PAY_ORDER_WITH_SUB_PAYMENTS,
    {
      onCompleted: (data) => onCompletedPayOrder(data.payOrderWithSubPayments),
      onError() {},
    }
  );

  const updateOrder = () => {
    refetch();
  };

  const finish = () => {
    setVisiblePending(false);
    setVisibleSucces(true);
  };

  useEffect(() => {
    refetch();

    const partner = PartnerObjType[getPayload()?.type ?? ("" as SystemType)];

    if (partner) {
      setPartner(partner.type);
      // setValue("paymentType", partner.payment);
    }

    clearUpointState();
    if ((order?.transactions ?? []).length > 0) {
      setTransaction(order?.transactions[0]);
    }
  }, [clearUpointState, order?.transactions, refetch]);

  const onFinish = async (values: PaymentSchemaType) => {
    if (paying || paying2) return;
    let inputs = [
      {
        buyer: values.buyer,
        payment: values.payment,
        register: values.register,
        vatType: +values.vatType,
        code: values.code,
        order: order?.id,
        confirm: false,
      },
    ];

    if (upointBalance?.state === "spend") {
      inputs = inputs.concat([
        {
          order: order?.id,
          buyer: "",
          register: "",
          vatType: 1,
          payment: current?.payments.find((val) => val === PAYMENT_TYPE.UPT),
          confirm: false,
          code: "",
        },
      ]);
    }

    if (upointBalance && upointBalance.state === "collect") {
      await addOrderLoyalty({
        variables: { id: order?.id, type: LoyaltyType.U },
        onError: (error: Error) =>
          toast({
            title: "Алдаа",
            variant: "default",
            description: error.message,
          }),
      });
    }

    if (inputs.length > 1) {
      payOrderByPayments({
        variables: { input: inputs[0], inputs: inputs[1] },
      });
    } else {
      payOrderByPayment({
        variables: {
          input: { ...inputs[0] },
        },
      });
    }
  };

  const onRefetch = async (transactionId: string) => {
    try {
      await validateTransaction({
        variables: { id: transactionId },
        onCompleted(data) {
          if (data.validateTransaction.paymentState === "PAID") {
            setVisiblePending(false);
            setVisibleSucces(true);
            clearUpointState();
          } else if (data.validateTransaction.paymentState !== "PAID") {
            toast({
              title: "Төлөгдөөгүй",
              variant: "default",
              description: "Таны төлбөр төлөгдөөгүй байна.",
            });
          }
        },
      });
    } catch (error) {
      console.error("Error while refetching:", error);
      toast({
        title: "Алдаа",
        variant: "default",
        description: "Та мэдээллийг дахин татахад алдаа гарлаа.",
      });
    }
  };

  const onCloseWaitPaymentModal = async (transactionId: string) => {
    if (cancelTransactionId) {
      const { data } = await validateTransaction({
        variables: { id: transactionId },
      });
      if (data.validateTransaction.paymentState !== "PAID") {
        await returnTransaction({
          variables: {
            id: cancelTransactionId,
            reason: "Цуцалсан",
          },
        });
        clearUpointState();
      }
    }
    setVisiblePending(false);
  };

  if (loading || loadUser) {
    return (
      <div className="h-[calc(100vh_-_170px)] w-full flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <OrderDialog.Header onClick={() => router.back()}>
        Төлбөр төлөх
      </OrderDialog.Header>
      <OrderInfo order={order} participant={current} />
      <OrderDialog.Container className="px-0">
        <div className="flex flex-col gap-4 mt-[60px]">
          <div />
          <BlockItem className="p-0">
            <Alert className="border-0 bg-[#e5f9fe]">
              <Icons.info
                className="w-5 "
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(34%) sepia(91%) saturate(2854%) hue-rotate(169deg) brightness(98%) contrast(102%)",
                }}
              />
              <AlertDescription className="text-[#0093B9]">
                Та төлбөрөө төлөөд энэхүү дэлгэцрүү буцан орж захиалгаа
                баталгаажуулаарай.
              </AlertDescription>
            </Alert>
          </BlockItem>

          <VatForm watch={watch} setValue={setValue} control={control} />

          <BanksForm participant={current} watch={watch} setValue={setValue} />

          {!partner && (
            <QpayForm
              payment={current?.payments.find((payment) =>
                [PAYMENT_TYPE.QPay, PAYMENT_TYPE.QPay2].includes(payment)
              )}
              watch={watch}
              setValue={setValue}
            />
          )}

          {current?.payments.find(
            (payment) => payment === PAYMENT_TYPE.VCR
          ) && (
            <VoucherForm
              order={order?.id}
              id={current.payments.find(
                (payment) => payment === PAYMENT_TYPE.VCR
              )}
              watch={watch}
              onUpdateOrder={updateOrder}
              onFinish={finish}
            />
          )}

          {user?.phone &&
            user.verified &&
            current?.payments.find((item) => item === PAYMENT_TYPE.UPT) && (
              <UpointForm
                order={order}
                user={user}
                payment={current.payments.find(
                  (item) => item === PAYMENT_TYPE.UPT
                )}
              />
            )}
        </div>
      </OrderDialog.Container>

      <WaitPaymentModal
        loadingCancel={returning}
        transaction={transaction}
        visible={visiblePending}
        onClose={onCloseWaitPaymentModal}
        refetch={onRefetch}
      />

      <SuccesOrder
        visible={visibleSucces}
        orderNumber={order?.number}
        participant={current}
      />

      <OrderDialog.Footer
        loading={loading || paying || addingLoyalty || paying2 || validating}
        onClick={handleSubmit(onFinish)}
      >
        <span>Төлбөр төлөх</span>
        <span>{order?.debtAmount.toLocaleString()} MNT</span>
      </OrderDialog.Footer>
    </>
  );
};

export default Index;

export const BlockItem: React.FC<
  React.PropsWithChildren<{
    className?: string;
    active?: boolean;
    onClick?: () => void;
  }>
> = ({ children, className, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "mx-3 bg-background p-4 rounded-md overflow-hidden",
        active && "border-2 border-primary",
        className
      )}
    >
      {active && (
        <div className="absolute top-2 left-2 w-5 h-5 border-2 rounded-full flex items-center justify-center border-primary bg-primary">
          <Icons.check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      {children}
    </div>
  );
};
