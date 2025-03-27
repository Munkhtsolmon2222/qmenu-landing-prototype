import Head from 'next/head';
import defaultImage from '@/assets/images/restaurant.png';
import Image from 'next/image';
import { I18Translate, ReviewForm, ShareModal } from '@/components/shared';
import { Icons } from '@/components/general';
import { calculateDistance } from '@/lib/utils';
import { AboutMap } from './AboutMap';
import { TableOrderButton } from './TableOrderButton';
import { RestaurantProps } from '../types';
import { PAGE_RESTAURANT, QMENU_URL } from '@/lib/constant';

interface Props extends RestaurantProps {
  distance: number;
}

export const RestaurantAbout: React.FC<Props> = ({ participant, isAuthenticated, distance }) => {
  const branch = participant.branch;
  const restaurantUrl = `${QMENU_URL}${PAGE_RESTAURANT}/${participant.id}`;

  return (
    <>
      <Head>
        <title>{branch.name}</title>
        <meta name="description" content={`${branch.name} - ${branch.description}`} />
        <meta
          name="keywords"
          content={`${branch.name}, ${branch.type}, restaurant, ${branch.address}, best food`}
        />

        {/* Open Graph (Facebook, Messenger, LinkedIn) */}
        <meta property="og:title" content={branch.name} />
        <meta property="og:description" content={branch.description} />
        <meta property="og:image" content={branch.logo || defaultImage.src} />
        <meta property="og:url" content={restaurantUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={branch.name} />
        <meta
          name="twitter:description"
          content={branch.description || 'Great place to enjoy food!'}
        />
        <meta name="twitter:image" content={branch.logo} />

        {/* Schema Markup (Google SEO) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: branch.name,
            image: branch.logo || defaultImage.src,
            address: {
              '@type': 'PostalAddress',
              streetAddress: branch.address,
              // addressLocality: branch.city || '',
              // addressRegion: branch.state || '',
              // postalCode: branch.zipcode || '',
              addressCountry: 'MN',
            },
            telephone: branch.phone || '',
            servesCuisine: branch.type,
            priceRange: branch.rate || '$',
            url: restaurantUrl,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: branch.star || 0,
              reviewCount: branch.totalReviews || 0,
            },
          })}
        </script>
      </Head>

      <div className="relative z-0 w-full overflow-x-hidden flex gap-3 h-96 sm:rounded-xl sm:h-64">
        <Image
          id="restaurant-image"
          alt={`${branch.name} exterior view`}
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
          <h1 className="text-xl sm:text-2xl font-medium mb-2 truncate sm:w-full">{branch.name}</h1>
          <div className="hidden xl:flex ml-auto gap-3">
            <ReviewForm />
            <ShareModal />
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full md:h-[256px]">
        <div className="flex flex-col gap-3 px-5 sm:px-2 w-full md:w-[450px]">
          <div className="flex gap-1 items-center">
            <Icons.star className="h-5 text-current-2" />
            <div className="font-medium opacity-75 text-secondary-text">{branch.star}</div>
            <div className="font-medium text-nowrap opacity-75 text-secondary-text">
              ({branch.totalReviews ?? 0} <I18Translate>Rating</I18Translate>)
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <Icons.navigation className="h-5 text-current-2" />
            <div className="font-medium text-secondary-text opacity-75">
              {calculateDistance(+distance?.toFixed(2) || 0)}
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
