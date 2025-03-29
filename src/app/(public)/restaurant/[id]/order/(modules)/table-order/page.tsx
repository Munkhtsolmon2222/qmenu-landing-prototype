'use client';
import { Icons, Input, AvatarType, AvatarStack, Button } from '@/components/general';
import { OrderDialog, FieldError } from '@/components/shared';
import { FormField, Alert, AlertTitle, AlertDescription, Textarea } from '@/components/ui';
import {
  SEAT_DURATION,
  PAGE_RESTAURANT,
  PAGE_ORDER,
  PAGE_TABLE_ORDER_TABLE,
  PAGE_ORDER_TYPE,
} from '@/lib/constant';
import { InputParticipant, useRestaurantStore } from '@/lib/providers';
import { OrderInput, OrderType, SectionInfoTime } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ItemWrapper, ButtonItem, ParticipantsModal } from '../../components';
import { getDates } from '../../utils';
import { TimesSkeleton } from './components';
import { omit } from 'lodash';
import { convertToHoursAndMinutes, redirectWithNProgress as navigate } from '@/lib/utils';
import { TableOrderInput, TableOrderSchema } from '@/lib/validations';
import { useAction } from '@/lib/hooks';
import { GET_CURRENT_CUSTOMER, GET_OPEN_TIMES } from '@/actions';
import { showToast } from '@/lib/helpers';

const getDefaultValues = (
  input?: OrderInput,
  inputParticipants: InputParticipant[] = [],
): Partial<TableOrderInput> => {
  if (!input) return { guests: 1, participants: [] };
  return {
    guests: input.guests ?? 1,
    duration: input.duration?.toString(),
    date: input.deliveryDate?.split(' ')?.[0],
    deliveryDate: input.deliveryDate,
    participants: inputParticipants,
    comment: input.comment,
  };
};

const Index = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { current, setInput, input, inputParticipants, setStore } = useRestaurantStore();
  const { control, watch, setValue, handleSubmit } = useForm<TableOrderInput>({
    mode: 'onSubmit',
    resolver: zodResolver(TableOrderSchema),
    defaultValues: getDefaultValues(input, inputParticipants),
  });

  const { participants, guests = 1, duration, durations = [], date, deliveryDate } = watch();

  const { data: customer, loading: meLoading } = useAction(GET_CURRENT_CUSTOMER, {
    onSuccess(me) {
      if (me) {
        setValue('participants', [...participants, { name: me.firstName ?? '', phone: me.phone }]);
      }
    },
  });

  const {
    action: getOpenTimes,
    loading,
    data: { times } = { times: [] },
  } = useAction(GET_OPEN_TIMES, {
    lazy: true,
    onSuccess(data) {
      if (!data?.times || data.times.length < 1) return;
      const time = data.times.find((e) => e.date === date) ?? data.times[0];

      const durationValue = time.durations.find((e) => e === +(duration || 0)) ?? time.durations[0];

      setValue('durations', time.durations);
      setValue('duration', durationValue ? durationValue.toString() : undefined);
    },
  });

  useEffect(() => {
    if (!input?.deliveryDate) return;

    const date = input.deliveryDate.split(' ')[0];
    getOpenTimes(date, guests, OrderType.TableOrder);
  }, []);

  const onFinish = (values: TableOrderInput) => {
    const participants = values.participants.reduce(
      (res: { id: string; phone: string; name: string }[], curr: any) => {
        if (curr.id) res.push(curr);
        return res;
      },
      [],
    );

    setStore((set) => set(() => ({ inputParticipants: participants })));

    const input: Partial<OrderInput> = {
      ...omit(values, ['date', 'time', 'durations']),
      deliveryDate: values.deliveryDate,
      duration: +(duration ?? SEAT_DURATION),
      contact: customer?.phone ?? '',
      name: customer?.firstName ?? '',
      guests: +guests,
      participants: participants.map((e) => e.id),
    };

    setInput((prev) => ({ ...prev, ...input }));
    navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER_TABLE}`);
  };

  return (
    <>
      <OrderDialog.Header
        children={t('Table order')}
        onClick={() =>
          input?.type === OrderType.TableOrder
            ? navigate(`${PAGE_RESTAURANT}/${id}`)
            : navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`)
        }
      />
      <OrderDialog.Container className="flex flex-col gap-4">
        {meLoading ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="animate-spin text-current-2" />
          </div>
        ) : (
          <>
            <ItemWrapper title={t('Number of guests')} titleClassName="mb-2">
              <FormField
                control={control}
                name="guests"
                render={({ field: { onChange, ref }, fieldState: { error } }) => {
                  const onChangeGuests = (count: number) => {
                    setValue('deliveryDate', undefined);
                    setValue('date', undefined);
                    onChange(count);
                  };

                  return (
                    <>
                      <div className="w-full flex justify-between gap-4">
                        <Button
                          variant="outline"
                          className="w-11 h-11 min-w-11 min-h-11 bg-current-2 border-border p-0 rounded-full hover:bg-current-2 hover:opacity-80"
                          onClick={() => guests > 1 && onChangeGuests(guests - 1)}
                        >
                          <Icons.minus className="text-white w-6 h-6" />
                        </Button>
                        <Input
                          ref={ref}
                          type="number"
                          value={guests}
                          className="border border-border bg-primary-foreground rounded-full w-full p-0 h-11"
                          inputClassName="text-center text-lg"
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
                          onClick={() => guests < 99 && onChangeGuests(guests + 1)}
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

            <ItemWrapper title={t('Day')} titleClassName="mb-2">
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
                              setValue('deliveryDate', undefined);
                              onChange(item.date);
                              getOpenTimes(item.date, guests, OrderType.TableOrder);
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
                    <AlertDescription>Тухайн өдөр сул цаг байхгүй байна</AlertDescription>
                  </Alert>
                </ItemWrapper>
              ) : (
                <>
                  <ItemWrapper title={t('Sitting time')} titleClassName="mb-2">
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
                              title={
                                convertToHoursAndMinutes(e)[i18n.language] ??
                                convertToHoursAndMinutes(e).mn
                              }
                              onClick={() => {
                                setValue('deliveryDate', undefined);
                                onChange(e.toString());
                              }}
                            />
                          ))}
                        </div>
                      )}
                    />
                  </ItemWrapper>

                  <ItemWrapper title={t('Start time')} titleClassName="mb-2">
                    <FormField
                      control={control}
                      name="deliveryDate"
                      render={({ field: { onChange }, fieldState: { error } }) => (
                        <>
                          <div className="grid gap-2 grid-cols-4">
                            {times.map((time: SectionInfoTime, index: number) => {
                              const timeValue = new Date(time.date);
                              const active = time.date === deliveryDate;
                              let subActive = false;
                              let disabled = false;

                              let prevItem = times[index - 1] ?? time;

                              if (duration && index > 0) {
                                const timeLastValue = new Date(times[times.length - 1].date);

                                const timeEndValue = new Date(prevItem.date);
                                timeEndValue.setMinutes(timeEndValue.getMinutes() + +duration);

                                disabled = timeEndValue > timeLastValue;
                              }

                              if (deliveryDate && duration) {
                                const startDate = new Date(deliveryDate);
                                const endDate = new Date(deliveryDate);
                                endDate.setMinutes(endDate.getMinutes() + +duration);

                                subActive = timeValue > startDate && timeValue <= endDate;
                              }

                              return (
                                <ButtonItem
                                  key={index}
                                  className="min-w-16 h-9 text-sm rounded-full"
                                  active={active}
                                  subActive={subActive}
                                  title={time.time}
                                  disabled={disabled}
                                  onClick={() => {
                                    if (disabled) {
                                      showToast(
                                        'Нийт суух хугацаа хаах цагаас хэтэрч байгаа тул сонгох боломжгүй',
                                      );
                                      return;
                                    }
                                    onChange(time.date);
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

            <ItemWrapper title={t('Guests')} titleClassName="mb-2">
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
                                    (e: { name: string; phone: string }) => e.phone !== phone,
                                  ),
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
                    }),
                  );

                  if (participants.length === 1) {
                    avatars = [
                      {
                        children: <Icons.user />,
                        className: 'bg-gray-400',
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
                        className="w-10 h-10 min-w-10 min-h-10 bg-current-2 border-border p-0 rounded-full hover:bg-current-2 hover:opacity-80"
                      >
                        <Icons.add className="text-white w-6 h-6" />
                      </Button>
                    </div>
                  );
                }}
              />
            </ItemWrapper>

            <ItemWrapper title={t('Additional information')}>
              <FormField
                control={control}
                name="comment"
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    placeholder={t('Additional information')}
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
                setValue('participants', [...participants, e]);
                setVisible(false);
              }}
              setVisible={setVisible}
              visible={visible}
            />
          </>
        )}
      </OrderDialog.Container>
      <OrderDialog.Footer buttonProps={{ onClick: handleSubmit(onFinish) }}>
        <div className="text-center w-full">{t('Continue')}</div>
      </OrderDialog.Footer>
    </>
  );
};

export default Index;
