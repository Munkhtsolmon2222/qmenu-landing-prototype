'use client';
import { Branch, ParamFilter, Timetable } from '@/lib/types';
import defaultImage from '@/assets/images/restaurant.png';
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Fragment, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import fbLogo from '@/assets/images/fb.png';
import igLogo from '@/assets/images/insta.png';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/general';
import { PAGE_LIST, PAGE_MAP } from '@/lib/constant';
import Image from 'next/image';

interface Props {
  branch: Branch;
}

const daysFull = [
  {
    key: 'sun',
    name: 'Ням',
  },
  {
    key: 'mon',
    name: 'Даваа',
  },
  {
    key: 'tue',
    name: 'Мягмар',
  },
  {
    key: 'wed',
    name: 'Лхагва',
  },
  {
    key: 'thu',
    name: 'Пүрэв',
  },
  {
    key: 'fri',
    name: 'Бямба',
  },
  {
    key: 'sat',
    name: 'Даваа',
  },
];

const AboutTab = ({ branch }: Props) => {
  const router = useRouter();
  const [copied, setCopied] = useState<string>();
  const { t, i18n } = useTranslation();
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(undefined), 1000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!branch) return <></>;

  return (
    <>
      <Wrapper className="xl:grid-cols-1">
        <Container title="Тухай">
          <div className="text-secondary-text opacity-75 line-clamp-3">{branch.description}</div>
          {branch.tags && branch.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-1 items-center">
              {branch.tags.map((e, index) => {
                const Icon = e.icon ? Icons[e.icon as keyof typeof Icons] : undefined;
                return (
                  <Badge
                    onClick={() => router.push(`${PAGE_LIST}?${ParamFilter.TAG}=${e.name}`)}
                    key={index}
                    variant="secondary"
                    className="font-medium cursor-pointer py-2"
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="w-5 h-5" />}
                      {e.name}
                    </div>
                  </Badge>
                );
              })}
            </div>
          )}
        </Container>
      </Wrapper>

      <Wrapper>
        <Container title="Холбоо барих">
          <div className="flex flex-col gap-5">
            <div className="gap-3 flex flex-col">
              {branch.phone && (
                <div className="flex gap-3 items-center">
                  <div className="bg-background border-2 border-current-2 opacity-85 w-9 h-9 flex items-center justify-center rounded-full text-current-2 cursor-pointer">
                    <Icons.phone className="h-[20px] w-[20px]" />
                  </div>
                  <div>{branch.phone}</div>
                  <TooltipProvider>
                    <Tooltip open={branch.phone === copied}>
                      <TooltipTrigger asChild>
                        <Icons.copy
                          className="w-4 h-4 min-w-4 min-h-4 cursor-pointer hover:text-gray-600"
                          onClick={() => handleCopy(branch.phone)}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="text-green-500">Copied</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              {branch.email && (
                <div className="flex gap-3 items-center">
                  <div className="bg-background border-2 border-current-2 opacity-85 w-9 h-9 flex items-center justify-center rounded-full text-current-2 cursor-pointer">
                    <Icons.mail className="h-[20px] w-[20px]" />
                  </div>
                  <div
                    className="hover:underline cursor-pointer"
                    onClick={() => {
                      window.location.href = `mailto:${branch.email}`;
                    }}
                  >
                    {branch.email}
                  </div>
                  <TooltipProvider>
                    <Tooltip open={branch.email === copied}>
                      <TooltipTrigger asChild>
                        <Icons.copy
                          className="w-4 h-4 min-w-4 min-h-4 cursor-pointer hover:text-gray-600"
                          onClick={() => handleCopy(branch.email)}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="text-green-500">Copied</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>

            <div className="border-t" />

            <div className="flex gap-3">
              <Image
                alt="facebook"
                width={50}
                height={50}
                src={fbLogo}
                className="w-10 h-10 rounded-md cursor-pointer"
                onClick={() => branch.facebook && window.open(branch.facebook, '_blank')}
              />
              <Image
                alt="instagram"
                src={igLogo}
                width={50}
                height={50}
                className="w-10 h-10 rounded-md cursor-pointer"
                onClick={() => branch.instagram && window.open(branch.instagram, '_blank')}
              />
            </div>
          </div>
        </Container>

        <Container title="Цагийн хуваарь">
          {daysFull.map((day, i) => {
            let isOpen = branch.timetable?.[day.key as keyof Timetable];
            const open =
              (branch.timetable?.[`${day.key}Open` as keyof Timetable] as string) ?? '00:00';
            const close =
              (branch.timetable?.[`${day.key}Close` as keyof Timetable] as string) ?? '00:00';

            isOpen = typeof isOpen === 'boolean' ? isOpen : true;

            return (
              <Fragment key={i}>
                <Item title={day.name}>
                  {!isOpen ? (
                    <span className="block">{t('Closed')}</span>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <div className="text-nowrap text-center min-w-12">{open}</div>
                      <div className="text-nowrap">-</div>
                      <div className="text-nowrap text-center min-w-12">{close}</div>
                    </div>
                  )}
                </Item>
              </Fragment>
            );
          })}
        </Container>
      </Wrapper>

      <Wrapper className="grid sm:hidden">
        <Container
          title={
            <div className="flex justify-between">
              <div className="font-medium"> {t('Address')}</div>
              <div
                className="cursor-pointer text-current-2"
                onClick={() => router.push(PAGE_MAP + '?branch=' + branch.id)}
              >
                {t('View on map')}
              </div>
            </div>
          }
        >
          {branch.latitude && branch.longitude && (
            <div className="mb-2 w-full h-64 rounded-lg overflow-hidden">
              <Map
                mapId="d34c272a99808261"
                defaultZoom={18}
                defaultCenter={{
                  lat: branch.latitude,
                  lng: branch.longitude,
                }}
                gestureHandling={'greedy'}
              >
                <AdvancedMarker position={{ lat: branch.latitude, lng: branch.longitude }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    className="fill-red-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="m23.08 44.702l.14.08l.056.032a1.52 1.52 0 0 0 1.446 0l.056-.03l.142-.082q.182-.106.51-.305c.434-.266 1.048-.66 1.78-1.178a39.2 39.2 0 0 0 5.364-4.564c3.888-3.98 7.926-9.96 7.926-17.654a16.5 16.5 0 0 0-33 0c0 7.694 4.038 13.674 7.926 17.654a39.2 39.2 0 0 0 5.364 4.564a34 34 0 0 0 2.29 1.484M24 27a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
                      clipRule="evenodd"
                    />
                    <defs>
                      <clipPath id="circleView">
                        <circle cx="24" cy="21" r="14" />
                      </clipPath>
                    </defs>
                    <image
                      href={branch.logo ?? defaultImage}
                      x="8"
                      y="6"
                      className="w-8 h-8"
                      clipPath="url(#circleView)"
                    />
                  </svg>
                </AdvancedMarker>
              </Map>
            </div>
          )}
        </Container>
      </Wrapper>

      <div className="sm:h-10 h-20" />
    </>
  );
};

interface ItemProps extends React.PropsWithChildren {
  icon?: keyof typeof Icons;
  title?: string;
  className?: string;
  onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({ children, title, className, onClick }) => {
  return title ? (
    <div
      className={cn('grid grid-cols-3 items-center w-full', className)}
      onClick={() => onClick?.()}
    >
      <div className="text-secondary-text opacity-75 line-clamp-3">{title}</div>
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};

const Container: React.FC<
  React.PropsWithChildren<{ title: React.ReactNode; className?: string }>
> = ({ children, className, title }) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <div className="font-medium my-3 border-border border-b pb-3">{title}</div>
    {children}
  </div>
);

const Wrapper: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <div className={cn('grid grid-cols-1 gap-3 xl:gap-10 xl:grid-cols-2 my-3', className)}>
    {children}
  </div>
);

export default AboutTab;
