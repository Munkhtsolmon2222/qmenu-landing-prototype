"use client";
import {
  PAGE_ORDER,
  PAGE_ORDER_TYPE,
  PAGE_RESTAURANT,
  PAGE_TABLE_ORDER_TABLE,
} from "@/lib/config/page";
import OrderDialog from "@/components/modal/OrderDialog/page";
import ItemWrapper from "../../components/ItemWrapper";
import { ButtonItem } from "../../components";
import { FieldError } from "@/app/(public)/restaurant/components/FieldError";
import { ParticipantsModal } from "../../components/ParticipantsModal";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderIcon } from "lucide-react";
import TimesSkeleton from "./components/TimesSkeleton";
import { AvatarType, AvatarStack } from "@/components/ui/avatar-stack";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { convertToHoursAndMinutes, getDates } from "../../utils";
import { GET_OPEN_TIMES, GET_SECTION_INFO } from "@/graphql/query";
import {
  Customer,
  OrderInput,
  OrderType,
  SectionInfo,
  SectionInfoTime,
} from "@/lib/types";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  InputParticipant,
  useRestaurantStore,
} from "@/lib/providers/restaurant";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { SEAT_DURATION } from "@/lib/config/constant";
import { TableOrderInput, TableOrderSchema } from "../../validation";
import { omit } from "lodash";
import { useParams } from "next/navigation";
const getDefaultValues = (
  input?: OrderInput,
  inputParticipants: InputParticipant[] = []
): Partial<TableOrderInput> => {
  if (!input) return { guests: 1, participants: [] };
  return {
    guests: input.guests ?? 1,
    duration: input.duration?.toString(),
    date: input.deliveryDate?.split(" ")?.[0],
    deliveryDate: input.deliveryDate,
    participants: inputParticipants,
    comment: input.comment,
  };
};
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
const TableOrder = () => {
  const { id } = useParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { current, setInput, input, inputParticipants, setStore } =
    useRestaurantStore();
  const { t } = useTranslation();
  const { control, watch, setValue, handleSubmit } = useForm<TableOrderInput>({
    mode: "onSubmit",
    resolver: zodResolver(TableOrderSchema),
    defaultValues: getDefaultValues(input, inputParticipants),
  });

  const { participants, guests = 1, duration, date, deliveryDate } = watch();
  const { data: { me: customer } = { me: null }, loading: meLoading } =
    useQuery<{
      me: Customer;
    }>(GET_CURRENT_CUSTOMER, {
      fetchPolicy: "cache-first",
      onCompleted({ me }) {
        setValue("participants", [
          ...participants,
          { name: me.firstName ?? "", phone: me.phone },
        ]);
      },
    });

  const [
    getOpenTimes,
    {
      loading,
      data: { getOpenTimes: { times, durations, seatDuration } } = {
        getOpenTimes: {
          times: [],
          durations: [],
          seatDuration: SEAT_DURATION,
        },
      },
    },
  ] = useLazyQuery<{
    getOpenTimes: SectionInfoTime;
  }>(GET_OPEN_TIMES, {
    onCompleted(data) {
      if (data.getOpenTimes?.times.length > 0 && !duration)
        setValue("duration", data.getOpenTimes.durations[0].toString());
    },
  });

  const [
    getSectionInfo,
    {
      loading: loadSection,
      data: { getSectionInfo: sections } = { getSectionInfo: [] },
    },
  ] = useLazyQuery<{
    getSectionInfo: SectionInfo[];
  }>(GET_SECTION_INFO, {
    fetchPolicy: "network-only",
    onCompleted: ({ getSectionInfo }) => {
      if (getSectionInfo.length > 0) {
        setStore((set) => set(() => ({ sections: getSectionInfo })));

        const section = getSectionInfo.find((e) => e.available >= guests);

        if (section) {
          setValue("sectionId", section.id);
        } else {
          toast({
            title: "Уучлаарай",
            description: `Тухайн цагт ${guests} суудал байхгүй байна`,
          });
        }
      }
    },
  });

  useEffect(() => {
    if (date) return;
    const dates = getDates(current?.branch?.timetable) ?? [];
    if (current?.branch?.timetable) setValue("date", dates[0].date);
  }, [current, date, setValue]);

  useEffect(() => {
    if (date)
      getOpenTimes({
        variables: {
          input: { deliveryDate: date, type: OrderType.TableOrder },
        },
      });
  }, [date, getOpenTimes]);

  useEffect(() => {
    if (guests && duration && date && deliveryDate) {
      getSectionInfo({
        variables: {
          input: {
            type: OrderType.TableOrder,
            deliveryDate,
            duration: +duration,
            guests: +guests,
          },
        },
      });
    }
  }, [guests, duration, date, deliveryDate, getSectionInfo]);

  const onFinish = (values: TableOrderInput) => {
    const participants = values.participants.reduce((res, curr) => {
      if (curr.id) res.push(curr);
      return res;
    }, []);

    setStore((set) => set(() => ({ inputParticipants: participants })));

    const input: Partial<OrderInput> = {
      ...omit(values, ["date", "time"]),
      deliveryDate: values.deliveryDate,
      duration: +(duration ?? SEAT_DURATION),
      contact: customer?.phone ?? "",
      name: customer?.firstName ?? "",
      guests: +guests,
      participants: participants.map((e) => e.id),
    };

    setInput((prev) => ({ ...prev, ...input }));
    router.push(
      `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER_TABLE}`
    );
  };

  return (
    <>
      <OrderDialog.Header
        onClick={() =>
          input?.type === OrderType.TableOrder
            ? router.push(`${PAGE_RESTAURANT}/${id}`)
            : router.push(
                `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`
              )
        }
      >
        {t("Table order")}
      </OrderDialog.Header>
      <OrderDialog.Container className="flex flex-col gap-4">
        {meLoading ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="animate-spin text-current" />
          </div>
        ) : (
          <>
            <ItemWrapper title={t("Number of guests")} titleClassName="mb-2">
              <FormField
                control={control}
                name="guests"
                render={({
                  field: { onChange, ref },
                  fieldState: { error },
                }) => {
                  const onChangeGuests = (count: number) => {
                    setValue("sectionId", undefined);
                    setValue("deliveryDate", undefined);
                    onChange(count);
                  };

                  return (
                    <>
                      <div className="w-full flex justify-between gap-4">
                        <Button
                          variant="outline"
                          className="w-11 h-11 min-w-11 min-h-11 bg-current-2 border-border p-0 rounded-full hover:bg-current-2 hover:opacity-80"
                          onClick={() =>
                            guests > 1 && onChangeGuests(guests - 1)
                          }
                        >
                          <Icons.minus className="text-white w-6 h-6" />
                        </Button>
                        <Input
                          ref={ref}
                          type="number"
                          value={guests}
                          className="border border-border bg-primary-foreground rounded-full w-full text-center p-0 h-11 text-lg"
                          min="1"
                          max="99"
                          onChange={(e) => {
                            if (+e.target.value >= 0 && +e.target.value < 99)
                              onChangeGuests(+e.target.value);
                          }}
                        />
                        <Button
                          variant="outline"
                          className="w-11 h-11 min-w-11 min-h-11 bg-current-2 border-border p-0 rounded-full hover:bg-current-2 hover:opacity-80"
                          onClick={() =>
                            guests < 99 && onChangeGuests(guests + 1)
                          }
                        >
                          <Icons.add className="text-white w-6 h-6" />
                        </Button>
                      </div>
                      <FieldError error={error} className="mt-2" />
                    </>
                  );
                }}
              />
            </ItemWrapper>

            <ItemWrapper title={t("Day")} titleClassName="mb-2">
              <FormField
                control={control}
                name="date"
                render={({ field: { onChange }, fieldState: { error } }) => {
                  const dates = getDates(current?.branch?.timetable) ?? [];
                  return (
                    <>
                      <div className="flex gap-2 overflow-x-scroll no-scrollbar">
                        {dates.map((item, index) => (
                          <ButtonItem
                            className="min-w-24 text-sm rounded-full "
                            active={item.date === date}
                            key={index}
                            desc={item.title}
                            title={item.day}
                            onClick={() => {
                              setValue("sectionId", undefined);
                              setValue("deliveryDate", undefined);
                              onChange(item.date);
                            }}
                          />
                        ))}
                      </div>
                      <FieldError error={error} />
                    </>
                  );
                }}
              />
            </ItemWrapper>

            {date &&
              (loading ? (
                <ItemWrapper>
                  <TimesSkeleton />
                </ItemWrapper>
              ) : times.length < 1 || times.length < 1 ? (
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
                <>
                  <ItemWrapper title={t("Sitting time")} titleClassName="mb-2">
                    <FormField
                      control={control}
                      name="duration"
                      render={({ field: { onChange } }) => (
                        <div className="flex gap-2 overflow-x-scroll no-scrollbar">
                          {durations.map((e, index) => (
                            <ButtonItem
                              key={index}
                              className="min-w-max h-9 text-sm rounded-full px-3"
                              active={e.toString() === duration}
                              title={convertToHoursAndMinutes(e).mn}
                              onClick={() => {
                                setValue("sectionId", undefined);
                                onChange(e.toString());
                              }}
                            />
                          ))}
                        </div>
                      )}
                    />
                  </ItemWrapper>

                  <ItemWrapper title={t("Start time")} titleClassName="mb-2">
                    <FormField
                      control={control}
                      name="deliveryDate"
                      render={({
                        field: { onChange },
                        fieldState: { error },
                      }) => (
                        <>
                          <div className="grid gap-2 grid-cols-4">
                            {times.map((e, index) => {
                              const eDate = +new Date(e.date);
                              const eDate2 = deliveryDate
                                ? +new Date(deliveryDate)
                                : 0;

                              let active = eDate === eDate2;
                              let subActive = false;

                              if (deliveryDate && duration) {
                                const count = Math.round(
                                  +duration / seatDuration
                                );
                                const activeIndex = times.findIndex(
                                  (e) => +new Date(e.date) === eDate2
                                );
                                active =
                                  eDate === eDate2 ||
                                  (index > activeIndex &&
                                    index <= activeIndex + count);

                                subActive = active && eDate !== eDate2;
                              }

                              return (
                                <ButtonItem
                                  key={index}
                                  className="min-w-16 h-9 text-sm rounded-full"
                                  active={active}
                                  subActive={subActive}
                                  title={e.time}
                                  onClick={() => {
                                    setValue("sectionId", undefined);
                                    onChange(e.date);
                                  }}
                                />
                              );
                            })}
                          </div>
                          <FieldError error={error} />
                        </>
                      )}
                    />
                  </ItemWrapper>
                </>
              ))}

            {!loadSection &&
              guests &&
              date &&
              deliveryDate &&
              duration &&
              sections.length < 1 && (
                <ItemWrapper>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Уучлаарай</AlertTitle>
                    <AlertDescription>
                      Тухайн цагт сул заал байхгүй байна
                    </AlertDescription>
                  </Alert>
                </ItemWrapper>
              )}

            <ItemWrapper title={t("Guests")} titleClassName="mb-2">
              <FormField
                control={control}
                name="participants"
                render={({ field: { onChange } }) => {
                  if (!participants || participants.length < 1) return <></>;
                  let avatars: AvatarType[] = participants.map(
                    ({ name, phone }: { name: string; phone: string }) => ({
                      name,
                      tooltipChildren:
                        phone !== customer?.phone ? (
                          <div className="flex items-center gap-1.5">
                            <p>{name}</p>
                            <div
                              onClick={() =>
                                onChange(
                                  (participants ?? []).filter(
                                    (e: { name: string; phone: string }) =>
                                      e.phone !== phone
                                  )
                                )
                              }
                              className="border border-red-300 p-0.5 rounded-full hover:bg-primary-foreground"
                            >
                              <Icons.x className="text-red-300 h-3 w-3" />
                            </div>
                          </div>
                        ) : (
                          <p>{name}</p>
                        ),
                    })
                  );

                  if (participants.length === 1) {
                    avatars = [
                      {
                        children: <Icons.user />,
                        className: "bg-gray-400",
                      },
                      ...avatars,
                    ] as AvatarType[];
                  }

                  return (
                    <div className="rounded-full flex justify-between items-center bg-primary-foreground p-2">
                      <div className="flex items-center gap-2">
                        <AvatarStack
                          id="1"
                          size="lg"
                          variant="stack"
                          color="primary"
                          avatars={avatars}
                        />
                        <div className="text-primary opacity-70 truncate max-w-44">
                          {participants[participants.length - 1].name}
                        </div>
                      </div>
                      <Button
                        onClick={() => setVisible(true)}
                        variant="outline"
                        className=" min-w-10 min-h-10 bg-current-2 border-border p-0 rounded-full hover:bg-current-2 hover:opacity-80"
                      >
                        <Icons.add className="text-white w-6 h-6" />
                      </Button>
                    </div>
                  );
                }}
              />
            </ItemWrapper>

            <ItemWrapper title={t("Additional information")}>
              <FormField
                control={control}
                name="comment"
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    placeholder={t("Additional information")}
                    className="mt-2"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </ItemWrapper>
            <ParticipantsModal
              participants={participants}
              onFinish={(e) => {
                setValue("participants", [...participants, e]);
                setVisible(false);
              }}
              setVisible={setVisible}
              visible={visible}
            />
          </>
        )}
      </OrderDialog.Container>
      <OrderDialog.Footer
        loading={loadSection}
        onClick={handleSubmit(onFinish)}
      >
        <div className="text-center w-full">{t("Continue")}</div>
      </OrderDialog.Footer>
    </>
  );
};

export default TableOrder;
