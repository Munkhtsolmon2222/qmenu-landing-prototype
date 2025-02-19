import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ChangeEmail: React.FC<Props> = ({ onClose, visible }) => {
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="px-3">
          <DialogTitle className="text-start"> солих</DialogTitle>
        </DialogHeader>
        <div></div>
        <DialogFooter className="px-3 flex">
          <Button type="submit" className="" onClick={() => {}}>
            <span className="text-white">Үргэлжлүүлэх</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmail;
