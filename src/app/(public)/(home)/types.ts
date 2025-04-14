import { PositionStorage } from '@/lib/providers';
import { ParamFilterObjType } from '@/lib/types';

export interface HomeProps {
  position: PositionStorage;
  searchParams: Promise<ParamFilterObjType>;
  awaitedSearchParams?: ParamFilterObjType;
}
