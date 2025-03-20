'use client';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Payment } from '@/lib/types';
import mbank from '@/assets/images/banks/mbank.png';
import khaan from '@/assets/images/banks/khanbank.png';
import khasBank from '@/assets/images/banks/xacbank.png';
import monpay from '@/assets/images/banks/monpay.png';
import socialPay from '@/assets/images/banks/socialpay.png';
import bogdBank from '@/assets/images/banks/bogdbank.png';
import capitronBank from '@/assets/images/banks/capitronbank.png';
import ckBank from '@/assets/images/banks/ckbank.png';
import taniBank from '@/assets/images/banks/nibank.png';
import stateBank from '@/assets/images/banks/statebank.png';
import tbd from '@/assets/images/banks/tdbbank.png';
import ardapp from '@/assets/images/banks/ardapp.png';
import most from '@/assets/images/banks/most.png';
import arig from '@/assets/images/banks/arig.png';
import transabnk from '@/assets/images/banks/transbank.png';
import { PaymentType, QPAY_BANK_TYPE } from '@/lib/constant';
import { Icons } from '@/components/general';
import { PaymentSchemaType } from '@/lib/validations';
import { PaymentBlockItem } from '../PaymentBlockItem';

type Props = {
  watch: UseFormWatch<PaymentSchemaType>;
  setValue: UseFormSetValue<PaymentSchemaType>;
  payment?: Payment;
};

export const ConvertQpayBankImg = {
  [QPAY_BANK_TYPE.MBANK]: mbank.src,
  [QPAY_BANK_TYPE.KHAAN_BANK]: khaan.src,
  [QPAY_BANK_TYPE.KHAS_BANK]: khasBank.src,
  [QPAY_BANK_TYPE.BOGD_BANK]: bogdBank.src,
  [QPAY_BANK_TYPE.CAPITRON_BANK]: capitronBank.src,
  [QPAY_BANK_TYPE.CHINGIG_KHAAN_BANK]: ckBank.src,
  [QPAY_BANK_TYPE.MOST_MONEY]: most.src,
  [QPAY_BANK_TYPE.NATIONAL_INVESTMENT_BANK]: taniBank.src,
  [QPAY_BANK_TYPE.STATE_BANK]: stateBank.src,
  [QPAY_BANK_TYPE.TRADE_AND_DEVELOPMENT_BANK]: tbd.src,
  [QPAY_BANK_TYPE.ARD_APP]: ardapp.src,
  [QPAY_BANK_TYPE.SOCIAL_PAY]: socialPay.src,
  [QPAY_BANK_TYPE.MONPAY]: monpay.src,
  [QPAY_BANK_TYPE.ARIG_BANK]: arig.src,
  [QPAY_BANK_TYPE.TRANS_BANK]: transabnk.src,
};

export const qpy2Banks = [
  {
    type: QPAY_BANK_TYPE.MBANK,
  },
  {
    type: QPAY_BANK_TYPE.KHAAN_BANK,
  },
  {
    type: QPAY_BANK_TYPE.BOGD_BANK,
  },
  {
    type: QPAY_BANK_TYPE.CAPITRON_BANK,
  },
  {
    type: QPAY_BANK_TYPE.CHINGIG_KHAAN_BANK,
  },
  {
    type: QPAY_BANK_TYPE.MOST_MONEY,
  },
  {
    type: QPAY_BANK_TYPE.SOCIAL_PAY,
  },
  {
    type: QPAY_BANK_TYPE.MONPAY,
  },
  {
    type: QPAY_BANK_TYPE.STATE_BANK,
  },
  {
    type: QPAY_BANK_TYPE.TRADE_AND_DEVELOPMENT_BANK,
  },
  {
    type: QPAY_BANK_TYPE.KHAS_BANK,
  },
  {
    type: QPAY_BANK_TYPE.ARD_APP,
  },
  {
    type: QPAY_BANK_TYPE.ARIG_BANK,
  },
  {
    type: QPAY_BANK_TYPE.TRANS_BANK,
  },
];

export const qpyBanks = [
  {
    type: QPAY_BANK_TYPE.KHAAN_BANK,
  },
  {
    type: QPAY_BANK_TYPE.BOGD_BANK,
  },
  {
    type: QPAY_BANK_TYPE.CAPITRON_BANK,
  },
  {
    type: QPAY_BANK_TYPE.CHINGIG_KHAAN_BANK,
  },
  {
    type: QPAY_BANK_TYPE.MOST_MONEY,
  },

  {
    type: QPAY_BANK_TYPE.STATE_BANK,
  },
  {
    type: QPAY_BANK_TYPE.TRADE_AND_DEVELOPMENT_BANK,
  },
  {
    type: QPAY_BANK_TYPE.KHAS_BANK,
  },
];

export const QpayForm: React.FC<Props> = ({ watch, setValue, payment }) => {
  const { paymentType } = watch();

  if (!payment) return <></>;
  return (
    <PaymentBlockItem>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {(payment.type === PaymentType.QPay ? qpyBanks : qpy2Banks).map((bank, index) => {
          const active = paymentType === bank.type;
          return (
            <div
              key={index}
              onClick={() => {
                setValue('payment', payment.id);
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
                className={`w-16 rounded-lg ${
                  paymentType === bank.type ? 'border-4 border-current-2' : ''
                }`}
                src={ConvertQpayBankImg[bank.type]}
                alt={`${bank.type} Bank`}
              />
            </div>
          );
        })}
      </div>
    </PaymentBlockItem>
  );
};
