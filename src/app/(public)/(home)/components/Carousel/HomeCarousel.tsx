import { EsQueryResult, Tag } from '@/lib/types';
import { CarouselHeader } from './Header';
import { ChannelCarousel, EventCarousel } from '@/components/shared';

interface Props {
  item: EsQueryResult;
  tags: Tag[];
}

export const HomeCarousel: React.FC<Props> = ({ item, tags }) => {
  const tag = tags.find((tag) => tag.name === item.name);

  const events = item.events ?? [];
  const channels = item.channels ?? [];

  if (channels.length === 0 && events.length === 0) return null;

  return (
    <>
      <CarouselHeader name={item.name ?? ''} icon={tag?.icon} />
      {channels.length > 0 && <ChannelCarousel channels={channels} />}
      {events.length > 0 && <EventCarousel events={events} />}
    </>
  );
};
