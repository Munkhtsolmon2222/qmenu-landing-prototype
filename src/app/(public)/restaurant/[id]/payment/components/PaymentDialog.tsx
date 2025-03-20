'use client';
import { Icons } from '@/components/general';
import { OrderDialog } from '@/components/shared';
import { Alert, AlertDescription } from '@/components/ui';
import {
  SystemType,
  PAGE_RESTAURANT,
  PAGE_HOME,
  PaymentType,
  PartnerObjType,
  LoyaltyType,
} from '@/lib/constant';
import { useRestaurantStore, UpointContext } from '@/lib/providers';
import { Payload, Transaction, TransactionInput } from '@/lib/types';
import { redirectWithNProgress } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  OrderInfo,
  VatForm,
  BanksForm,
  QpayForm,
  VoucherForm,
  UpointForm,
  WaitPaymentModal,
  SuccesOrder,
  PaymentBlockItem,
} from '../components';
import nProgress from 'nprogress';
import { useAction } from '@/lib/hooks';
import {
  CORRECTION_TRANSACTION,
  GET_CURRENT_CUSTOMER,
  GET_ORDER,
  PAY_ORDER,
  PAY_ORDER_WITH_SUB_PAYMENTS,
  VALIDATE_TRANSACTION,
} from '@/actions';
import { showToast } from '@/lib/helpers';
import { PaymentFormSchema, PaymentSchemaType } from '@/lib/validations';
import { useSubscription } from '@apollo/client';
import { ON_UPDATED_ORDER } from '@/graphql/subscription';

interface Props {
  payload: Payload;
}

export const PaymentDialog: React.FC<Props> = ({ payload }) => {
  const router = useRouter();
  const { current } = useRestaurantStore();
  const { orderId } = useParams<{ orderId: string }>();
  const [partner, setPartner] = useState<SystemType>();
  const [visiblePending, setVisiblePending] = useState(false);
  const [visibleSucces, setVisibleSucces] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const [cancelTransactionId, setCancelTransactionId] = useState<string>();
  const { upointBalance, addOrderLoyalty, addingLoyalty, clearUpointState } =
    useContext(UpointContext);

  const { action: returnTransaction, loading: returning } = useAction(CORRECTION_TRANSACTION, {
    lazy: true,
  });

  const { control, watch, setValue, handleSubmit } = useForm<PaymentSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: { vatType: '1' },
  });

  const { paymentType = '' } = watch();

  const navigate = (path: string | -1) => {
    if (path === -1) {
      nProgress.start();
      router.back();
      return;
    }

    redirectWithNProgress(path);
  };

  const {
    data: order,
    action: refetch,
    loading,
  } = useAction(GET_ORDER, orderId, {
    onError: () => {
      if (current) navigate(`${PAGE_RESTAURANT}/${current.id}`);
      else navigate(`${PAGE_HOME}`);
    },
  });

  const { data: user, loading: loadUser } = useAction(GET_CURRENT_CUSTOMER);

  const { action: validateTransaction, loading: validating } = useAction(VALIDATE_TRANSACTION, {
    lazy: true,
    onSuccess(data) {
      if (data?.paymentState === 'PAID') {
        setVisiblePending(false);
        setVisibleSucces(true);
      } else {
        showToast('Таны төлбөр төлөгдөөгүй байна.');
      }
    },
  });

  const { action: payOrderByPayment, loading: paying } = useAction(PAY_ORDER, {
    lazy: true,
    onSuccess(data) {
      if (data?.order.paymentState === 'PAID') {
        setVisiblePending(false);
        setVisibleSucces(true);
      } else {
        setTransaction(data?.transaction);
        let link: string | undefined;
        if (data?.transaction.links) {
          link = data?.transaction.links.find(
            (link: any) => link.name.toUpperCase() === paymentType.toUpperCase(),
          )?.link;
        }

        if (link) {
          window.location.href = link;
          setVisiblePending(true);
        } else {
          showToast('Payment link not found');
        }
      }
    },
    onError: (err) => showToast(err.message),
  });

  const onCompletedPayOrder = (data: any) => {
    if (upointBalance?.state === 'spend')
      setCancelTransactionId(
        data.order.transactions?.find(
          (item: Transaction) => item.state === 'PAID' && item.type === PaymentType.UPT,
        )?.id,
      );

    setTransaction(data.transaction);
    let link = data.transaction.links.find(
      (link: any) => link.name.toUpperCase() === paymentType.toUpperCase(),
    )?.link;
    if (link) {
      window.location.href = link;
      setVisiblePending(true);
    } else {
      showToast('Payment link not found');
    }
  };

  const { action: payOrderByPayments, loading: paying2 } = useAction(PAY_ORDER_WITH_SUB_PAYMENTS, {
    lazy: true,
    onSuccess: onCompletedPayOrder,
    onError: (err) => showToast(err.message),
  });

  const updateOrder = () => {
    refetch(orderId);
  };

  const finish = () => {
    setVisiblePending(false);
    setVisibleSucces(true);
  };

  useEffect(() => {
    refetch(orderId);

    const partner = PartnerObjType[payload?.type ?? ('' as SystemType)];

    if (partner) {
      setPartner(partner.type);
      // setValue("paymentType", partner.payment);
    }

    clearUpointState();
    if ((order?.transactions ?? []).length > 0) {
      setTransaction(order?.transactions[0]);
    }
  }, []);

  const onFinish = async (values: PaymentSchemaType) => {
    if (paying || paying2) return;
    let inputs: TransactionInput[] = [
      {
        buyer: values.buyer ?? '',
        payment: values.payment ?? '',
        register: values.register ?? '',
        vatType: +values.vatType,
        code: values.code ?? '',
        order: order?.id ?? orderId,
        confirm: false,
      },
    ];

    if (upointBalance?.state === 'spend') {
      inputs = inputs.concat([
        {
          order: order?.id ?? '',
          buyer: '',
          register: '',
          vatType: 1,
          payment: current?.payments.find((val: any) => val.type === PaymentType.UPT)?.id ?? '',
          confirm: false,
          code: '',
        },
      ]);
    }

    if (upointBalance && upointBalance.state === 'collect') {
      await addOrderLoyalty({
        variables: { id: order?.id, type: LoyaltyType.U },
        onError: (error: Error) => showToast(error.message),
      });
    }

    if (inputs.length > 1) {
      payOrderByPayments(inputs[0], [inputs[1]]);
    } else {
      payOrderByPayment({ ...inputs[0] });
    }
  };

  const onRefetch = async (transactionId: string) => {
    try {
      validateTransaction(transactionId, {
        onSuccess(data) {
          if (data?.paymentState === 'PAID') {
            setVisiblePending(false);
            setVisibleSucces(true);
            clearUpointState();
          } else if (data?.paymentState !== 'PAID') {
            showToast('Таны төлбөр төлөгдөөгүй байна.');
          }
        },
      });
    } catch (error) {
      console.error('Error while refetching:', error);
      showToast('Та мэдээллийг дахин татахад алдаа гарлаа.');
    }
  };

  const onCloseWaitPaymentModal = async (transactionId: string) => {
    if (cancelTransactionId) {
      const data = await validateTransaction(transactionId);

      if (data?.paymentState !== 'PAID') {
        await returnTransaction(cancelTransactionId, 'Цуцалсан');
        clearUpointState();
      }
    }
    setVisiblePending(false);
  };

  useSubscription(ON_UPDATED_ORDER, {
    variables: { customer: payload.sub },
    skip: !payload.sub,
    onData({ data }) {
      if (!data) return;
      const { event, order: subscriptionOrder } = data.data.onUpdatedOrder;

      switch (event) {
        case 'CREATED':
        case 'UPDATED':
          if (order?.id === subscriptionOrder.id && subscriptionOrder.paymentState === 'PAID') {
            setVisiblePending(false);
            setVisibleSucces(true);
          }
          break;
        default:
          return;
      }
    },
    onError(error) {
      console.log('Error:', error);
    },
  });

  if (loading || loadUser) {
    return (
      <div className="h-[calc(100vh_-_170px)] w-full flex items-center justify-center">
        <LoaderIcon className="animate-spin text-current-2" />
      </div>
    );
  }

  return (
    <>
      <OrderDialog.Header children="Төлбөр төлөх" onClick={() => navigate(-1)} />
      <OrderInfo order={order} participant={current} />
      <OrderDialog.Container className="px-0">
        <div className="flex flex-col gap-4 mt-[60px]">
          <div />
          <PaymentBlockItem className="p-0">
            <Alert className="border-0 bg-[#e5f9fe]">
              <Icons.info
                className="w-5 "
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(34%) sepia(91%) saturate(2854%) hue-rotate(169deg) brightness(98%) contrast(102%)',
                }}
              />
              <AlertDescription className="text-[#0093B9]">
                Та төлбөрөө төлөөд энэхүү дэлгэцрүү буцан орж захиалгаа баталгаажуулаарай.
              </AlertDescription>
            </Alert>
          </PaymentBlockItem>

          <VatForm watch={watch} setValue={setValue} control={control} />

          <BanksForm participant={current} watch={watch} setValue={setValue} />

          {!partner && (
            <QpayForm
              payment={current?.payments.find((payment) =>
                [PaymentType.QPay, PaymentType.QPay2].includes(payment.type),
              )}
              watch={watch}
              setValue={setValue}
            />
          )}

          {current?.payments.find((payment) => payment.type === PaymentType.VCR) && (
            <VoucherForm
              order={order?.id}
              id={current.payments.find((payment) => payment.type === PaymentType.VCR)?.id}
              watch={watch}
              onUpdateOrder={updateOrder}
              onFinish={finish}
            />
          )}

          {user?.phone &&
            user.verified &&
            current?.payments.find((item) => item.type === PaymentType.UPT) && (
              <UpointForm
                order={order}
                user={user}
                payment={current.payments.find((item) => item.type === PaymentType.UPT)}
              />
            )}
        </div>
      </OrderDialog.Container>

      <WaitPaymentModal
        loadingCancel={returning}
        transaction={transaction}
        visible={visiblePending}
        onClose={onCloseWaitPaymentModal}
        refetch={onRefetch}
      />

      <SuccesOrder visible={visibleSucces} orderNumber={order?.number} participant={current} />

      <OrderDialog.Footer
        buttonProps={{
          loading: loading || paying || addingLoyalty || paying2 || validating,
          onClick: handleSubmit(onFinish),
        }}
      >
        <span>Төлбөр төлөх</span>
        <span>{order?.debtAmount.toLocaleString()} MNT</span>
      </OrderDialog.Footer>
    </>
  );
};
