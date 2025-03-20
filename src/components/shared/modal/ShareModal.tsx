'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
} from '@/components/general';
import { useTranslation } from 'react-i18next';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  TelegramIcon,
  TelegramShareButton,
} from 'react-share';

interface Props extends React.PropsWithChildren {
  url?: string;
  title?: string;
}

export const ShareModal: React.FC<Props> = ({ url, title, children }) => {
  const shareUrl = url ?? 'https://qmenu.mn';
  const { t } = useTranslation();

  return (
    <Dialog>
      {children ?? (
        <DialogTrigger className="group flex gap-2 rounded-xl py-2 items-center px-5 bg-primary-foreground cursor-pointer select-none">
          <Icons.upload className="w-5 h-5 min-w-5 min-h-5 text-primary" />
          <div className="text-nowrap">{t('Share')}</div>
        </DialogTrigger>
      )}
      <DialogContent className="rounded-xl pt-4 px-4 w-[calc(100%_-_30px)]">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-lg font-medium">{t('Share')}</DialogTitle>
        </DialogHeader>
        <div className="rounded-xl flex gap-2 justify-around">
          <FacebookShareButton url={shareUrl} hashtag={title}>
            <FacebookIcon className="rounded-full h-14 w-14" />
          </FacebookShareButton>
          {/* <FacebookMessengerShareButton
              url={shareUrl}
              appId=""
              children={
                <FacebookMessengerIcon className="rounded-full h-14 w-14" />
              }
            /> */}
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon className="rounded-full h-14 w-14" />
          </TwitterShareButton>

          <ViberShareButton title={title} url={shareUrl}>
            <ViberIcon className="rounded-full h-14 w-14" />
          </ViberShareButton>

          <TelegramShareButton title={title} url={shareUrl}>
            <TelegramIcon className="rounded-full h-14 w-14" />
          </TelegramShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
