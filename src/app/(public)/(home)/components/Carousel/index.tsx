import { BranchList, Tag } from '@/lib/types';
import { CarouselHeader } from './Header';
import { BranchCarousel, EventCarousel } from '@/components/shared';

interface Props {
  item: BranchList;
  tags: Tag[];
}

export const HomeCarousel: React.FC<Props> = ({ item, tags }) => {
  const tag = tags.find((tag) => tag.name === item.name);

  const events = item.events ?? [];
  const branches = item.branches ?? [];

  if (branches.length === 0 && events.length === 0) return null;

  return (
    <>
      <CarouselHeader name={item.name} icon={tag?.icon} />
      {branches.length > 0 && <BranchCarousel branches={branches} />}
      {events.length > 0 && <EventCarousel events={events} />}
    </>
  );
};
