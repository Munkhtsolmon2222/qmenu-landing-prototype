'use client';
import { useRouter } from 'next/navigation';
import { useAction, useMediaQuery } from '@/lib/hooks';
import { SelectLanguage } from '@/components/shared';
import { Button, Icons } from '@/components/general';
import { PAGE_PROFILE } from '@/lib/constant';
import { Avatar, AvatarFallback } from '@/components/ui';
import { GET_CURRENT_CUSTOMER } from '@/actions';
import nProgress from 'nprogress';

export function ProfileButtons() {
  const { device } = useMediaQuery();
  const { data: customer, loading } = useAction(GET_CURRENT_CUSTOMER);
  const router = useRouter();

  const navigate = (path: string) => {
    nProgress.start();
    router.push(path);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-max">
      <SelectLanguage className="min-w-max" />
      {device !== 'mobile' && (
        <Icons.notePad
          className="h-6 w-6 cursor-pointer text-current-2"
          onClick={() => navigate('/orders')}
        />
      )}
      {device !== 'mobile' && (
        <Button
          className="rounded-full bg-transparent hover:bg-transparent px-0"
          onClick={() => navigate(PAGE_PROFILE)}
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className={` text-xs ${
                !loading ? 'bg-current-2 text-white' : 'bg-primary-foreground'
              }`}
            >
              {(customer?.firstName ?? '').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      )}
    </div>
  );
}
