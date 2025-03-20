import { TagType } from '@/lib/types';
import { withSuspense } from '@/lib/helpers';
import { CategoryCard } from '@/components/shared';
import { CategoriesSkeleton } from '../Loaders';
import { CategoryItemWrapper } from './CategoryItemWrapper';
import { GET_TAGS_BY_TYPE } from '@/actions';

interface Props {}

const Component: React.FC<Props> = async ({}) => {
  const { data: categories = [] } = await GET_TAGS_BY_TYPE(TagType.C);

  return (
    <div className="gap-4 mb-2 overflow-y-auto no-scrollbar w-full px-2 flex flex-row">
      {categories.map((place, index) => (
        <CategoryItemWrapper key={index} item={place}>
          <CategoryCard icon={place.icon} name={place.name} />
        </CategoryItemWrapper>
      ))}
    </div>
  );
};

export const Categories = withSuspense(Component, <CategoriesSkeleton count={12} />);
