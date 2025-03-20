import { RCarousel, RCarouselContent, RCarouselItem } from '@/components/general';
import { RestaurantGridCard } from '@/components/shared';
import { BranchDetail } from '@/lib/types';

interface Props {
  branches: BranchDetail[];
}

export const BranchCarousel: React.FC<Props> = ({ branches }) => {
  return (
    <RCarousel scrollWidth={300}>
      <RCarouselContent className="gap-3 pt-1 pb-5">
        {branches.map((branch, index) => (
          <RCarouselItem key={index}>
            <RestaurantGridCard index={index} place={branch} key={index} services />
          </RCarouselItem>
        ))}
      </RCarouselContent>
    </RCarousel>
  );
};
