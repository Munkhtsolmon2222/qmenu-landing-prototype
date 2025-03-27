import { withSuspense } from '@/lib/helpers';
import { FiltersSkeleton } from '../Loaders';
import { HomeFilters } from './HomeFilters';
import { TagType } from '@/lib/types';
import { GET_TAGS_BY_TYPE } from '@/actions';

interface Props {}

const Component: React.FC<Props> = async ({}) => {
  const { data: tags = [] } = await GET_TAGS_BY_TYPE(TagType.K);

  return <HomeFilters tags={tags} />;
};

export const ChannelFilters = withSuspense(Component, <FiltersSkeleton />);
