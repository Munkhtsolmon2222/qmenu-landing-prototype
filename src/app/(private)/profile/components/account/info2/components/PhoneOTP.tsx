'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { showToast } from '@/lib/helpers';
import { TriggerAction } from '@/lib/hooks';
import { Customer, QueryError } from '@/lib/types';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  sessionId?: string;
  phone: string;
  time: number;
  tryCode: () => void;
  loading: boolean;
  onFinish: () => void;
  updatePhone: TriggerAction<
    (
      session: string,
      pin: string,
    ) => Promise<{
      data?: Customer | undefined;
      error?: QueryError;
    }>,
    Customer | undefined
  >;
}

export const PhoneOTP: React.FC<Props> = ({
  phone,
  sessionId,
  tryCode,
  time,
  loading: sessionLoad,
  onFinish,
  updatePhone,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState<string>();

  const onSubmit = (code: string) => {
    if (sessionId) {
      updatePhone(sessionId, code, {
        onSuccess: (data) => {
          if (data) onFinish();
          else {
            setCode('');
            showToast('Код буруу байна.');
          }
        },
        onError: () => showToast('Код буруу байна.'),
      });
    }
  };

  useEffect(() => {
    if ((code || '').length === 4) onSubmit(code ?? '');
  }, [code]);

  useEffect(() => {
    if (phone) ref.current?.focus();
  }, [phone]);

  return (
    <div className="opacity-70">
      <div onClick={() => ref.current?.focus()}>
        <div>Бидний саяхан илгээсэн 4 оронтой кодыг оруулна уу</div>
        <br />
        <div className="mb-4">+(976) {phone}</div>
        <InputOTP maxLength={4} onChange={setCode} value={code} ref={ref}>
          <InputOTPGroup className="w-72 mx-auto flex justify-center">
            <InputOTPSlot index={0} className="w-full h-16 text-2xl" />
            <InputOTPSlot index={1} className="w-full h-16 text-2xl" />
            <InputOTPSlot index={2} className="w-full h-16 text-2xl" />
            <InputOTPSlot index={3} className="w-full h-16 text-2xl" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex gap-1 mt-4 text-sm">
        <div>Код хүлээж авсангүй.</div>
        <div
          className={`hover:underline select-none ${sessionLoad ? 'opacity-50' : ''} ${
            time > 0 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => !sessionLoad && time < 1 && tryCode()}
        >
          Дахин авах ({time})
        </div>
        {sessionLoad && <LoaderIcon className="h-5 w-5 animate-spin" />}
      </div>
    </div>
  );
};
