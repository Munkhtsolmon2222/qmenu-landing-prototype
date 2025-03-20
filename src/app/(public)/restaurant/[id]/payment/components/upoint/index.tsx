'use client';
import { Icons } from '@/components/general';
import { PaymentType } from '@/lib/constant';
import { UpointContext } from '@/lib/providers';
import { Customer, Payment, Order, Transaction } from '@/lib/types';
import { useState, useContext } from 'react';
import { BankImages } from '../banks';
import { UpointModal } from './components/UpointModal';
import { PaymentBlockItem } from '../PaymentBlockItem';

type Props = {
  user: Customer;
  payment?: Payment;
  order?: Order;
};

export const UpointForm: React.FC<Props> = ({ user, payment, order }) => {
  const [visible, setVisible] = useState(false);
  const { getUpointBalance, upointBalance, setUpointBalance } = useContext(UpointContext);

  const onSubmitPin = (pin_code: string) => {
    const input = {
      mobile: user.phone,
      pin_code,
      order: order?.id,
      payment: payment?.id,
      card_number: '',
      verify: true,
    };
    getUpointBalance({
      variables: { input },
      onError: (err: Error) => {
        // toast({
        //   title: 'Алдаа',
        //   variant: 'default',
        //   description: err.message,
        // }),
      },
    });
  };

  const showModal = () => {
    if (
      !order?.transactions.find(
        (item: Transaction) => item.state === 'PAID' && item.type === PaymentType.UPT,
      )
    ) {
      if (upointBalance && upointBalance.state !== 'balance') {
        setUpointBalance({ ...upointBalance, state: 'balance' });
      } else {
        setVisible(true);
      }
    } else {
      // toast({
      //   title: 'Алдаа',
      //   variant: 'default',
      //   description: 'Урамшуулал тооцогдсон байна.',
      // });
    }
  };

  const renderChoosedText = () => {
    if (upointBalance?.state === 'balance') {
      return 'Боломжит оноо';
    } else if (upointBalance?.state === 'collect') {
      return 'Цуглуулах';
    } else {
      return 'Зарцуулах';
    }
  };

  if (!payment?.id) return <></>;

  return (
    <>
      <PaymentBlockItem
        onClick={showModal}
        active={['spend', 'collect'].includes(upointBalance?.state ?? '')}
        className="relative py-2"
      >
        <div className="flex justify-start gap-1 items-center">
          <div className="rounded-lg flex place-self-center">
            <img
              className={`w-13 rounded-lg`}
              src={BankImages[PaymentType.UPT]}
              alt={`${PaymentType.UPT} Bank`}
            />
          </div>
          {upointBalance ? (
            <>
              <div className="flex flex-col">
                <span className="text-sm">U-Point</span>
                <div className="flex flex-no-wrap whitespace-nowrap items-center justify-start gap-1 text-misty text-xs">
                  {renderCardNumber(upointBalance.code)}
                  <Icons.creditCard className="w-4 h-4 text-current-2" />
                </div>
              </div>
              <div className="flex flex-col whitespace-nowrap justify-center items-end ml-auto">
                <span className="text-xs">{renderChoosedText()}</span>
                {upointBalance.state !== 'collect' && (
                  <span className="text-base ">{upointBalance.balance}</span>
                )}
              </div>
            </>
          ) : (
            <span className="text-misty text-base">U-Point</span>
          )}
        </div>
      </PaymentBlockItem>
      <UpointModal
        id={order?.id || ''}
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={onSubmitPin}
      />
    </>
  );
};

export const renderCardNumber = (e: string) => {
  let str = e ? e : '';
  let arr: string[] = str.replace(/\s/g, '').match(/.{1,4}/g) ?? [];
  if (arr.length === 4) {
    let lastItem = arr[arr.length - 1].split('');
    const sym = lastItem.map((_) => '*');
    arr = arr.map((val, i) => (i === arr.length - 1 ? sym.join('') : val));
  }
  return arr.join(' ');
};
