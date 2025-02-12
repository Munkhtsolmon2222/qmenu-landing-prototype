import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
import { useTranslation } from "react-i18next";
interface Props {
  onClose: () => void;
  visible: boolean;
  url?: string;
  title?: string;
}

export const ShareModal: React.FC<Props> = ({
  onClose,
  visible,
  url,
  title,
}) => {
  const shareUrl = url ?? "https://qmenu.mn";
  const { t } = useTranslation();
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="rounded-xl pt-4 px-4 w-[calc(100%_-_30px)]">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-lg font-medium">
            {t("Share")}
          </DialogTitle>
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
