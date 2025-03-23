'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/lib/hooks';
import { useTranslation } from 'react-i18next';
import { PAGE_LOGIN } from '@/lib/constant';
import { SelectLanguage } from '@/components/shared';
import { Button } from '@/components/general';
import nProgress from 'nprogress';

export const AuthButtons = ({ height: paramHeight = 400 }: { height?: number }) => {
  const { device } = useMediaQuery();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const height = device === 'mobile' ? 177 : paramHeight;
      setScrolled(offset > height);
    };

    const optimizedScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', optimizedScrollHandler);
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
    };
  }, [device]);

  const navigateToPage = (page: string) => {
    nProgress.start();
    const searchParams = new URLSearchParams({ page }).toString();
    router.push(`${PAGE_LOGIN}?${searchParams}`);
  };

  return (
    <div className="flex items-center gap-2">
      <SelectLanguage className="min-w-max" />
      <div className="flex-row gap-2 hidden sm:flex">
        <Button
          variant="ghost"
          className="rounded-full cursor-pointer hover:text-current-2"
          onClick={() => navigateToPage('signin')}
        >
          {t('login')}
        </Button>
        <Button
          variant="outline"
          className={`rounded-full cursor-pointer ${
            scrolled ? 'bg-current-2' : 'bg-current-2'
          } border-current-2 text-white`}
          onClick={() => navigateToPage('signup')}
        >
          {t('signup')}
        </Button>
      </div>
    </div>
  );
};

export default AuthButtons;
