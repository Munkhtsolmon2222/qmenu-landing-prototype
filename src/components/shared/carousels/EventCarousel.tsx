import { RCarousel, RCarouselContent, RCarouselItem } from '@/components/general';
import { IEvent } from '@/lib/types';
import { CarouselEventCard } from '../cards';
import { PAGE_EVENT } from '@/lib/constant';
import Link from 'next/link';

interface Props {
  events: IEvent[];
}

export const EventCarousel: React.FC<Props> = ({ events }) => {
  return (
    <RCarousel scrollWidth={300}>
      <RCarouselContent className="gap-3">
        {events.map((event, index) => (
          <RCarouselItem key={index}>
            <Link href={`${PAGE_EVENT}/${event.id}`}>
              <CarouselEventCard event={event} key={index} />
            </Link>
          </RCarouselItem>
        ))}
      </RCarouselContent>
    </RCarousel>
  );
};
