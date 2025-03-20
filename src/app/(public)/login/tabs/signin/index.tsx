'use client';
import { ChildProps } from '../../page';
import { ItemWrapper } from '../../components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { SigninInput, SigninSchema } from '@/lib/validations';
import { Button, Icons, Input } from '@/components/general';
import { CUSTOMER, PAGE_FORGOT, PAGE_PROFILE } from '@/lib/constant';
import { useAction } from '@/lib/hooks';
import { authenticate, GET_PAYLOAD, LOGIN } from '@/actions';
import { showToast } from '@/lib/helpers';
import { redirectWithNProgress as navigate } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import nProgress from 'nprogress';
import { Loader } from '@/components/shared';

interface Props extends ChildProps {}

const Index: React.FC<Props> = ({ nextPath, goBack }) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const { data: payload } = useAction(GET_PAYLOAD);

  const { action: login, loading } = useAction(LOGIN, {
    lazy: true,
    onSuccess(data) {
      if (!data?.token) return;
      authenticate(data.token).then(() => {
        if (goBack) {
          nProgress.start();
          window.location.replace(PAGE_PROFILE);
        } else window.location.href = nextPath ?? '/';
      });
    },
    onError: ({ message }) => showToast(message),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SigninInput>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  function onSubmit(data: SigninInput) {
    if (payload?.role === CUSTOMER) navigate(nextPath ?? '/');
    else login({ phone: data.phone, password: data.password, user: false });
  }

  if (searchParams.get('reload')) return <Loader className="h-screen" />;

  return (
    <div className="flex-col overflow-y-auto mb-20 flex items-center w-full max-w-96">
      <FormField
        control={control}
        name="phone"
        render={({ field: { value = '', ...field }, fieldState: { error } }) => (
          <ItemWrapper title={t('Phone')} error={error} className="mb-6 w-full">
            <Input
              {...field}
              maxLength={8}
              value={value}
              className="h-12 text-secondary-text opacity-90 bg-secondary-background dark:bg-background w-full"
              placeholder="00000000"
            />
          </ItemWrapper>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field: { value = '', ...field }, fieldState: { error } }) => (
          <ItemWrapper error={error} title={t('Password')} titleClassName="text-sm">
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                type={hidePassword ? 'password' : 'text'}
                placeholder={t('Please enter your password')}
                className="h-12 pr-4 text-secondary-text opacity-90 bg-secondary-background dark:bg-background"
                suffix={
                  hidePassword ? (
                    <Icons.eye onClick={() => setHidePassword(!hidePassword)} className="h-7 w-5" />
                  ) : (
                    <Icons.eyeOff
                      onClick={() => setHidePassword(!hidePassword)}
                      className="h-7 w-5"
                    />
                  )
                }
              />
            </div>
            <div
              className="text-sm hover:underline ml-auto mt-2 underline mr-2"
              onClick={() => navigate(PAGE_FORGOT)}
            >
              {t('Forgot your password')}
            </div>
          </ItemWrapper>
        )}
      />
      <div className="px-2 w-full">
        <Button
          loading={loading}
          disabled={!isValid}
          type="submit"
          className="mt-10 rounded-md bg-current-2 w-full dark:text-primary h-12"
          onClick={handleSubmit(onSubmit)}
        >
          <span>{t('login')}</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
