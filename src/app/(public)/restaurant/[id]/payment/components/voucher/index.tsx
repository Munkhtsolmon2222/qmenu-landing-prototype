'use client';
import { Icons } from '@/components/general';
import { TransactionInput } from '@/lib/types';
import { useState, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { VoucherCard } from './components';
import voucher from '@/assets/images/banks/voucher.svg';
import { useAction } from '@/lib/hooks';
import { CORRECTION_TRANSACTION, GET_CUSTOMER_PRODUCTS, PAY_ORDER } from '@/actions';
import { showToast } from '@/lib/helpers';
import { PaymentBlockItem } from '../PaymentBlockItem';
import { PaymentSchemaType } from '@/lib/validations';

type Props = {
  id?: string | undefined;
  watch: UseFormWatch<PaymentSchemaType>;
  order: string | undefined;
  onUpdateOrder: (data: any) => void;
  onFinish: (finish: boolean) => void;
};

export const VoucherForm: React.FC<Props> = ({
  onUpdateOrder,
  id,
  watch,
  order,
  onFinish,
}: Props) => {
  const paymentId = watch('payment');
  const paymentCode = watch('code');

  const [isShow, setIsShow] = useState(false);

  const { action: refetch, data } = useAction(GET_CUSTOMER_PRODUCTS);

  let products: any[] = (data?.getCustomerProducts || []).filter((product: any) => {
    if (product.state === 'ACTIVE') {
      return true;
    } else if (product.state === 'READY') {
      if (product?.spentOrder === order) return true;
      else return false;
    }
    return false;
  });

  useEffect(() => {
    if (paymentId !== id) {
      setIsShow(false);
    }
  }, [paymentId]);

  const onExpand = () => {
    setIsShow(!isShow);
  };

  // const onSelectVoucher = (code) => {
  //   onSelect(PaymentType.VCR, code);
  // };

  const { action: payOrderByPayment, loading: paying } = useAction(PAY_ORDER, {
    lazy: true,
    onSuccess(data) {
      if (!data) return;
      onUpdateOrder(data);
      refetch();
      if (data.order.paymentState === 'PAID') onFinish(true);
    },
    onError: (err) => showToast(err.message),
  });

  const { action: returnTransaction, loading: returning } = useAction(CORRECTION_TRANSACTION, {
    onSuccess: async (data) => {
      onUpdateOrder(data);
      refetch();
    },
    onError: (err) => showToast(err.message),
  });

  const onChangeState = async (voucher: any, state: string) => {
    if (!id || !order) return;

    switch (state) {
      case 'ACTIVE':
        let input: TransactionInput = {
          order,
          buyer: '',
          register: '',
          vatType: 1,
          payment: id,
          confirm: false,
          code: voucher.id,
          amount: 0,
        };

        payOrderByPayment(input);
        break;
      case 'READY':
        returnTransaction(voucher.transaction, 'Voucher returned');
        break;
      default:
        break;
    }
  };

  if (returning) return null;

  return (
    <>
      {data && (
        <PaymentBlockItem active={paymentId === id} className="py-2">
          <div
            className="flex place-items-center place-content-between p-1"
            onClick={() => onExpand()}
          >
            <div className="flex gap-2 place-items-center">
              <img className="w-12 h-12" alt="voucher" src={voucher} />
              <div className="text-misty">Ваучер</div>
            </div>
            {isShow ? (
              <Icons.chevronUp className="text-misty text-2xl" />
            ) : (
              <Icons.chevronDown className="text-misty text-2xl" />
            )}
          </div>
          {isShow && (
            <>
              {returning || paying ? (
                <></>
              ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-1  ">
                  {products &&
                    products?.map((val, index) => (
                      <VoucherCard
                        isBasket={false}
                        loading={paying}
                        key={index}
                        customerProduct={val}
                        selectedId={paymentCode}
                        onChangeState={onChangeState}
                      />
                    ))}
                </div>
              )}
            </>
          )}
        </PaymentBlockItem>
      )}
    </>
  );
};
