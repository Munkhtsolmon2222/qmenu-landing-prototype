import { Transaction } from "@/lib/types";
import pending from "@/assets/images/Bubble.png";
import { LoaderIcon } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
type Props = {
  visible: boolean;
  onClose: (transactionId) => void;
  refetch: (transactionId) => void;
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
    <Dialog open={visible} onOpenChange={() => onClose(transaction?.id)}>
      <DialogContent className="w-[calc(100%_-_30px)] rounded-lg">
        <div className="flex place-content-center">
          <Image
            width={100}
            height={100}
            alt="pending"
            src={pending}
            className="w-32 h-32"
          />
        </div>
        <div className="grid gap-2 place-items-center w-full">
          <span className="text-lg font-normal">Гүйлгээ хүлээгдэж байна</span>
          <span className=" text-sm text-misty font-normal text-center">
            Гүйлгээ хийгдсэнээр таны захиалга баталгаажна
          </span>
        </div>

        <DialogFooter className="place-content-center">
          <div className="grid gap-2 place-items-center w-full">
            <button
              onClick={() => onClose(transaction?.id)}
              disabled={loadingCancel}
              className="w-8/12 flex place-content-center justify-center border border-primary p-3 rounded-lg cursor-pointer"
            >
              {loadingCancel && (
                <LoaderIcon className="mr-1 text-primary text-2xl animate-spin" />
              )}
              <span className="block  text-sm text-primary font-semibold ">
                Буцах
              </span>
            </button>
            <div
              onClick={() => refetch(transaction?.id)}
              className="w-8/12 flex place-content-center justify-center bg-primary p-3 rounded-lg cursor-pointer"
            >
              <span className="block text-sm text-primary-foreground font-semibold ">
                Төлсөн
              </span>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
