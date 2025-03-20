'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Icons,
  Input,
} from '@/components/general';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type Props = React.PropsWithChildren<{
  value?: string | null;
  hideMobile?: boolean;
}>;

export const LocationWrapper: React.FC<Props> = ({ children, value, hideMobile }) => {
  const { device } = useMediaQuery();
  const { t } = useTranslation();

  if (device === 'mobile') {
    return (
      <Dialog>
        <Trigger
          mobile
          value={value || t('location')}
          active={Boolean(value)}
          hideMobile={hideMobile}
        />
        <DialogContent className="h-full p-0 flex flex-col gap-0">
          <DialogHeader className="flex items-center py-2">
            <div className="text-sm font-bold p-2 pt-1.5">{t('Enter your location')}</div>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <Trigger
        mobile={false}
        value={value ?? t('location')}
        active={Boolean(value)}
        hideMobile={hideMobile}
      />
      <DropdownMenuContent className="p-0">
        <DropdownMenuLabel>
          <div className="text-sm font-bold px-1 pt-1.5">{t('Enter your location')}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface TriggerProps {
  mobile: boolean;
  value: string;
  active?: boolean;
  hideMobile?: boolean;
}

const Trigger: React.FC<TriggerProps> = ({ mobile, value, active, hideMobile = true }) => {
  const InputItem = (
    <Input
      readOnly
      prefix={
        <Icons.pin
          className={cn(
            'h-7 w-7 group-hover:text-current-2 group-hover:fill-current-2',
            active && 'text-current-2 fill-current-2',
          )}
        />
      }
      value={value}
      suffix={
        <Icons.chevronDown
          className={cn(
            'h-5 w-5 group-hover:text-current-2',
            active && 'text-current-2',
            hideMobile && 'hidden sm:block',
          )}
        />
      }
      className={cn(
        'w-full rounded-full md:h-10 h-9 px-2 bg-background cursor-pointer hover:border-current-2 group',
        active && 'border-current-2',
      )}
      inputClassName={cn('text-center w-24 cursor-pointer', hideMobile && 'hidden sm:block')}
    />
  );

  if (mobile) return <DialogTrigger>{InputItem}</DialogTrigger>;
  return <DropdownMenuTrigger>{InputItem}</DropdownMenuTrigger>;
};
