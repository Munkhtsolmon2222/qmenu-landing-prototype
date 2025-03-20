'use client';
import { Icons } from '@/components/general';
import { OrderDialog } from '@/components/shared';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import { PAGE_ORDERS, PAGE_RESTAURANT } from '@/lib/constant';
import { Order } from '@/lib/types';
import { redirectWithNProgress } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
  order?: Order;
}

export const SuccessDialog: React.FC<Props> = ({ order, id }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    redirectWithNProgress(PAGE_ORDERS + '?key=1');
  };

  return (
    <>
      <OrderDialog.Header />
      <OrderDialog.Container className="my-auto">
        <div className="h-24 w-24 mx-auto mt-auto">
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
        <div className="flex flex-col items-center">
          <strong className="text-xl">{t('Successfully sent')}</strong>
          <Alert className="border h-max border-orange-200 !pl-6 my-5 opacity-80">
            <AlertTitle className="flex items-center justify-start gap-2">
              <Icons.info className="w-5 h-5 text-orange-400" />
              <div>{t('Reminder')}</div>
            </AlertTitle>
            <AlertDescription>
              {t('Orders will only be confirmed if the restaurant approves')}
            </AlertDescription>
          </Alert>
          <div className="flex justify-center gap-2 flex-wrap">
            <div className="text-secondary-text opacity-75 text-nowrap">{t('Is it allowed')}</div>
            <div
              onClick={handleClick}
              className="cursor-pointer hover:underline text-current-2 text-nowrap"
            >
              {t('Order history')}
            </div>
            <div className="text-secondary-text opacity-75 text-nowrap">
              {t('please check the section')}
            </div>
          </div>

          {order?.number && (
            <div className="text-center mt-5">
              <span className="text-secondary-text opacity-75 mr-2">Таны захиалгын дугаар :</span>
              <span className="text-current-2">{order.number.slice(-4)}</span>
            </div>
          )}
        </div>
      </OrderDialog.Container>
      <OrderDialog.Footer onClick={() => redirectWithNProgress(`${PAGE_RESTAURANT}/${id}`)}>
        <div className="text-center w-full">{t('Done')}</div>
      </OrderDialog.Footer>
    </>
  );
};
