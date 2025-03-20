'use client';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/general';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ChangeEmail: React.FC<Props> = ({ onClose, visible }) => {
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
