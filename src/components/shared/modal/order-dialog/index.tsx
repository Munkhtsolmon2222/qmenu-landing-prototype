'use client';
import { useEffect } from 'react';
import Container from './Container';
import Header from './Header';
import Footer from './Footer';
import { useMediaQuery } from '@/lib/hooks';
import { Sheet, SheetContent } from '@/components/ui';
import { Dialog, DialogContent } from '@/components/ui/dialog'; // do not import from 'components/general/dialog' because it is not the same component

interface Props extends React.PropsWithChildren {
  visible: boolean;
  onClose: () => void;
}

const Wrapper: React.FC<Props> = ({ children, visible, onClose }) => {
  const { device } = useMediaQuery();

  useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector('.lucide.lucide-x.size-4');
      if (element) element.classList.add('size-6');
    }, 120);
  }, [visible]);

  if (device === 'mobile') {
    return (
      <Dialog open={visible} onOpenChange={onClose}>
        <DialogContent className="p-0 h-full max-w-full rounded-none flex flex-col">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={visible} onOpenChange={onClose}>
      <SheetContent className="p-0 h-full flex flex-col">{children}</SheetContent>
    </Sheet>
  );
};

const OrderDialog: React.FC<Props> & {
  Footer: typeof Footer;
  Header: typeof Header;
  Container: typeof Container;
} = (props) => <Wrapper {...props} />;

OrderDialog.Header = Header;
OrderDialog.Container = Container;
OrderDialog.Footer = Footer;

export { OrderDialog };
