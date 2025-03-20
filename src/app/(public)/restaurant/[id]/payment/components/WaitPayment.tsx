import { Transaction } from '@/lib/types';
import pending from '@/assets/images/Bubble.png';
import { LoaderIcon } from 'lucide-react';
import { Modal } from '@/components/general';

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
  return (
    <Modal
      open={visible}
      onClose={() => onClose(transaction?.id)}
      className="w-[calc(100%_-_30px)]"
    >
      <Modal.Content className="rounded-lg">
        <div className="flex place-content-center">
          <img src={pending.src} className="w-32 h-32" />
        </div>
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
