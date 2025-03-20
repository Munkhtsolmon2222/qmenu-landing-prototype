import { FILTER_BRANCHES, GET_TAGS_BY_TYPE } from '@/actions';
import { DrawerFilter, FilterControl, Loader } from '@/components/shared';
import { PAGE_MAP, POSITION } from '@/lib/constant';
import { withSuspense } from '@/lib/helpers';
import { ParamFilter, ParamFilterObjType, TagType } from '@/lib/types';
import { cookies } from 'next/headers';
import { ListBranches } from './components/ListBranches';
import { CarouselBranches } from './components/CarouselBranches';
import { MapFilterContent } from './components/MapFilterContent';
import { getAsArray } from '@/lib/utils';

const acceptFilters = [
  ParamFilter.CUISINE,
  ParamFilter.TAG,
  ParamFilter.PRICE,
  ParamFilter.SERVICES,
  ParamFilter.TYPE,
  ParamFilter.REVIEW,
];

interface Props {
  searchParams: Promise<ParamFilterObjType>;
}

const Page: React.FC<Props> = async (props) => {
  const cookie = await cookies();

  const positionStr = cookie.get(POSITION)?.value;
  if (!positionStr) return <Loader className="h-screen" />;

  const position = JSON.parse(positionStr);
  const { lat, lon: lng } = position;

  let searchParams = await props.searchParams;

  const filters = Object.entries(searchParams).reduce((res: string[], [_, value]) => {
    res = [...res, ...getAsArray(value)];
    return res;
  }, []);

  const { data = [] } = await FILTER_BRANCHES({
    lat,
    lon: lng,
    filters,
    limit: 1000,
    offset: 0,
    distance: '20km',
  });

  const { data: cuisineTags = [] } = await GET_TAGS_BY_TYPE(TagType.K);
  const { data: advantageTags = [] } = await GET_TAGS_BY_TYPE(TagType.F);
  const { data: categories = [] } = await GET_TAGS_BY_TYPE(TagType.C);

  const tags = { categories, cuisineTags, advantageTags };

  return (
    <>
      <DrawerFilter
        backPath={PAGE_MAP}
        accept={acceptFilters}
        className="fixed md:hidden top-[75px] left-2"
      />
      <FilterControl
        className="p-2 fixed md:sticky top-[75px] sm:top-[84px] md:bg-background md:rounded-full mx-2 z-50 md:shadow left-12 sm:left-0 w-[calc(100%-60px)]"
        backPath={PAGE_MAP}
        clearButtonClassName="bg-background rounded-full px-2"
      />
      <div className="grid grid-cols-1 md:grid-cols-7 border">
        <MapFilterContent tags={tags} accept={acceptFilters} />
        <ListBranches branches={data} lat={lat} lng={lng} />
        <CarouselBranches branches={data} lat={lat} lng={lng} />
      </div>
    </>
  );
};

export default withSuspense(Page, <Loader className="h-screen" />);
