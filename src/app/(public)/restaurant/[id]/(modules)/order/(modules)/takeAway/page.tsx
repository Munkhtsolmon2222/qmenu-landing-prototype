"use client";
import { toast } from "@/components/ui/use-toast";
import {
  PAGE_ORDER,
  PAGE_ORDER_TYPE,
  PAGE_PAYMENT,
  PAGE_RESTAURANT,
} from "@/lib/config/page";
import OrderDialog from "@/components/modal/OrderDialog/page";
import { useEffect, useState } from "react";
import { generateTimeArray, getDateByTime } from "../../utils";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { ButtonItem } from "../../components/ButtonItem";
import { FieldError } from "@/app/(public)/restaurant/components/FieldError";
import ItemWrapper from "../../components/ItemWrapper";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TakeAwayInput, TakeAwaySchema } from "../../validation";
import { Customer, Order, OrderInput } from "@/lib/types";
import { CREATE_ORDER } from "@/graphql/mutation/order";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
const ASAP = { name: "Яаралтай", value: "ASAP" };

const Index: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { current, items, input, getOrderItemsInput, setInput } =
    useRestaurantStore();
  const { watch, control, handleSubmit } = useForm<TakeAwayInput>({
    mode: "onSubmit",
    resolver: zodResolver(TakeAwaySchema),
    defaultValues: {
      deliveryDate: input?.deliveryDate,
      comment: input?.comment,
    },
  });

  const { data: { me: customer } = { me: null }, loading: meLoading } =
    useQuery<{
      me: Customer;
    }>(GET_CURRENT_CUSTOMER, {
      fetchPolicy: "cache-first",
    });

  const { deliveryDate } = watch();
  const [durations, setDurations] = useState<{ value: string; name: string }[]>(
    []
  );

  const [createOrder, { loading: creating }] = useMutation<{
    createOrder: Order;
  }>(CREATE_ORDER);

  useEffect(() => {
    const times = generateTimeArray(current?.branch?.timetable);

    if (times && times.length > 0) {
      setDurations([
        ASAP,
        ...generateTimeArray(current?.branch?.timetable)
          .filter((e) => getDateByTime(e) >= new Date())
          .map((e) => ({
            value: e,
            name: e,
          })),
      ]);
    }
  }, [current?.branch?.timetable]);

  const onFinish = (e: TakeAwayInput) => {
    if (!input) return;

    const items = getOrderItemsInput();

    const orderInput: OrderInput = {
      ...input,
      ...e,
      items,
      name: customer?.firstName ?? "",
      contact: customer?.phone ?? "",
    };

    setInput(() => orderInput);
    createOrder({
      variables: { input: orderInput, participant: id },
      onCompleted({ createOrder: order }) {
        router.push(`${PAGE_RESTAURANT}/${id}/${PAGE_PAYMENT}/${order.id}`);
      },
    });
  };

  useEffect(() => {
    if (items.length < 1) {
      toast({
        title: "Алдаа",
        description: "Та бүтээгдэхүүнээ сонгоно уу!",
      });
      router.push(PAGE_RESTAURANT + "/" + current?.id);
    }
  }, [current?.id, router, items.length]);

  return (
    <>
      <OrderDialog.Header
        onClick={() =>
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`
          )
        }
      >
        Авч явах
      </OrderDialog.Header>
      <OrderDialog.Container className="flex flex-col gap-4">
        {meLoading ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="animate-spin text-current" />
          </div>
        ) : (
          <>
            {durations.length < 1 ? (
              <ItemWrapper>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Уучлаарай</AlertTitle>
                  <AlertDescription>
                    Тухайн өдөр сул цаг байхгүй байна
                  </AlertDescription>
                </Alert>
              </ItemWrapper>
            ) : (
              <ItemWrapper title="Авах цаг" titleClassName="mb-2">
                <FormField
                  control={control}
                  name="deliveryDate"
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <>
                      <div className="grid gap-2 grid-cols-3 sm:grid-cols-4">
                        {durations.map((e, index) => (
                          <ButtonItem
                            className="min-w-max h-9 text-sm rounded-full px-3"
                            key={index}
                            onClick={() => onChange(e.value)}
                            active={e.value === deliveryDate}
                            title={e.name}
                          />
                        ))}
                      </div>
                      <FieldError error={error} />
                    </>
                  )}
                />
              </ItemWrapper>
            )}

            <ItemWrapper title="Нэмэлт мэдээлэл">
              <FormField
                control={control}
                name="comment"
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    placeholder="Нэмэлт мэдээлэл"
                    className="mt-2"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </ItemWrapper>
          </>
        )}
      </OrderDialog.Container>
      <OrderDialog.Footer
        disabled={!customer || !input}
        loading={creating}
        onClick={handleSubmit(onFinish)}
      >
        <div className="text-center w-full">Үргэлжлүүлэх</div>
      </OrderDialog.Footer>
    </>
  );
};

export default Index;
