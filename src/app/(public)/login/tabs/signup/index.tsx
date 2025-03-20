'use client';
import { z } from 'zod';
import { ChildProps } from '../../page';
import { ItemWrapper, OTP } from '../../components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/components/ui/form';
import { RegisterForm } from './components/RegisterForm';
import { useTranslation } from 'react-i18next';
import { authenticate, GET_CURRENT_CUSTOMER, GET_SESSION } from '@/actions';
import { useAction } from '@/lib/hooks';
import { PAGE_HOME, SessionType } from '@/lib/constant';
import { showToast } from '@/lib/helpers';
import { redirectWithNProgress as navigate } from '@/lib/utils';
import { Button, Input } from '@/components/general';

interface Props extends ChildProps {}

const FormSchema = z.object({
  phone: z
    .string({
      required_error: 'Утасны дугаараа оруулна уу',
    })
    .refine(
      (phone) => {
        return /^\d{8}$/.test(phone);
      },
      { message: 'Утасны дугаар буруу байна' },
    ),
});

type FormSchema = z.infer<typeof FormSchema>;

const Index: React.FC<Props> = ({ setTab, tab }) => {
  const [step, setStep] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>();
  const { t } = useTranslation();
  const [time, setTime] = useState(() => {
    const sessionTime = localStorage.getItem('sessionTime');
    return sessionTime ? Number(sessionTime) : 0;
  });

  const { action: getMe, loading: userLoading } = useAction(GET_CURRENT_CUSTOMER, {
    lazy: true,
    onSuccess(me) {
      if (me) {
        setTab('signin');
        navigate(PAGE_HOME);
        setSessionId(undefined);
        setStep(0);
      }
    },
  });

  const { action: getSession, loading } = useAction(GET_SESSION, { lazy: true });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phone: '' },
  });

  const { phone } = watch();

  const tryCode = () => {
    getSession(phone, SessionType.R, undefined, {
      onSuccess: (data) => {
        setTime(59);
        setSessionId(data);
      },
      onError: ({ message }) => showToast(message),
    });
  };

  useEffect(() => {
    setStep(0);
  }, [tab]);

  const onSubmit = ({ phone }: FormSchema) => {
    const sessionPhone = localStorage.getItem('sessionPhone');
    if (step < Steps.length - 1) {
      if (phone !== sessionPhone) {
        getSession(phone, SessionType.R, undefined, {
          onSuccess: (data) => {
            setSessionId(data);
            setStep(step + 1);
            setTime(59);
            localStorage.setItem('sessionPhone', phone);
          },
          onError: ({ message }) => showToast(message),
        });
      } else {
        setStep(step + 1);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('sessionTime', time.toString());

    let interval: ReturnType<typeof setInterval> | undefined;
    if (time > 0) interval = setInterval(() => setTime((seconds) => seconds - 1), 1000);
    else if (time === 0) {
      localStorage.removeItem('sessionPhone');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  const onSuccessVerify = () => {
    localStorage.removeItem('sessionTime');
    localStorage.removeItem('sessionPhone');
    setStep(step + 1);
  };

  const onFinish = (e: { token: string }) => {
    showToast('Амжилттай бүртгэгдлээ.');
    authenticate(e.token).then(() => {
      getMe();
    });
  };

  const Steps = [
    <>
      <FormField
        control={control}
        name="phone"
        render={({ field: { value = '', ...field }, fieldState: { error } }) => (
          <ItemWrapper title={t('Phone')} error={error} className="mb-6">
            <Input
              {...field}
              maxLength={8}
              value={value}
              className="h-12 bg-secondary-background dark:bg-background"
              placeholder="00000000"
            />
          </ItemWrapper>
        )}
      />
      <div className="opacity-70 px-2 text-center">
        {t('You will receive a 4-digit verification code')}
      </div>
      <Button
        loading={loading}
        disabled={!isValid}
        type="submit"
        className="mt-6 rounded-md bg-current-2 w-full h-12"
        onClick={handleSubmit(onSubmit)}
      >
        <span>{t('Continue')}</span>
      </Button>
    </>,
    <OTP
      phone={phone}
      tryCode={tryCode}
      time={time}
      loading={loading}
      onFinish={onSuccessVerify}
      sessionId={sessionId}
      goBack={() => setStep(step - 1)}
    />,
    <RegisterForm
      onFinish={onFinish}
      setTab={setTab}
      tab={tab}
      session={sessionId}
      phone={phone}
      loading={userLoading}
    />,
  ];

  return <div className="relative py-4 mb-3 flex flex-col h-full">{Steps[step]}</div>;
};

export default Index;
