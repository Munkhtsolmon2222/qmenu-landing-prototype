'use client';
import { ProductChildProps } from './Product';
import { getMainVariant } from '@/lib/providers/restaurant';
import { Icons, Button } from '@/components/general';
import { useTranslation } from 'react-i18next';

export const ProductListCard: React.FC<ProductChildProps> = ({
  product,
  basketItem,
  onClick,
  hideImage,
  participant,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-8 min-h-24 max-h-28 rounded-lg overflow-hidden border bg-background">
      {!hideImage && (
        <div className="col-span-3">
          <img
            className="object-cover h-full overflow-hidden rounded-lg"
            src={product.image === '' ? participant?.logo : product.image ?? participant?.logo}
          />
        </div>
      )}

      <div
        className={` ${
          !hideImage ? 'col-span-5' : 'col-span-8'
        } w-full h-full grid p-2 pl-1 content-between max-h-28`}
      >
        <div className="text-sm font-medium line-clamp-1">{product.name}</div>
        <div className="italic line-clamp-1 text-sm opacity-70">{product.description}</div>
        <div className="flex justify-between items-center w-full">
          <div className="text-xs font-medium text-current-2">
            {product.variants?.[0]?.salePrice ?? product.variants?.[0]?.price}₮
          </div>
          <div>
            {!basketItem ||
            product.variants?.length > 1 ||
            (getMainVariant(product)?.options ?? []).length > 0 ? (
              <Button
                variant="outline"
                className="border-current-2 px-2.5 max-h-7 w-full max-w-[70px]"
                onClick={() => onClick(product, 'create')}
              >
                {product.variants?.length > 1 ||
                (getMainVariant(product)?.options ?? []).length > 0 ? (
                  <div className="text-current-2 text-xs">{t('Select')}</div>
                ) : (
                  <div className="text-current-2 text-xs">{t('Order')}</div>
                )}
              </Button>
            ) : (
              <div className="flex w-full items-center gap-2 justify-between">
                <Button
                  variant="outline"
                  className="border-current-2 px-2.5 h-7 w-7"
                  onClick={() => onClick(product)}
                >
                  <Icons.minus className="text-current-2 min-w-4 h-4" />
                </Button>
                <span className="text-current-2 text-sm">{basketItem?.input.quantity}</span>
                <Button
                  variant="outline"
                  className="border-current-2 px-2.5 h-7 w-7"
                  onClick={() => onClick(product, 'add')}
                >
                  <Icons.add className="text-current-2 min-w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*       
      <div className="flex flex-col justify-between p-1 items-start">
        <span className="text-base font-medium line-clamp-2 ">
          {product.name}
        </span>

        <span className="text-base font-medium text-primary ">
          {product.variants?.[0]?.salePrice ?? product.variants?.[0]?.price}₮
        </span>
      </div>

      {!basketItem ||
      product.variants?.length > 1 ||
      (getMainVariant(product)?.options ?? []).length > 0 ? (
        <Button
          variant="outline"
          className="flex py-4 ml-auto mt-auto mr-2 mb-2 items-center gap-2 w-full h-8 border-current-2"
          onClick={() => onClick(product, "create")}
        >
          {product.variants?.length > 1 ||
          (getMainVariant(product)?.options ?? []).length > 0 ? (
            <div className="text-current-2">Сонгох</div>
          ) : (
            <div className="text-current-2">Захиалах</div>
          )}
        </Button>
      ) : (
        <div className="flex mt-auto w-full items-center gap-1 p-2 justify-between ml-auto">
          <Button
            variant="outline"
            className="w-8 h-8 text-current-2 border-current-2 p-0"
            onClick={() => onClick(product)}
          >
            <Icons.minus className="text-current-2 w-4 h-4" />
          </Button>
          <span className="text-current-2">{basketItem?.input.quantity}</span>
          <Button
            variant="outline"
            className="w-8 h-8 text-current-2 border-current-2 p-0"
            onClick={() => onClick(product, "add")}
          >
            <Icons.add className="text-current-2 w-4 h-4" />
          </Button>
        </div>
      )} */}
    </div>
  );
};
