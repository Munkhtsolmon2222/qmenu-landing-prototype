import defaultImage from '@/assets/images/restaurant.png';
import Image from 'next/image';
import { I18Translate, ReviewForm, ShareModal } from '@/components/shared';
import { Icons } from '@/components/general';
import { calculateDistance } from '@/lib/utils';
import { AboutMap } from './AboutMap';
import { TableOrderButton } from './TableOrderButton';
import { RestaurantProps } from '../types';

interface Props extends RestaurantProps {}

export const RestaurantAbout: React.FC<Props> = ({ participant, isAuthenticated }) => {
  const branch = participant.branch;

  return (
    <>
      <div className="relative z-0 w-full overflow-x-hidden flex gap-3 h-96 sm:rounded-xl sm:h-64">
        <Image
          id="restaurant-image"
          alt="Restaurant Exterior"
          className="w-full h-full object-cover sm:rounded-xl"
          height="1080"
          src={branch.banner || defaultImage}
          style={{
            aspectRatio: '600/400',
            objectFit: 'cover',
          }}
          width="1920"
        />
      </div>

      <div className="relative z-0 w-full sm:min-h-8 min-h-14 -translate-y-3 bg-background rounded-t-2xl sm:translate-y-0">
        <div className="absolute -top-14 sm:-top-20 left-4 sm:left-8 overflow-hidden flex gap-2 sm:gap-4 items-end w-[calc(100%_-_25px)] pr-2">
          <div className="w-28 min-w-28 h-28 rounded-2xl border-border border shadow overflow-hidden bg-background">
            <Image
              src={branch.logo}
              alt={`${branch.name} logo`}
              className="w-full h-full object-contain bg-transparent"
              loading="lazy"
              height={100}
              width={100}
            />
          </div>
          <span className="text-xl sm:text-2xl font-medium mb-2 truncate sm:w-full">
            {branch.name}
          </span>
          <div className="hidden xl:flex ml-auto gap-3">
            <ReviewForm />
            <ShareModal />
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full md:h-[256px]">
        <div className="flex flex-col gap-3 px-5 sm:px-2 w-full md:w-[450px]">
          <div className="flex gap-1 items-center">
            <div className="text-current-2">
              <Icons.star className="h-5 text-current-2" />
            </div>
            <div className="font-medium opacity-75 text-secondary-text">{branch.star}</div>
            <div className="font-medium text-nowrap opacity-75 text-secondary-text">
              ({branch.totalReviews ?? 0} <I18Translate>Rating</I18Translate>)
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <Icons.navigation className="h-5  text-current-2" />
            <div className="font-medium text-secondary-text opacity-75">
              {calculateDistance(+(branch?.distance || 0)?.toFixed(2) || 0)}
            </div>

            <div className="rounded-full w-1.5 h-1.5 min-w-1.5 min-h-1.5 dark:bg-gray-300 bg-black ml-3 mr-2" />

            <Icons.creditCard className="h-5 text-current-2" />
            <div className="font-medium text-secondary-text opacity-75">{branch.rate ?? '$'}</div>

            <div className="rounded-full w-1.5 h-1.5 min-w-1.5 min-h-1.5 dark:bg-gray-300 bg-black ml-3 mr-2" />

            <Icons.store className="h-5 text-current-2" />
            <div className="font-medium text-secondary-text opacity-75">{branch.type}</div>
          </div>
          <div className="flex gap-1 items-center">
            <Icons.mappin className="h-5 text-current-2 min-w-5" />
            <div className="font-medium text-secondary-text opacity-75 line-clamp-5">
              {branch.address}
            </div>
          </div>

          {participant.orderable && (
            <TableOrderButton isAuthenticated={isAuthenticated} id={participant.id} />
          )}
        </div>
        <AboutMap branch={branch} />
      </div>
    </>
  );
};
