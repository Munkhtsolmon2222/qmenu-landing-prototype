'use client';
import { Icons } from '@/components/general';
import { HeaderItemWrapper, HeaderWrapper } from '@/components/shared';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { useTranslation } from 'react-i18next';

interface Props {}

const themeIcons: Record<string, React.ReactNode> = {
  light: <Icons.sun />,
  dark: <Icons.moon />,
  system: <Icons.laptopMinimal />,
};

export const LoginHeader: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setTheme, theme = 'light' } = useTheme();

  const onBack = () => {
    nProgress.start();
    router.back();
  };

  return (
    <HeaderWrapper className="flex justify-between items-center bg-background rounded-none border-0">
      <HeaderItemWrapper onClick={onBack} className="h-max bg-primary-foreground">
        <Icons.arrowLeft />
      </HeaderItemWrapper>
      <div className="w-full text-center text-lg my-2 text-secondary-text font-medium">
        {t('Hello! Welcome')}
      </div>
      <HeaderItemWrapper
        className="h-max bg-primary-foreground"
        onClick={() =>
          setTheme(theme === 'dark' ? 'system' : theme === 'system' ? 'light' : 'dark')
        }
      >
        {themeIcons[theme]}
      </HeaderItemWrapper>
    </HeaderWrapper>
  );
};
