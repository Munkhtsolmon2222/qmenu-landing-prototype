'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Icons,
} from '@/components/general';
import { FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ItemWrapper } from '../../ItemWrapper';
import { CloseButton } from './CloseButton';
import { useEffect, useState } from 'react';
import { PhoneOTP } from './PhoneOTP';
import { showToast } from '@/lib/helpers';
import { useAction } from '@/lib/hooks';
import { GET_SESSION, UPDATE_PHONE } from '@/actions';
import { SessionType } from '@/lib/constant';

interface Props {
  visible: boolean;
  onClose: (phone?: string) => void;
}

const FormSchema = z.object({
  phone: z
    .string({ required_error: 'Утасны дугаараа оруулна уу.' })
    .min(8, {
      message: 'Утасны дугаараа оруулна уу.',
    })
    .refine(
      (phone) => {
        return /^\d{8}$/.test(phone);
      },
      { message: 'Утасны дугаар буруу байна' },
    ),
  password: z.string({ required_error: 'Нууц үгээ оруулна уу.' }).min(2, {
    message: 'Нууц үгээ оруулна уу.',
  }),
});

type FormSchema = z.infer<typeof FormSchema>;

export const ChangePhone: React.FC<Props> = ({ onClose: onCloseModal, visible }) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>();
  const [time, setTime] = useState(() => {
    const sessionTime = localStorage.getItem('sessionTime');
    return sessionTime ? Number(sessionTime) : 0;
  });

  const { action: getSession, loading } = useAction(GET_SESSION, { lazy: true });
  const { action: updatePhone, loading: verifyLoad } = useAction(UPDATE_PHONE, { lazy: true });

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm<FormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(FormSchema),
  });

  const onClose = (finish?: boolean) => {
    const { phone } = getValues();
    setValue('password', '');
    setValue('phone', '');
    onCloseModal(finish ? phone : '');
  };

  const { phone, password } = watch();

  const tryCode = () => {
    getSession(phone, SessionType.C, password, {
      onSuccess(data) {
        setTime(59);
        setSessionId(data);
      },
    });
  };

  useEffect(() => {
    setStep(0);
  }, [visible]);

  const onSubmit = (e: FormSchema) => {
    const firstSession = localStorage.getItem('sessionPhone');
    if (step < Components.length - 1) {
      if (firstSession !== e.phone) {
        getSession(e.phone, SessionType.C, e.password, {
          onSuccess(data) {
            setSessionId(data);
            setStep(step + 1);
            setTime(59);
            localStorage.setItem('sessionPhone', phone);
          },
          onError: ({ message }) => showToast(message),
        });
      } else setStep(step + 1);
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

  const onFinish = () => {
    showToast('Утасны дугаар амжилттай шинэчлэгдлээ.');
    setTime(0);
    setSessionId(undefined);
    onClose(true);
    setStep(0);
  };

  const ComponentFooters = [
    <Button
      loading={loading}
      disabled={!isValid}
      type="submit"
      className={`w-full sm:w-48 ${
        isValid ? 'bg-primary' : 'bg-primary-foreground hover:bg-primary-foreground'
      }`}
      onClick={handleSubmit(onSubmit)}
    >
      <span className={`${isValid ? 'text-white' : 'text-primary'}`}>Үргэлжлүүлэх</span>
    </Button>,
    <Button
      loading={verifyLoad}
      className="bg-primary w-full sm:w-48"
      onClick={() => setStep(step - 1)}
    >
      <span className="text-white">Буцах</span>
    </Button>,
  ];

  const Components = [
    <>
      <FormField
        control={control}
        name="phone"
        render={({ field: { value = '', ...field }, fieldState: { error } }) => (
          <ItemWrapper title="Утасны дугаар" titleClassName="text-sm" error={error}>
            <Input
              maxLength={8}
              {...field}
              value={value}
              placeholder="Шинэ утасны дугаараа оруулна уу"
              className="h-12"
            />
          </ItemWrapper>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field: { value = '', ...field }, fieldState: { error } }) => (
          <ItemWrapper error={error} title="Нууц үг" titleClassName="text-sm">
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                type={hidePassword ? 'password' : 'text'}
                placeholder="Нууц үгээ оруулна уу"
                className="pr-10 h-12"
              />
              <div
                className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                onClick={() => setHidePassword(!hidePassword)}
              >
                {hidePassword ? (
                  <Icons.eye className="h-7 w-5" />
                ) : (
                  <Icons.eyeOff className="h-7 w-5" />
                )}
              </div>
            </div>
          </ItemWrapper>
        )}
      />
      <span className="text-sm opacity-70">Та 4 оронтой баталгаажуулах код хүлээн авах болно.</span>
    </>,
    <PhoneOTP
      phone={phone}
      sessionId={sessionId}
      tryCode={tryCode}
      time={time}
      loading={loading}
      onFinish={onFinish}
      updatePhone={updatePhone}
    />,
  ];

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="h-full sm:h-max rounded-none px-0 sm:px-4">
        <CloseButton onClick={onClose} />
        <DialogHeader className="px-4 sm:px-0">
          <DialogTitle className="text-start">Утасны дугаар солих</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <div className="flex flex-col gap-5 p-4">{Components[step]}</div>
        </div>
        <DialogFooter className="px-3 flex">{ComponentFooters[step]}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
