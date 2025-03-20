'use client';
import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import MenuTab from './menu';
import ReviewTab from './review';
import AboutTab from './about-tab';
import GalleryTab from './gallery';
import EventTab from './event';
import { useTranslation } from 'react-i18next';
import { RestaurantProps } from '../../types';

export enum Tab {
  Event = 'Event',
  About = 'About',
  Menu = 'Menu',
  Gallery = 'Gallery',
  Review = 'Review',
}

interface Props extends RestaurantProps {}

export const RestaurantTabs: React.FC<Props> = ({ participant }) => {
  const { t } = useTranslation();

  const tabs = [
    {
      name: t('Menu'),
      value: Tab.Menu,
      content: <MenuTab participant={participant} />,
    },
    {
      name: t('About'),
      value: Tab.About,
      content: <AboutTab branch={participant.branch} />,
    },
    {
      name: t('Picture'),
      value: Tab.Gallery,
      content: <GalleryTab branch={participant?.branch} />,
    },
    {
      name: t('Rating'),
      value: Tab.Review,
      content: <ReviewTab branch={participant?.branch?.id} />,
    },
  ];

  if (participant.events && participant.events.length > 0) {
    tabs.unshift({
      name: t('Event'),
      value: Tab.Event,
      content: <EventTab participant={participant} />,
    });
  }

  const [selected, setSelected] = useState(tabs[0].value);

  return (
    <TabsComponent value={selected} className="relative mr-auto h-full w-full">
      <div id="restaurant-sticky-tab" className="px-4 sticky top-0 bg-background z-50">
        <div className="border-b w-full overflow-x-auto no-scrollbar bg-background px-3">
          <TabsList
            className="w-full bg-transparent justify-center h-16 rounded-none p-0"
            style={{ minWidth: 80 * tabs.length }}
          >
            {tabs.map((e, index) => {
              const active = selected === e.value;
              return (
                <TabsTrigger
                  key={index}
                  onClick={() => setSelected(e.value)}
                  value={e.value}
                  className="relative rounded-none border-b border-b-transparent text-base sm:text-lg bg-transparent w-full font-semibold text-muted-foreground transition-none focus-visible:ring-0 !shadow-none cursor-pointer group"
                >
                  <p
                    className={`font-medium group-hover:text-current-2 ${
                      active && 'text-current-2'
                    }`}
                  >
                    {e.name}
                  </p>
                  {active && (
                    <div className="bg-current-2 rounded-t-md h-1.5 w-full absolute -bottom-[16px] sm:-bottom-[14px]" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>
      {tabs.map((e, index) => (
        <TabsContent key={index} value={e.value} className="w-full h-full px-4">
          {e.content}
        </TabsContent>
      ))}
    </TabsComponent>
  );
};
