"use client";
import { cn } from "@/lib/utils";
import ItemWrapper from "../../components/ItemWrapper";
import Info from "../../components/table";
import { List } from "../../components/table/List";
import { Plan } from "../../components/table/Plan";
import { Icons } from "@/components/shared/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Order, OrderInput, OrderType, Table } from "@/lib/types";
import { useState } from "react";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TableInput, TableInputSchema } from "../../validation";
import OrderDialog from "@/components/modal/OrderDialog/page";
import {
  PAGE_ORDER,
  PAGE_ORDER_SUCCESS,
  PAGE_PAYMENT,
  PAGE_RESTAURANT,
  PAGE_TABLE_ORDER,
} from "@/lib/config/page";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "@/graphql/mutation/order";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
const Index: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const [isList, setIsList] = useState<boolean>(true);
  const { sections, input, setInput, getOrderItemsInput, crudItem, setStore } =
    useRestaurantStore();

  const {
    guests = 1,
    type,
    sectionId,
  } = input ?? { type: OrderType.TableOrder };

  const { watch, setValue, handleSubmit } = useForm<TableInput>({
    mode: "onSubmit",
    resolver: zodResolver(TableInputSchema),
  });

  const { tables = [] } = watch();

  const [createOrder, { loading: creating }] = useMutation<{
    createOrder: Order;
  }>(CREATE_ORDER);

  const onClickItem = (table: Table) => {
    // guests > 0 bol shiree duursen. Ustgah bol ene moriig ustgana
    if (table.guests > 0) return;
    //
    const total = tables.reduce((acc, e) => acc + e.guests, 0);
    const remained = guests - total;
    const prev = tables.find((e) => e.tableId === table.id);

    let newTables = tables ?? [];

    if (remained < 1) {
      if (!prev) {
        if (newTables.length === 1) {
          if (guests < table.min) {
            toast({
              title: "Уучлаарай",
              description: `Тухайн ширээнд ${table.min}-${table.max} хүн суух боломжтой.`,
            });
            return;
          } else {
            newTables = [
              {
                tableId: table.id,
                guests: Math.min(guests, table.remained),
              },
            ];
          }
        } else return;
      } else newTables = tables.filter((e) => e.tableId !== table.id);
    } else {
      if (prev) {
        newTables = tables.filter((e) => e.tableId !== table.id);
      } else if (total < guests) {
        if (remained < table.min) {
          toast({
            title: "Уучлаарай",
            description: `Тухайн ширээнд ${table.min}-${table.max} хүн суух боломжтой.`,
          });
          return;
        } else {
          newTables.push({
            tableId: table.id,
            guests: Math.min(guests - total, table.remained),
          });
        }
      }
    }
    setValue("tables", newTables);
  };

  const onFinish = (e: TableInput) => {
    if (e.tables && e.tables.length > 0) {
      const total = (e.tables ?? []).reduce(
        (acc: number, e: { guests: number }) => acc + e.guests,
        0
      );

      const remained = guests - total;
      if (remained > 0) {
        toast({
          title: "Уучлаарай",
          description: `${remained} зочинг ширээнд хувиарлаагүй байна. Та ширээгээ бүрэн захиална уу`,
        });
        return;
      }
    }

    if (!input) return;

    const items = getOrderItemsInput();

    const orderInput: OrderInput = {
      ...input,
      // tables,
      items,
    };

    setInput(() => orderInput);
    createOrder({
      variables: { input: orderInput, participant: id },
      onCompleted({ createOrder: order }) {
        if (
          order.type === OrderType.PreOrder &&
          order.items &&
          order.items.length > 0
        ) {
          crudItem("clear", {});
          router.push(`${PAGE_RESTAURANT}/${id}/${PAGE_PAYMENT}/${order.id}`);
        } else {
          setInput(() => ({ type: OrderType.TableOrder } as OrderInput));
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_SUCCESS}?orderId=${order.id}`
          );
        }
      },
      onError: ({ graphQLErrors }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach((err) => {
            if ("errorType" in err) {
              const { errorType: code } = err;
              if (code === "OR0009") {
                setStore((set) => set({ sections: [] }));
                setInput(() => ({
                  ...input,
                  tables: [],
                  deliveryDate: undefined,
                  sectionId: undefined,
                }));
                toast({
                  title: "Амжилтгүй",
                  description: err.message,
                });
                router.push(
                  `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`
                );
              }
            }
          });
        }
      },
    });
  };

  return (
    <>
      <OrderDialog.Header
        onClick={() =>
          router.push(
            `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`
          )
        }
      >
        {t("Choose a table")}
      </OrderDialog.Header>
      <OrderDialog.Container className="p-0">
        <Tabs value={sectionId} className="h-full -mt-6 w-full">
          <div className="border-b w-full overflow-x-auto no-scrollbar bg-background px-3">
            <TabsList
              className="w-full bg-transparent justify-center h-16 rounded-none p-0"
              style={{ minWidth: 140 * sections.length }}
            >
              {sections.map((e, index) => {
                const active = sectionId === e.id;
                return (
                  <TabsTrigger
                    key={index}
                    onClick={() => {
                      setInput((input) => ({ ...input, sectionId: e.id }));
                      setValue("tables", []);
                    }}
                    value={e.id}
                    className="relative rounded-none border-b border-b-transparent text-base sm:text-lg bg-transparent w-full font-semibold text-muted-foreground transition-none focus-visible:ring-0 !shadow-none"
                  >
                    <p
                      className={`${
                        active ? "text-current-2" : ""
                      } font-medium`}
                    >
                      {e.name}
                    </p>
                    {active && (
                      <div className="bg-current-2 rounded-t-md h-1.5 w-full absolute -bottom-[16px] sm:-bottom-[14px]" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <ItemWrapper
            className={cn(
              "flex py-3 rounded-none justify-end gap-2 px-2",
              !isList && "border-b border-border"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between gap-2 bg-primary-foreground px-3 py-1 rounded-lg cursor-pointer border-border border"
                // isList ? "border-current-2" : ""
              )}
              onClick={() => setIsList(!isList)}
            >
              <Icons.list
                className={cn(
                  "w-5 h-5",
                  isList ? "text-current-2" : "opacity-90"
                )}
              />
              {/* <div className={cn("text-sm", isList && "text-current-2")}>
              Жагсаалт
            </div> */}
            </div>
            <div
              className={cn(
                "flex items-center justify-between gap-2 bg-primary-foreground px-3 py-1 rounded-lg cursor-pointer border-border border"
                // !isList ? "border-current-2" : ""
              )}
              onClick={() => setIsList(!isList)}
            >
              <Icons.layoutPanelTop
                className={cn(
                  "w-5 h-5 fill-primary",
                  !isList ? "fill-current-2 text-current-2" : "opacity-70"
                )}
              />
              {/* <div className={cn("text-sm", !isList && "text-current-2")}>
              Ширээ
            </div> */}
            </div>
          </ItemWrapper>
          {!isList && (
            <ItemWrapper className="flex justify-between flex-nowrap p-3">
              {Object.entries(Info).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2"
                >
                  <div
                    className={cn(
                      "relative w-[24px] h-[24px] rounded-full",
                      item[1].className
                    )}
                  >
                    <div
                      className={cn(
                        "z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[14px] w-[14px] rounded-full",
                        item[1].childClassName
                      )}
                    />
                  </div>
                  <div>{item[1].name}</div>
                </div>
              ))}
            </ItemWrapper>
          )}
          {sections.map((section, index) =>
            isList ? (
              <List
                key={index}
                type={type}
                inputGuest={guests}
                section={section}
                tables={tables ?? []}
                onClickItem={onClickItem}
              />
            ) : (
              <Plan
                key={index}
                type={type}
                inputGuest={guests}
                section={section}
                tables={tables ?? []}
                onClickItem={onClickItem}
              />
            )
          )}
        </Tabs>
      </OrderDialog.Container>
      <OrderDialog.Footer onClick={handleSubmit(onFinish)} loading={creating}>
        <div className="text-center w-full">
          {type === OrderType.PreOrder ? "Үргэлжлүүлэх" : t("Order")}
        </div>
      </OrderDialog.Footer>
    </>
  );
};

export default Index;
