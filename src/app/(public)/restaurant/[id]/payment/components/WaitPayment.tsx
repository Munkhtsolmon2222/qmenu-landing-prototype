'use client';
import { Transaction } from '@/lib/types';
import pending from '@/assets/images/Bubble.png';
import { LoaderIcon } from 'lucide-react';
import { DialogTitle, Modal } from '@/components/general';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { PaymentType } from '@/lib/constant';

type Props = {
  visible: boolean;
  onClose: (transactionId: any) => void;
  refetch: (transactionId: any) => void;
  loadingCancel: boolean;
  transaction?: Transaction;
};

export const WaitPaymentModal = ({
  visible,
  onClose,
  refetch,
  transaction,
  loadingCancel,
}: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generetaUrl = async (data: string) => {
    console.log(data);
    try {
      const url = await QRCode.toDataURL(
        { data, mode: 'byte' },
        {
          errorCorrectionLevel: 'L',
        },
      );

      setImageUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (transaction && transaction.type === PaymentType.UNP) {
      generetaUrl(transaction.image);
    }
  }, [transaction]);

  const getImage = () => {
    const type = transaction?.type;
    const image = transaction?.image;
    if (!transaction || !type || !image) return <img src={pending.src} className="w-32 h-32" />;

    switch (type) {
      case PaymentType.SocialPay:
        return <img alt="Social Pay" src={image} />;
      case PaymentType.QPay:
        return <img alt="QPay" src={`data:image/jpeg;base64,${image}`} />;
      case PaymentType.QPay2:
        return <img alt="QPay2" src={`data:image/jpeg;base64,${image}`} />;
      case PaymentType.MonPay:
        return <img alt="Monpay" src={image} />;
      case PaymentType.MNQ:
        return <img alt="Monpay" src={image} />;
      case PaymentType.Toki:
      case PaymentType.PTK:
        return <img alt="Toki" src={image} width={300} height={300} />;
      case PaymentType.UNP:
        return <img alt="Other" src={imageUrl ?? ''} width={300} height={300} />;
      case PaymentType.MBK:
        return <img alt="Monpay" src={image} width={300} height={300} />;
      default:
        return <img src={pending.src} className="w-32 h-32" />;
    }
  };

  return (
    <Modal
      open={visible}
      onClose={() => onClose(transaction?.id)}
      className="w-[calc(100%_-_30px)]"
    >
      <Modal.Content className="rounded-lg">
        <DialogTitle />
        <div className="flex place-content-center">{getImage()}</div>
        <div className="grid gap-2 place-items-center w-full">
          <span className="text-lg font-normal">Гүйлгээ хүлээгдэж байна</span>
          <span className=" text-sm text-misty font-normal text-center">
            Гүйлгээ хийгдсэнээр таны захиалга баталгаажна
          </span>
        </div>

        <div className="place-content-center">
          <div className="grid gap-2 place-items-center w-full">
            <button
              onClick={() => onClose(transaction?.id)}
              disabled={loadingCancel}
              className="w-8/12 flex place-content-center justify-center border border-primary p-3 rounded-lg cursor-pointer"
            >
              {loadingCancel && <LoaderIcon className="mr-1 text-primary text-2xl animate-spin" />}
              <span className="block  text-sm text-primary font-semibold ">Буцах</span>
            </button>
            <div
              onClick={() => refetch(transaction?.id)}
              className="w-8/12 flex place-content-center justify-center bg-primary p-3 rounded-lg cursor-pointer"
            >
              <span className="block text-sm text-primary-foreground font-semibold ">Төлсөн</span>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
