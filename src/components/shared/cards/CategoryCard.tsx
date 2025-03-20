import { categoryItems } from '@/lib/constant';
import { Translate } from '../translator';
import Image from 'next/image';

interface Props {
  name: string;
  icon?: string;
}

export const CategoryCard: React.FC<Props> = ({ icon = '', name }) => {
  const Icon = categoryItems[icon];
  if (!Icon) return;

  return (
    <div className="p-1 z-50 text-sm md:text-base hover:scale-[1.07] transition-all duration-200 hover:font-medium">
      <div className="rounded-lg flex justify-center secondary-text items-center">
        <Image width={40} height={40} className="object-contain w-10 h-10" alt={icon} src={Icon} />
      </div>
      <div className="text-nowrap text-[13px] gap-3 flex text-center">
        <Translate>{name}</Translate>
      </div>
    </div>
  );
};
