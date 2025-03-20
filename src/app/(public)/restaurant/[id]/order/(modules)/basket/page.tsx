'use client';
import { Icons, Modal, Button } from '@/components/general';
import { OrderDialog } from '@/components/shared';
import { Textarea } from '@/components/ui/textarea';
import { PAGE_ORDER, PAGE_ORDER_TYPE, PAGE_RESTAURANT } from '@/lib/constant';
import { useMediaQuery } from '@/lib/hooks';
import { BasketItem, useRestaurantStore } from '@/lib/providers/restaurant';
import { OrderType } from '@/lib/types';
import { cn, redirectWithNProgress } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface Props {}

const Basket: React.FC<Props> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const { items, current, crudItem, totalPrice, setInput, input } = useRestaurantStore();
  const { width = window.innerWidth } = useMediaQuery();
  const [item, setItem] = useState<BasketItem>();
  const [visibleComment, setVisibleComment] = useState<boolean>();
  const [comment, setComment] = useState<string>('');
  const { t } = useTranslation();

  const showAddComment = (item: BasketItem) => {
    setItem(item);
    setVisibleComment(true);
  };

  const onOrder = () => {
    if (!input?.type) setInput((e) => ({ ...e, type: OrderType.PreOrder }));
    redirectWithNProgress(`${PAGE_RESTAURANT}/${id}/${PAGE_ORDER}/${PAGE_ORDER_TYPE}`);
  };

  return (
    <>
      <OrderDialog.Header children={t('Your cart')} />

      <OrderDialog.Container className="flex flex-col gap-2.5">
        {items
          ?.slice()
          .sort((a, b) => a.sort - b.sort)
          .map((item, i) => (
            <div
              key={i}
              className="flex h-28 min-h-28 rounded-lg overflow-hidden border bg-background gap-2"
            >
              <div className="w-40 max-w-40 h-full place-self-center rounded-lg overflow-hidden">
                <Image
                  width={426}
                  height={256}
                  alt={item.product.name}
                  className="rounded-lg h-full w-full"
                  src={(item.product.image || current?.branch?.logo) ?? ''}
                />
              </div>

              <div
                className={cn(
                  'flex flex-col justify-between p-1 items-start',
                  width < 360 ? 'max-w-36' : 'max-w-40',
                )}
              >
                <span className="text-base font-medium line-clamp-2 ">{item.variant.name}</span>

                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => showAddComment(item)}
                >
                  <Icons.pencilLine className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 line-clamp-1 w-28">
                    {!item.input.comment ? t('Addional request') : item.input.comment}
                  </span>
                </div>

                <span className="text-base font-medium text-primary ">
                  {(item.variant?.salePrice ?? item.variant?.price ?? '-').toLocaleString()} MNT
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 p-2 justify-center ml-auto">
                <Button
                  variant="outline"
                  className="w-8 h-8 text-current-2 border-current-2 p-0"
                  onClick={() => crudItem('add', { item })}
                >
                  <Icons.add className="text-current-2 w-4 h-4" />
                </Button>
                <span className="text-current-2">{item.input.quantity}</span>
                <Button
                  variant="outline"
                  className="w-8 h-8 text-current-2 border-current-2 p-0"
                  onClick={() => crudItem('remove', { item })}
                >
                  <Icons.minus className="text-current-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
      </OrderDialog.Container>

      {items.length > 0 && (
        <OrderDialog.Footer buttonProps={{ disabled: items.length < 1 }} onClick={onOrder}>
          {items.length > 0 ? (
            <>
              <span className="text-white">{t('Order')}</span>
              <span className="text-white">{totalPrice.toLocaleString()} MNT</span>
            </>
          ) : (
            <span className="text-white mx-auto">{t('Order')}</span>
          )}
        </OrderDialog.Footer>
      )}

      <Modal
        open={visibleComment}
        onClose={() => setVisibleComment(false)}
        className="flex flex-col w-[380px] rounded-lg"
      >
        <Modal.Header>
          <div className="text-start font-bold">{t('Addional request')}</div>
        </Modal.Header>
        <Modal.Content>
          <div className="h-full flex flex-col gap-1">
            <Textarea
              id="comment"
              placeholder={t('Addional request')}
              defaultValue={item?.input.comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              variant="outline"
              type="submit"
              className="gap-2 text-current-2 border-current-2"
              onClick={() => {
                if (item) {
                  crudItem('update', {
                    item: {
                      ...item,
                      input: { ...item.input, comment },
                    },
                  });
                  setVisibleComment(false);
                }
              }}
            >
              <span className="text-current-2">{t('Save')}</span>
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Basket;
