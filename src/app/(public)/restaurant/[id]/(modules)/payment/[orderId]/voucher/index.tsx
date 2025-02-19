"use client";
import { useEffect, useState } from "react";
import { BlockItem, PaymentSchemaType } from "../..";
import { UseFormWatch } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CUSTOMER_PRODUCTS } from "@/graphql/query/customer";
import { CORRECTION_TRANSACTION, GET_PAY_ORDER } from "@/graphql/mutation";
import { TransactionInput } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import voucher from "@/assets/images/banks/voucher.svg";
import { VoucherCard } from "./components";
import { Icons } from "@/components/shared/icons";
import Image from "next/image";
type Props = {
  id?: string | undefined;
  watch: UseFormWatch<PaymentSchemaType>;
  order: string | undefined;
  onUpdateOrder: (data) => void;
  onFinish: (finish: boolean) => void;
};

export const VoucherForm: React.FC<Props> = ({
  onUpdateOrder,
  id,
  watch,
  order,
  onFinish,
}: Props) => {
  const paymentId = watch("payment");
  const paymentCode = watch("code");

  const [isShow, setIsShow] = useState(false);

  const { data, refetch } = useQuery<{ getCustomerProducts }>(
    GET_CUSTOMER_PRODUCTS,
    {
      fetchPolicy: "network-only",
    }
  );

  const products = (data?.getCustomerProducts || []).filter((product) => {
    if (product.state === "ACTIVE") {
      return true;
    } else if (product.state === "READY") {
      if (product?.spentOrder === order) return true;
      else return false;
    }
    return false;
  });

  useEffect(() => {
    if (paymentId !== id) {
      setIsShow(false);
    }
  }, [paymentId, id]);

  const onExpand = () => {
    setIsShow(!isShow);
  };

  // const onSelectVoucher = (code) => {
  //   onSelect(PAYMENT_TYPE.VCR, code);
  // };

  const [payOrderByPayment, { loading: paying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: async (data) => {
      onUpdateOrder(data);
      refetch();
      if (data.payOrder.order.paymentState === "PAID") {
        onFinish(true);
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

  const [returnTransaction, { loading: returning }] = useMutation(
    CORRECTION_TRANSACTION,
    {
      onCompleted: async (data) => {
        onUpdateOrder(data);
        refetch();
      },
      onError(err) {
        toast({
          title: "Алдаа",
          variant: "default",
          description: err.message,
        });
      },
    }
  );

  const onChangeState = async (voucher, state: string) => {
    if (!id || !order) return;

    switch (state) {
      case "ACTIVE":
        const input: TransactionInput = {
          order,
          buyer: "",
          register: "",
          vatType: 1,
          payment: id,
          confirm: false,
          code: voucher.id,
          amount: 0,
        };

        payOrderByPayment({
          variables: {
            input: input,
          },
        });
        break;
      case "READY":
        returnTransaction({
          variables: {
            id: voucher.transaction,
            reason: "Voucher returned",
          },
        });
        break;
      default:
        break;
    }
  };

  if (returning) return null;

  return (
    <>
      {data && (
        <BlockItem active={paymentId === id} className="py-2">
          <div
            className="flex place-items-center place-content-between p-1"
            onClick={() => onExpand()}
          >
            <div className="flex gap-2 place-items-center">
              <Image
                width={100}
                height={100}
                className="w-12 h-12"
                alt="voucher"
                src={voucher}
              />
              <div className="text-misty">Ваучер</div>
            </div>
            {isShow ? (
              <Icons.chevronUp className="text-misty text-2xl" />
            ) : (
              <Icons.chevronDown className="text-misty text-2xl" />
            )}
          </div>
          {isShow && (
            <>
              {returning || paying ? (
                <></>
              ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-1  ">
                  {products &&
                    products?.map((val, index) => (
                      <VoucherCard
                        isBasket={false}
                        loading={paying}
                        key={index}
                        customerProduct={val}
                        selectedId={paymentCode}
                        onChangeState={onChangeState}
                      />
                    ))}
                </div>
              )}
            </>
          )}
        </BlockItem>
      )}
    </>
  );
};
