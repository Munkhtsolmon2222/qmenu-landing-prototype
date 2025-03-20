'use client';
import { Input } from '@/components/general';
import { OrderDialog, FieldError } from '@/components/shared';
import { FormField, InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui';
import {
  SessionType,
  PAGE_RESTAURANT,
  PAGE_ORDER,
  PAGE_ORDER_USER,
  PAGE_TAKE_AWAY,
  PAGE_TABLE_ORDER,
} from '@/lib/constant';
import { useRestaurantStore } from '@/lib/providers';
import { Gender, OrderType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ItemWrapper } from '../../../components';
import { sessionTime } from '../../../utils';
import { authenticate, GET_SESSION, REGISTER, SESSION_VERIFY } from '@/actions';
import { redirectWithNProgress as navigate } from '@/lib/utils';
import { OrderOtpInput, OrderOtpSchema } from '@/lib/validations';
import { useAction } from '@/lib/hooks';
import { showToast } from '@/lib/helpers';
import nProgress from 'nprogress';

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface Props {
  isAuthenticated: boolean;
}

export const OtpDialog: React.FC<Props> = ({ isAuthenticated }) => {
  const { id } = useParams<{ id: string }>();
  const [time, setTime] = useState(sessionTime());
  const { input } = useRestaurantStore();
  const hasCalledRef = useRef(false);

  const { watch, control, setValue, handleSubmit, trigger, clearErrors } = useForm<OrderOtpInput>({
    mode: 'onSubmit',
    resolver: zodResolver(OrderOtpSchema),
    defaultValues: {
      type: (localStorage.getItem('sessionType') as SessionType) ?? undefined,
      phone: input?.contact ?? '',
      sessionId: localStorage.getItem('sessionId') ?? '',
    },
  });

  const { type, phone, name, pin, sessionId } = watch();

  const { action: signUp, loading: registering } = useAction(REGISTER, {
    lazy: true,
    onSuccess(data) {
      if (!data?.token) return;
      onFinish(data.token);
    },
  });

  const { action: getSession, loading: sessionLoad } = useAction(GET_SESSION, { lazy: true });

  const onVerify = (token?: string) => {
    if (token && type === SessionType.P) {
      trigger(['pin']).then((valid) => {
        if (!valid) return;
        onFinish(token);
      });
    } else {
      trigger(['name', 'pin']).then((valid) => {
        if (!valid) return;

        signUp({
          email: '',
          gender: capitalizeFirstLetter(Gender.Male) as Gender,
          name: name ?? '',
          password: pin ?? '',
          phone: phone ?? '',
          session: sessionId ?? '',
          year: 0,
          month: 0,
          day: 0,
        });
      });
    }
  };

  const { action: sessionVerify, loading: verifying } = useAction(SESSION_VERIFY, {
    lazy: true,
    onSuccess(data) {
      if (data?.verified) onVerify(data.token);
      else showToast('Буруу байна');
    },
    onError: ({ message, code }) => {
      setValue('pin', '');
      if (code === 'SS0001') message = 'Та шинэ код авна уу.';
      showToast(message);
    },
  });

  const getCode = () => {
    if (time > 0 || sessionLoad || sessionId) {
      setTime(sessionTime());
      return;
    }

    if (isAuthenticated) {
      navigate(`${PAGE_RESTAURANT}/${id}`);
      return;
    }

    if (!type) {
      navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`);
      return;
    }

    trigger(['phone']).then((valid) => {
      if (valid) {
        if (time > 0 || sessionLoad || sessionId) {
          setTime(sessionTime());
          return;
        }

        getSession(phone ?? '', type, undefined, {
          onSuccess: (data) => {
            if (!data) return;

            localStorage.setItem('sessionStart', new Date().getTime().toString());
            localStorage.setItem('sessionId', data);
            setTime(59);
            setValue('sessionId', data);
            setValue('pin', '');
          },
        });
      } else {
        showToast('Утасны дугаараа зөв оруулна уу.');
        navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`);
      }
    });
  };

  useEffect(() => {
    if (!hasCalledRef.current) {
      getCode();
      hasCalledRef.current = true;
    }
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (time > 0) interval = setInterval(() => setTime((seconds) => seconds - 1), 1000);
    else if (time === 0) {
      localStorage.removeItem('sessionStart');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (!pin || pin.length < 4) return;

    let triggerValues: (keyof OrderOtpInput)[] = ['sessionId', 'pin'];

    if (type === SessionType.R) triggerValues = triggerValues.concat(['name']);

    trigger(triggerValues).then((v) => {
      if (v && sessionId && pin) sessionVerify(sessionId, pin);
    });
  }, [pin, sessionId, type]);

  const onSubmit = (e: OrderOtpInput) => {
    if (e.sessionId && e.pin) sessionVerify(e.sessionId, e.pin);
  };

  const onFinish = (token: string) => {
    localStorage.removeItem('sessionType');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionStart');

    authenticate(token).then(() => {
      let path = `${PAGE_RESTAURANT}/${id}`;

      if (input) {
        if (input.type === OrderType.TakeAway)
          path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TAKE_AWAY}`;
        else path = `${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_TABLE_ORDER}`;
      }

      nProgress.start();
      window.location.replace(path);
    });
  };

  return (
    <>
      <OrderDialog.Header
        children="Нэг удаагийн нэвтрэх код"
        onClick={() => navigate(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_USER}`)}
      />
      <OrderDialog.Container className="flex flex-col gap-4">
        {type === SessionType.R && (
          <ItemWrapper title="Нэр" titleClassName="mb-2">
            <FormField
              control={control}
              name="name"
              render={({ field: { onChange, ...field }, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    placeholder="Нэр"
                    onChange={(e) => {
                      onChange(e.target.value);
                      if (e.target.value.length > 3) clearErrors('name');
                    }}
                  />
                  <FieldError error={error} />
                </>
              )}
            />
          </ItemWrapper>
        )}
        <ItemWrapper title="Код" titleClassName="mb-2">
          <FormField
            control={control}
            name="pin"
            render={({ field, fieldState: { error } }) => (
              <>
                <InputOTP {...field} maxLength={4} className="px-4">
                  <InputOTPGroup className="w-full p-0 mx-auto flex justify-center">
                    <InputOTPSlot index={0} className="w-24 h-16 text-2xl" />
                    <InputOTPSlot index={1} className="w-24 h-16 text-2xl" />
                    <InputOTPSlot index={2} className="w-24 h-16 text-2xl" />
                    <InputOTPSlot index={3} className="w-24 h-16 text-2xl" />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError error={error} />
                <div className={`flex gap-1 text-sm ${!error ? 'mt-4' : ''}`}>
                  <div>Код хүлээж авсангүй.</div>
                  <div
                    className={`hover:underline select-none ${sessionLoad ? 'opacity-50' : ''} ${
                      time > 0 ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={() => !sessionLoad && time < 1 && type && getCode()}
                  >
                    Дахин авах {time > 0 && `(${time})`}
                  </div>
                  {sessionLoad && <LoaderIcon className="h-5 w-5 animate-spin" />}
                </div>
              </>
            )}
          />
        </ItemWrapper>
      </OrderDialog.Container>
      <OrderDialog.Footer
        buttonProps={{ loading: registering || verifying, onClick: handleSubmit(onSubmit) }}
      >
        <div className="w-full text-center">Үргэлжлүүлэх</div>
      </OrderDialog.Footer>
    </>
  );
};
