'use client';
import { EsProduct, FavouriteItemType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icons, MotionCard } from '@/components/general';
import { calculateDistance, cn } from '@/lib/utils';
import nProgress from 'nprogress';
import defaultImage from '@/assets/images/restaurant.png';
import { useFavourite } from '@/lib/providers';
import { Loader } from '../loader';

interface Props {
  product: EsProduct;
  className?: string;
  index?: number;
}

export const CarouselProductCard: React.FC<Props> = ({ product, className, index }) => {
  const router = useRouter();
  const { editFavourite, isFavourite, editing: loading, loadingId } = useFavourite();
  const liked = isFavourite(FavouriteItemType.PRODUCT, product.id);

  const onNavigate = () => {
    nProgress.start();
    router.push(`/restaurant/${product.channel}`);
  };

  return (
    <MotionCard
      className={cn(
        'relative rounded-2xl border overflow-clip min-w-72 max-w-72 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.01]',
        className,
      )}
      onClick={onNavigate}
      transition={{ delay: index ? 0.1 * index : 0, duration: 0.3 }}
    >
      <div className="absolute top-2 left-2 w-11 h-11 overflow-hidden rounded-full">
        <Image
          width={480}
          height={480}
          src={product.branch?.logo || defaultImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-2 right-2 w-9 h-9 overflow-hidden rounded-full bg-background flex items-center justify-center">
        {loading && loadingId === product.id ? (
          <Loader className="text-current-2" />
        ) : (
          <Icons.heart
            onClick={(e) => {
              e.stopPropagation();
              editFavourite(FavouriteItemType.PRODUCT, product.id);
            }}
            className={cn(
              liked ? 'stroke-current-2 fill-current-2' : 'stroke-gray-200 fill-gray-200',
            )}
          />
        )}
      </div>
      <Image
        width={1280}
        height={720}
        src={product.image || defaultImage}
        alt={product.name}
        className="w-full h-[10rem] object-cover"
      />
      <div className="relative z-10">
        <div className="bg-gradient-to-b from-transparent via-white/90 to-white w-full">
          <div className="gap-2 flex flex-col w-full justify-between items-start py-2 px-2 bg-white bg-opacity-80">
            <div className="flex items-center gap-1 justify-between w-full">
              <div className="text-lg font-semibold truncate capitalize max-w-52">
                {product.name}
              </div>
              <div className="text-base -mt-1 font-semibold truncate capitalize opacity-70 w-24 text-right">
                {product.price.toLocaleString()} ₮
              </div>
            </div>

            <span className="min-h-6 opacity-60 max-h-6 line-clamp-1">
              {product.description || product.name}
            </span>

            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-1">
                <div>
                  <Icons.store className="fill-white h-4 w-4 text-current-2" />
                </div>
                <p className="text-sm max-w-36 xl:text-base text-ellipsis truncate text-secondary-text ">
                  {product.branch?.name}
                </p>
              </div>
              <div className="flex items-center cursor-pointer gap-2">
                <div className="flex items-center gap-1">
                  <div>
                    <Icons.navigation className="fill-white h-4 w-4 text-current-2" />
                  </div>
                  <p className="text-sm text-ellipsis truncate text-secondary-text">
                    {product.branch?.distance
                      ? calculateDistance(+(product.branch.distance || 0) || 0)
                      : ''}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  <div>
                    <Icons.star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                  </div>
                  <p className="text-sm text-ellipsis truncate text-secondary-text">
                    {product.branch?.star ? (+product.branch.star).toFixed(1) : '0.0'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionCard>
  );
};
