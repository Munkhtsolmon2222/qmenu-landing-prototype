'use client';
import { EsChannel, FavouriteItemType, TableInfo } from '@/lib/types';
import defaultImage from '@/assets/images/restaurant.png';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icons, MotionCard } from '@/components/general';
import { PAGE_RESTAURANT } from '@/lib/constant';
import nProgress from 'nprogress';
import { useFavourite, useLocation } from '@/lib/providers';
import { Loader } from '../loader';

interface Props {
  channel: EsChannel;
  services: boolean;
}

export function getAvailabilityStatus(tableInfo: TableInfo): string {
  const percentage = Number((tableInfo?.available * 100) / tableInfo.total) ?? 0;

  let color;
  if (percentage === 0) {
    color = 'red';
  } else if (percentage > 75) {
    color = 'green';
  } else if (percentage > 50) {
    color = 'yellow';
  } else if (percentage > 25) {
    color = 'orange';
  } else {
    color = 'green';
  }

  return color;
}

export function FilteredCard(props: Props) {
  const { channel } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const { editFavourite, isFavourite, editing: loading, loadingId } = useFavourite();
  const { getDistance } = useLocation();

  const like = isFavourite(FavouriteItemType.BRANCH, channel.branch);

  const color = getAvailabilityStatus(channel?.tableInfo);

  const getAvailable = () => {
    if (!channel?.tableInfo) return;
    const seated = channel.tableInfo.seated || 0;
    const available = channel.tableInfo.available || 0;

    if (seated === 0 && available === 0) return;
    return available;
  };

  const onNavigate = () => {
    nProgress.start();
    router.push(`${PAGE_RESTAURANT}/${channel.id}`);
  };

  return (
    <MotionCard
      className="rounded-2xl border overflow-clip w-full cursor-pointer hover:shadow-md duration-300"
      onClick={onNavigate}
      transition={{ duration: 0.7 }}
    >
      <div className="relative">
        {color && (
          <div className="absolute  top-2.5 left-4 pt-1.5 flex items-center justify-center h-8  ">
            <div className="ml-2 w-5 flex justify-between items-center">
              <span
                style={{ backgroundColor: color }}
                className={`absolute h-2.5 w-2.5  rounded-full  dissolve drop-shadow-3xl  z-40`}
              ></span>
              <span
                style={{ backgroundColor: color }}
                className={`absolute h-2.5 w-2.5 rounded-full  animate-dissolve  z-40`}
              ></span>
            </div>
            <div className="rounded-sm text-xs text-white font-semibold  backdrop-brightness-50 px-1">
              {getAvailable() ? t('Available table') + ':' + getAvailable() : t('BranchOpen')}
            </div>
          </div>
        )}
        <div></div>
        <Image
          width={1280}
          height={720}
          alt="picture"
          className="w-full h-[16vh] object-cover"
          src={!channel?.image || channel.image === '' ? defaultImage : channel?.image}
          style={{
            objectFit: 'cover',
          }}
        />
        {loading && channel.branch === loadingId ? (
          <Loader className="absolute top-0 right-0 m-2 bg-background p-1 rounded-full" />
        ) : (
          <Icons.heart
            aria-disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              editFavourite(FavouriteItemType.BRANCH, channel.branch);
            }}
            className={`w-8 h-8 ${
              like ? 'stroke-current-3 fill-current-3' : 'stroke-gray-200 fill-gray-200'
            }  absolute top-0 right-0 m-2 bg-background p-1.5   rounded-full`}
          />
        )}
      </div>
      <div className="px-2 py-2 md:gap-2 gap-1.5 flex flex-col justify-between overflow-hidden text-ellipsis bg-background">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold truncate xl:text-xl capitalize">{channel.name}</h2>
          <div className="flex items-center gap-0.5">
            <div>
              <Icons.star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
            </div>
            <p className=" text-sm  xl:text-base text-ellipsis truncate font-medium">
              {Number(channel?.star ?? 0).toFixed(1)}
            </p>
          </div>
        </div>
        <div className="pt-0.5 w-full flex items-center gap-2 ">
          <div className="flex items-center gap-1">
            <div className="">
              <Icons.navigation className="text-primary h-4 w-4" />
            </div>
            <p className="text-sm  xl:text-base text-ellipsis truncate  text-primary font-medium opacity-75 ">
              {getDistance(channel.distance, channel.latitude, channel.longitude)}
            </p>
          </div>
          <div className="w-[4px] h-[4px] rounded-full bg-secondary-text mx-0.5"></div>
          <div className="flex items-center gap-1">
            <div>
              <Icons.wallet className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm  xl:text-base text-ellipsis truncate  text-primary font-medium opacity-75">
              {channel.rate}
            </p>
          </div>
          <div className="w-[4px] h-[4px] rounded-full bg-secondary-text mx-0.5"></div>
          <div className="flex items-center gap-1">
            <div>
              <Icons.store className="h-4 w-4 text-primary" />
            </div>
            <p className=" text-sm  xl:text-base text-ellipsis truncate  text-primary font-medium opacity-75 ">
              {channel?.type}
            </p>
          </div>
        </div>
        <div className=" flex items-center  gap-1 max-w-80">
          <div>
            <Icons.pinCard className="fill-white h-5 w-5 text-current-2" />
          </div>
          <p className=" text-xs  xl:text-base text-ellipsis truncate  text-secondary-text font-medium opacity-75">
            {channel?.address}
          </p>
        </div>
      </div>
    </MotionCard>
  );
}
