'use client';
import { Button, Input } from '@/components/general';
import { OrderDialog, FieldError, Loader } from '@/components/shared';
import { FormField } from '@/components/ui';
import {
  SessionType,
  PAGE_RESTAURANT,
  PAGE_ORDER,
  PAGE_ORDER_OTP,
  PAGE_TABLE_ORDER,
  PAGE_ORDER_EVENT,
  PAGE_TAKE_AWAY,
  PAGE_ORDER_TYPE,
} from '@/lib/constant';
import { useRestaurantStore } from '@/lib/providers';
import { OrderType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ItemWrapper } from '../../../components';
import { authenticate, LOGIN, SEARCH_CUSTOMERS } from '@/actions';
import { redirectWithNProgress as navigate } from '@/lib/utils';
import { hookFormSubmit } from '@/lib/helpers';
import { LoginInput, LoginSchema } from '@/lib/validations';
import { useAction } from '@/lib/hooks';

interface Props {
  isAuthenticated: boolean;
}

export const UserDialog: React.FC<Props> = ({ isAuthenticated }) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { input, setInput } = useRestaurantStore();

  const { action: search, loading: searchLoading } = useAction(SEARCH_CUSTOMERS, {
    lazy: true,
  });

  const {
    watch,
    control,
    setValue,
    getValues,
    trigger,
    clearErrors,
    formState: { isValid },
  } = useForm<LoginInput>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: input?.contact,
      user: localStorage.getItem('sessionType') === SessionType.P,
    },
  });

  const { phone = '', user } = watch();

  const onFinish = ({ data }: Awaited<ReturnType<typeof LOGIN>> | undefined = {}) => {
    localStorage.removeItem('sessionType');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionStart');

    authenticate(data?.token ?? '').then(() => {
      if (!input) {
        navigate(`${PAGE_RESTAURANT}/${id}`);
        return;
      }

      switch (input.type) {
        case OrderType.PreOrder:
        case OrderType.TableOrder:
          navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`);
          return;
        case OrderType.Event:
          navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_EVENT}`);
          return;
        case OrderType.TakeAway:
          navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TAKE_AWAY}`);
          return;
        default:
          navigate(`${PAGE_RESTAURANT}/${id}`);
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated) navigate(`${PAGE_RESTAURANT}/${id}`);
  }, [isAuthenticated]);

  return (
    <>
      <OrderDialog.Header
        children={t('User')}
        onClick={
          [OrderType.PreOrder, OrderType.TakeAway].includes(input?.type as OrderType)
            ? () => navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`)
            : undefined
        }
      />
      <OrderDialog.Container className="flex flex-col gap-4">
        <ItemWrapper title={t('Phone number')} titleClassName="mb-2">
          <FormField
            control={control}
            name="phone"
            render={({ field: { onChange, ...field }, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  prefix={searchLoading ? <Loader /> : undefined}
                  disabled={searchLoading}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 8) {
                      clearErrors('phone');
                      search(value, {
                        onSuccess: (data) => {
                          localStorage.removeItem('sessionId');
                          setInput((e) => ({ ...e, contact: value }));

                          const item = data?.[0];

                          if (item) {
                            localStorage.setItem('sessionType', SessionType.P);
                            setValue('user', true);
                          } else {
                            localStorage.setItem('sessionType', SessionType.R);
                            navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_OTP}`);
                          }
                        },
                      });
                    }
                    onChange((value ?? '').slice(0, 8));
                  }}
                  type="number"
                  maxLength={8}
                  placeholder={t('Phone number')}
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
              <div className="text-sm text-nowrap">{t('Or')}</div>
              <div className="w-full border-t" />
            </div>

            <Button
              onClick={() => {
                trigger(['phone']).then((valid) => {
                  if (valid) {
                    navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_OTP}`);
                  }
                });
              }}
            >
              {t('Login with one-time code')}
            </Button>
          </>
        )}
      </OrderDialog.Container>
      <OrderDialog.Footer
        onSubmit={undefined}
        action={hookFormSubmit({ action: LOGIN, onFinish, trigger, getValues })}
        buttonProps={{ disabled: !isValid }}
      >
        <div className="w-full text-center">{t('Continue')}</div>
      </OrderDialog.Footer>
    </>
  );
};
