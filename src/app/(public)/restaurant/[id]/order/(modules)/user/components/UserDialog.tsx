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
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ItemWrapper } from '../../../components';
import { authenticate, LOGIN, SEARCH_CUSTOMERS } from '@/actions';
import { redirectWithNProgress as navigate } from '@/lib/utils';
import { LoginInput, LoginSchema } from '@/lib/validations';
import { useAction } from '@/lib/hooks';
import nProgress from 'nprogress';

interface Props {
  isAuthenticated: boolean;
}

export const UserDialog: React.FC<Props> = ({}) => {
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
    trigger,
    clearErrors,
    handleSubmit,
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

  const { action: login, loading: logging } = useAction(LOGIN, {
    lazy: true,
  });

  const onSubmit = async (e: LoginInput) => {
    login(e, {
      onSuccess: (data) => data && onFinish(data),
    });
  };

  const onFinish = (data: { token: string }) => {
    localStorage.removeItem('sessionType');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionStart');

    authenticate(data?.token ?? '').then(() => {
      let path = '';

      if (!input) path = `${PAGE_RESTAURANT}/${id}`;
      else {
        switch (input.type) {
          case OrderType.PreOrder:
          case OrderType.TableOrder:
            path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`;
            break;
          case OrderType.Event:
            path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_EVENT}`;
            break;
          case OrderType.TakeAway:
            path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TAKE_AWAY}`;
            break;
          default:
            path = `${PAGE_RESTAURANT}/${id}`;
            break;
        }
      }

      nProgress.start();
      window.location.replace(path);
    });
  };

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
        buttonProps={{
          disabled: !isValid || logging,
          loading: logging,
          onClick: handleSubmit(onSubmit),
        }}
      >
        <div className="w-full text-center">{t('Continue')}</div>
      </OrderDialog.Footer>
    </>
  );
};
