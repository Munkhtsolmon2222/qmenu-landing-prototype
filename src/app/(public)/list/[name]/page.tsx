import { withSuspense } from '@/lib/helpers';
import { ListSkeleton } from '../components';
import { ChannelList, DrawerFilter, FilterControl } from '@/components/shared';
import { PAGE_LIST } from '@/lib/constant';
import { ParamFilter, ParamFilterObjType } from '@/lib/types';
import { GET_ES_CHANNELS, getPositionStorage } from '@/actions';

interface Props {
  params: Promise<{ name: string }>;
  searchParams: Promise<ParamFilterObjType>;
}

const limit = 40;

const Page: React.FC<Props> = async ({ params, ...props }) => {
  const { name: paramName } = await params;
  const name = decodeURIComponent(paramName);
  const backPath = PAGE_LIST + '/' + name;
  const position = await getPositionStorage();
  const { lat, lon } = position;

  const searchParams = await props.searchParams;

  const awaitedSearchParams = { ...(searchParams ?? {}), [ParamFilter.WEB]: [name] };

  const { data: { channels = [] } = {} } = await GET_ES_CHANNELS({
    lat,
    lon,
    params: awaitedSearchParams,
    limit,
    offset: 0,
    distance: '10km',
  });

  return (
    <>
      <div className="flex items-center gap-3 justify-start">
        <DrawerFilter
          backPath={backPath}
          className="w-max"
          accept={[
            ParamFilter.CUISINE,
            ParamFilter.TAG,
            ParamFilter.PRICE,
            ParamFilter.SERVICES,
            ParamFilter.TYPE,
            ParamFilter.REVIEW,
          ]}
        />
        <FilterControl className="mb-0" backPath={backPath} />
      </div>

      <ChannelList
        loaderClassName="my-20"
        initialData={channels}
        position={position}
        searchParams={awaitedSearchParams}
        limit={limit}
      />
      <br />
    </>
  );
};

export default withSuspense(Page, <ListSkeleton />);
