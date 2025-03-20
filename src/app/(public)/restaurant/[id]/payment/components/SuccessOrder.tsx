'use client';
import { Button, Modal } from '@/components/general';
import { SmartBanner } from '@/components/shared';
import { PAGE_RESTAURANT, BannerType } from '@/lib/constant';
import { useRestaurantStore } from '@/lib/providers';
import { Participant } from '@/lib/types';
import { redirectWithNProgress } from '@/lib/utils';
import { useState } from 'react';

type Props = {
  visible: boolean;
  participant?: Participant;
  orderNumber?: string;
};

export const SuccesOrder = ({ visible, orderNumber, participant }: Props) => {
  const { crudItem } = useRestaurantStore();
  const [disabled, setDisabled] = useState(false);

  const goBack = () => {
    setDisabled(true);
    crudItem('clear', {});
    setTimeout(() => {
      setDisabled(false);
      redirectWithNProgress(PAGE_RESTAURANT + '/' + participant?.id);
    }, 3000);
  };

  return (
    <Modal
      open={visible}
      onClose={() => {}}
      className="h-full sm:h-[400px] rounded-none sm:rounded-lg sm:p-4"
    >
      <Modal.Content className="h-full max-w-[500px] p-0">
        <div className="m-auto w-full">
          <div className="flex place-content-center">
            <div className="h-24 w-24">
              <svg
                stroke="#84cc16"
                fill="#84cc16"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="text-white text-2xl h-full w-full "
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
              </svg>
            </div>
          </div>
          <div className="text-[22px] mt-2 w-64 mx-auto text-misty text-center font-semibold">
            Таны захиалга амжилттай боллоо
          </div>
          {orderNumber && (
            <div className="text-center">
              <span className="text-secondary-text opacity-75 mr-2">Таны захиалгын дугаар :</span>
              <span className="text-current-2">{orderNumber.slice(-4)}</span>
            </div>
          )}

          <div className="p-3 flex justify-center">
            <SmartBanner types={[BannerType.A]} />
          </div>
        </div>

        <div className="place-content-center">
          <div className="fixed left-0 px-4 py-3 w-full mx-auto inset-x-0 max-w-xl bg-background bottom-0 rounded-t-2xl flex flex-col justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Button
              disabled={disabled}
              onClick={() => goBack()}
              className="w-full flex place-content-center justify-center bg-current-2 p-1 rounded-full cursor-pointer h-11"
            >
              Буцах
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
