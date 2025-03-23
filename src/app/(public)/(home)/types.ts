import { ParamFilterObjType } from '@/lib/types';

export interface HomeProps {
  positionStr?: string;
  searchParams: Promise<ParamFilterObjType>;
  awaitedSearchParams?: ParamFilterObjType;
}
