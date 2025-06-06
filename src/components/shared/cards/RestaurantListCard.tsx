'use client';
import defaultImage from '@/assets/images/restaurant.png';
import { EsChannel, FavouriteItemType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/general';
import { useFavourite, useLocation } from '@/lib/providers';
import nProgress from 'nprogress';
import { Loader } from '../loader';

interface Props {
  place: EsChannel;
  services?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  onClick?: () => void;
}

export const RestaurantListCard: React.FC<Props> = ({ place, className, ref, onClick }) => {
  const router = useRouter();
  const { editFavourite, isFavourite, editing: loading, loadingId } = useFavourite();
  const liked = isFavourite(FavouriteItemType.BRANCH, place.branch);
  const { getDistance } = useLocation();

  const navigate = (e: string) => {
    nProgress.start();
    router.push(e);
  };

  return (
    <div
      ref={ref}
      key={place?.id}
      onClick={() => (onClick ? onClick() : navigate(`/restaurant/${place.id}`))}
      className={cn('relative w-full h-max overflow-hidden border rounded-lg py-2 px-2', className)}
    >
      <div className="rounded-lg  duration-300 ease-in-out cursor-pointer ">
        <div className="flex flex-row md:flex-row items-center justify-start gap-1 h-full ">
          <div className="relative">
            <Image
              width={100}
              height={100}
              alt="Restaurant Image"
              className="rounded-lg object-cover w-24 h-24"
              src={!place?.logo || place.logo === '' ? defaultImage : place?.logo}
              style={{
                objectFit: 'cover',
              }}
            />
            {loading && place.branch === loadingId ? (
              <Loader className="absolute top-0 left-0 m-2 bg-background p-1 h-6 w-6 rounded-full" />
            ) : (
              <Icons.heart
                onClick={(e) => {
                  e.stopPropagation();
                  editFavourite(FavouriteItemType.BRANCH, place.branch);
                }}
                className={`w-6 h-6 ${
                  liked && 'fill-current-2'
                } stroke-white absolute top-0 left-0 m-2 bg-secondary-background pt-[0.2rem] pb-[0.1rem]  rounded-full`}
              />
            )}
          </div>
          <div className="px-2 py-2 md:gap-2 gap-1.5 flex flex-col justify-between overflow-hidden text-ellipsis bg-background ">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-semibold truncate xl:text-xl capitalize">{place.name}</h2>
              <div className="flex items-center gap-0.5">
                <div>
                  <Icons.star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                </div>
                <p className="text-sm  xl:text-base text-ellipsis truncate text-secondary-text opacity-80">
                  {Number(place?.star ?? 0).toFixed(1)}
                </p>
              </div>
            </div>
            <div className="pt-0.5 w-full flex items-center gap-2 ">
              <div className="flex items-center gap-1">
                <div>
                  <Icons.navigation className="text-current-2 h-4 w-4" />
                </div>
                <p className="text-sm  xl:text-base text-ellipsis truncate  text-secondary-text opacity-80">
                  {getDistance(place?.distance, place?.latitude, place?.longitude)}
                </p>
              </div>
              <div className="w-[4px] h-[4px] rounded-full bg-secondary-text mx-0.5"></div>
              <div className="flex items-center gap-1">
                <div>
                  <Icons.store className="fill-white h-4 w-4 text-current-2" />
                </div>
                <p className=" text-sm  xl:text-base text-ellipsis truncate  text-secondary-text opacity-80">
                  {place?.type}
                </p>
              </div>
            </div>
            <div className=" flex items-center  gap-1 max-w-80 ">
              <div>
                <Icons.pinCard className="fill-white h-5 w-5 text-current-2" />
              </div>
              <p className="text-sm xl:text-base text-ellipsis truncate text-secondary-text opacity-80">
                {place?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
