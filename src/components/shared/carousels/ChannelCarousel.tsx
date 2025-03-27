import { RCarousel, RCarouselContent, RCarouselItem } from '@/components/general';
import { RestaurantGridCard } from '@/components/shared';
import { EsChannel } from '@/lib/types';

interface Props {
  channels: EsChannel[];
}

export const ChannelCarousel: React.FC<Props> = ({ channels }) => {
  return (
    <RCarousel scrollWidth={300}>
      <RCarouselContent className="gap-3 pt-1 pb-5">
        {channels.map((channel, index) => (
          <RCarouselItem key={index}>
            <RestaurantGridCard index={index} place={channel} key={index} services />
          </RCarouselItem>
        ))}
      </RCarouselContent>
    </RCarousel>
  );
};
