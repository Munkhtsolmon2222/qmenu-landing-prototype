import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useMediaQuery from "@/hooks/use-media-query";
import { useEffect } from "react";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";

interface Props extends React.PropsWithChildren {
  visible: boolean;
  onClose: () => void;
}

const Wrapper: React.FC<Props> = ({ children, visible, onClose }) => {
  const { device } = useMediaQuery();

  useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector(".lucide.lucide-x.size-4");
      if (element) element.classList.add("size-6");
    }, 120);
  }, [visible]);

  if (device === "mobile") {
    return (
      <Dialog open={visible} onOpenChange={onClose}>
        <DialogContent className="p-0 h-full flex flex-col">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={visible} onOpenChange={onClose}>
      <SheetContent className="p-0 h-full flex flex-col">
        {children}
      </SheetContent>
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

export default OrderDialog;
