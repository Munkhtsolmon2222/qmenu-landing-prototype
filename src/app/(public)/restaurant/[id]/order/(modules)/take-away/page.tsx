'use client';
import { OrderDialog, FieldError } from '@/components/shared';
import { Alert, AlertTitle, AlertDescription, FormField, Textarea } from '@/components/ui';
import { PAGE_RESTAURANT, PAGE_PAYMENT, PAGE_ORDER, PAGE_ORDER_TYPE } from '@/lib/constant';
import { useRestaurantStore } from '@/lib/providers';
import { OrderInput } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ItemWrapper, ButtonItem } from '../../components';
import { generateTimeArray, getDateByTime } from '../../utils';
import { redirectWithNProgress as navigate } from '@/lib/utils';
import { TakeAwayInput, TakeAwaySchema } from '@/lib/validations';
import { useAction } from '@/lib/hooks';
import { showToast } from '@/lib/helpers';
import { CREATE_ORDER, GET_CURRENT_CUSTOMER } from '@/actions';

const ASAP = { name: 'Яаралтай', value: 'ASAP' };

const Index: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { current, items, input, getOrderItemsInput, setInput } = useRestaurantStore();

  const { watch, control, handleSubmit } = useForm<TakeAwayInput>({
    mode: 'onSubmit',
    resolver: zodResolver(TakeAwaySchema),
    defaultValues: {
      deliveryDate: input?.deliveryDate,
      comment: input?.comment,
    },
  });

  const { data: customer, loading: meLoading } = useAction(GET_CURRENT_CUSTOMER);

  const { deliveryDate } = watch();
  const [durations, setDurations] = useState<{ value: string; name: string }[]>([]);

  const { action: createOrder, loading: creating } = useAction(CREATE_ORDER, { lazy: true });

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
  }, []);

  const onFinish = async (e: TakeAwayInput) => {
    if (!input) return;

    const items = getOrderItemsInput();

    const orderInput: OrderInput = {
      ...input,
      ...e,
      items,
      name: customer?.firstName ?? '',
      contact: customer?.phone ?? '',
    };

    setInput(() => orderInput);

    const order = await createOrder(orderInput, id, {
      onError(error) {
        showToast(error.message);
      },
    });

    if (!order) return;
    navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_PAYMENT}/${order.id}`);
  };

  useEffect(() => {
    if (items.length < 1) {
      showToast('Та бүтээгдэхүүнээ сонгоно уу!');
      navigate(PAGE_RESTAURANT + '/' + current?.id);
    }
  }, [items]);

  return (
    <>
      <OrderDialog.Header
        children="Авч явах"
        onClick={() => navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`)}
      />
      <OrderDialog.Container className="flex flex-col gap-4">
        {meLoading ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="animate-spin text-current-2" />
          </div>
        ) : (
          <>
            {durations.length < 1 ? (
              <ItemWrapper>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Уучлаарай</AlertTitle>
                  <AlertDescription>Тухайн өдөр сул цаг байхгүй байна</AlertDescription>
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
        buttonProps={{
          disabled: !customer || !input,
          onClick: handleSubmit(onFinish),
          loading: creating,
        }}
      >
        <div className="text-center w-full">Үргэлжлүүлэх</div>
      </OrderDialog.Footer>
    </>
  );
};

export default Index;
