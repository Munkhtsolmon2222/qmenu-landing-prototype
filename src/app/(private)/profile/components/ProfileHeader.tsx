'use client';
import { Icons } from '@/components/general';
import { HeaderItemWrapper, HeaderWrapper } from '@/components/shared';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';

interface Props {}

const themeIcons: Record<string, React.ReactNode> = {
  light: <Icons.sun />,
  dark: <Icons.moon />,
  system: <Icons.laptopMinimal />,
};

export const ProfileHeader: React.FC<Props> = ({}) => {
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
