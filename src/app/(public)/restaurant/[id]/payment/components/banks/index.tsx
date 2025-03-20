'use client';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Participant } from '@/lib/types';
import { useMemo } from 'react';
import cash from '@/assets/images/banks/cash.png';
import card from '@/assets/images/banks/card.png';
import qpay from '@/assets/images/banks/qpay.png';
import monpay from '@/assets/images/banks/monpay.png';
import socialPay from '@/assets/images/banks/socialpay.png';
import toki from '@/assets/images/banks/toki.png';
import upoint from '@/assets/images/banks/upoint.png';
import unp from '@/assets/images/banks/union.png';
import voucher from '@/assets/images/banks/voucher.svg';
import mbank from '@/assets/images/banks/mbank.png';
import { Icons } from '@/components/general';
import { SystemType, PaymentType, PartnerObjType } from '@/lib/constant';
import { PaymentSchemaType } from '@/lib/validations';
import { PaymentBlockItem } from '../PaymentBlockItem';

type Props = {
  watch: UseFormWatch<PaymentSchemaType>;
  setValue: UseFormSetValue<PaymentSchemaType>;
  participant?: Participant;
  partner?: SystemType | undefined;
};

export const BankImages: Record<string, string> = {
  [PaymentType.Cash]: cash.src,
  [PaymentType.Kart]: card.src,
  [PaymentType.QPay]: qpay.src,
  [PaymentType.MonPay]: monpay.src,
  [PaymentType.SocialPay]: socialPay.src,
  [PaymentType.Toki]: toki.src,
  [PaymentType.UPT]: upoint.src,
  [PaymentType.Upoint]: upoint.src,
  [PaymentType.MNQ]: monpay.src,
  [PaymentType.UNP]: unp.src,
  [PaymentType.VCR]: voucher.src,
  [PaymentType.MBK]: mbank.src,
};

const filterBanks = ['QPay', 'QPay2', 'UPT', 'Upoint', 'VCR'];

export const BanksForm: React.FC<Props> = ({ watch, setValue, participant, partner }) => {
  const { paymentType } = watch();

  const banks = useMemo(() => {
    if (participant) {
      return participant.payments.filter((payment) =>
        partner
          ? PartnerObjType[partner]?.payment === payment.type
          : !filterBanks.includes(payment.type),
      );
    }
    return [];
  }, [participant, partner]);

  if (banks.length < 1) return <></>;
  return (
    <PaymentBlockItem>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {banks.map((bank, index) => {
          const active = paymentType === bank.type;
          return (
            <div
              key={index}
              onClick={() => {
                setValue('payment', bank.id);
                setValue('paymentType', bank.type);
              }}
              className="cursor-pointer rounded-lg flex place-self-center relative"
            >
              {active && (
                <div className="absolute mt-1.5 ml-1.5 w-4 h-4 border-2 rounded-full flex items-center justify-center border-current-2 bg-current-2">
                  <Icons.check className="w-4 h-4 text-white" />
                </div>
              )}
              <img
                className={`w-16 rounded-lg cursor-pointer ${
                  paymentType === bank.type ? 'border-4 border-current-2' : ''
                }`}
                src={BankImages[bank.type]}
                alt={`${bank.type} Bank`}
              />
            </div>
          );
        })}
      </div>
    </PaymentBlockItem>
  );
};
