'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Signin, Signup } from './tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { PAGE_HOME } from '@/lib/constant';
import { cn } from '@/lib/utils';

type TabItems = 'signin' | 'signup' | 'forgot';

export interface ChildProps {
  tab: TabItems;
  setTab: React.Dispatch<React.SetStateAction<TabItems>>;
  nextPath?: string;
  goBack?: boolean;
}

const Page = () => {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? PAGE_HOME;
  const goBack = searchParams.get('back');
  const [tab, setTab] = useState<TabItems>((searchParams.get('page') as TabItems) ?? 'signin');
  const { t } = useTranslation();

  return (
    <div className="bg-background my-5 sm:mb-0 py-4 px-5 w-full flex justify-center items-center mx-auto">
      <Tabs value={tab} className="h-full w-full flex justify-center items-center">
        <TabsList
          className={cn(
            'grid w-full bg-current-1 h-14 p-2 max-w-96',
            tab === 'forgot' ? 'grid-cols-1' : 'grid-cols-2',
          )}
        >
          {tab !== 'forgot' && (
            <>
              <TabsTrigger
                value="signin"
                onClick={() => setTab('signin')}
                className="h-full text-base  py-2"
              >
                {t('login')}
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                onClick={() => setTab('signup')}
                className="h-full text-base   py-2 "
              >
                {t('signup')}
              </TabsTrigger>
            </>
          )}
        </TabsList>
        <div className="w-full max-w-96 mx-auto">
          <TabsContent value="signin" className="h-full w-full mt-4">
            <Signin setTab={setTab} goBack={Boolean(goBack)} nextPath={nextPath} tab={tab} />
          </TabsContent>
          <TabsContent value="signup" className="h-full w-full mt-4">
            <Signup setTab={setTab} goBack={Boolean(goBack)} nextPath={nextPath} tab={tab} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;
