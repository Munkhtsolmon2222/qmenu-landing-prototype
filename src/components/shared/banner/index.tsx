import { BannerType } from '@/lib/constant';
import { SmartBanner as BannerComponent } from './banner';
import { Banner } from '@/lib/types';
import { shuffleArray } from '@/lib/utils';

interface Props {
  banners?: Banner[];
  types: BannerType[];
  empty?: boolean;
  dot?: boolean;
}

export const SmartBanner: React.FC<Props> = ({ banners, types, ...props }) => {
  if (!banners || banners.length < 1) return <></>;

  return (
    <BannerComponent
      {...props}
      types={types}
      banners={shuffleArray(banners.filter((item) => types.includes(item.type)))}
    />
  );
};
