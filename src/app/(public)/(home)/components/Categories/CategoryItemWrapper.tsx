'use client';
import { PAGE_HOME } from '@/lib/constant';
import { updateParams } from '@/lib/helpers';
import { ParamFilter, Tag } from '@/lib/types';
import { redirectWithNProgress } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface Props extends React.PropsWithChildren {
  item: Tag;
}

export const CategoryItemWrapper: React.FC<Props> = ({ children, item }) => {
  const searchParams = useSearchParams();

  const onClick = () => {
    const params = updateParams(searchParams, ParamFilter.CATEGORY, item.name);
    redirectWithNProgress(`${PAGE_HOME}?${params.toString()}`);
  };

  return (
    <div className="cursor-pointer rounded-lg relative text-start" onClick={onClick}>
      {children}
    </div>
  );
};
