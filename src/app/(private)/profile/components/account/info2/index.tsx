'use client';
import { Separator } from '@/components/ui';
import { Customer } from '@/lib/types';
import { useState } from 'react';
import { ItemWrapper } from '../ItemWrapper';
import { Button, Icons, Input } from '@/components/general';
import { ChangeEmail, ChangePassword, ChangePhone } from './components';

interface Props {
  customer?: Customer;
}

export const Info2: React.FC<Props> = ({ customer }) => {
  const [visiblePhone, setVisiblePhone] = useState<boolean>(false);
  const [visibleEmail, setVisibleEmail] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(customer?.phone || '');

  return (
    <>
      <Separator orientation="horizontal" className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ItemWrapper
          title="Утас"
          className="sm:mr-5 relative cursor-pointer group"
          onClick={() => setVisiblePhone(true)}
        >
          <Input
            maxLength={8}
            placeholder="Утас"
            className="h-12 pr-10 cursor-pointer"
            readOnly
            value={phone}
          />
          <Icons.pencilLine className="absolute bottom-2.5 h-7 w-5 right-4 opacity-40 group-hover:opacity-100" />
        </ItemWrapper>

        <ItemWrapper
          title="И-Мэйл"
          className="relative cursor-pointer group"
          onClick={() => setVisibleEmail(true)}
        >
          <Input
            placeholder="И-Мэйл"
            className="h-12 pr-10 cursor-pointer"
            readOnly
            value={customer?.email}
          />
          <Icons.pencilLine className="absolute bottom-2.5 h-7 w-5 right-4 opacity-40 group-hover:opacity-100" />
        </ItemWrapper>
      </div>

      <Separator orientation="horizontal" className="my-5" />

      <ItemWrapper title="Нууц үг" titleClassName="text-xl mb-2" className="w-40">
        <Button variant="outline" onClick={() => setVisiblePassword(true)}>
          Нууц үг солих
        </Button>
      </ItemWrapper>

      <ChangePhone
        visible={visiblePhone}
        onClose={(e) => {
          if (e) setPhone(e);
          setVisiblePhone(false);
        }}
      />
      <ChangeEmail visible={visibleEmail} onClose={() => setVisibleEmail(false)} />
      <ChangePassword visible={visiblePassword} onClose={() => setVisiblePassword(false)} />
    </>
  );
};
