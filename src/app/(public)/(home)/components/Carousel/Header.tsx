'use client';
import { Translate } from '@/components/shared';
import { PAGE_LIST, webTagIcons } from '@/lib/constant';
import { useNavbar } from '@/lib/providers';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface Props {
  name: string;
  icon?: string;
}

export const CarouselHeader: React.FC<Props> = ({ name, icon }) => {
  const { t } = useTranslation();
  const { show } = useNavbar();

  const getListTitle = () => {
    if (!icon) return <Translate>{name}</Translate>;

    const renderIcon = webTagIcons[icon as keyof typeof webTagIcons];
    if (!renderIcon) return <Translate>{name}</Translate>;

    return (
      <div className="flex text-nowrap items-center justify-center gap-1 text-lg">
        <Image
          width={256}
          height={144}
          alt={name}
          src={renderIcon.src}
          className="h-7 w-full max-w-28 max-h-7 object-cover rounded-lg"
        />
        <div className="text-sm sm:text-base">
          <Translate>-тэй ресторанууд</Translate>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'sticky z-40 py-1 bg-background mb-1 duration-500',
        show ? 'top-[120px] md:top-[135px]' : 'top-[55px]',
      )}
    >
      <div className="flex items-center justify-between max-w-[90rem]">
        <h1 className="font-medium text-lg xl:text-xl">{getListTitle()}</h1>
        <Link href={`${PAGE_LIST}/${name}`} legacyBehavior>
          <a className="text-current-2 text-sm text-end font-medium z-50">{t('All')}</a>
        </Link>
      </div>
    </div>
  );
};
