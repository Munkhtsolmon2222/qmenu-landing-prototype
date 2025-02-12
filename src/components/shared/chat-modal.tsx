import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Qmenu from "@/assets/favicon.ico";
import { Textarea } from "../ui/textarea";
import { SendIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  onClick: () => void;
  show: boolean;
}
export default function ChatModal(props: Props) {
  const { show, onClick } = props;

  return (
    <Dialog open={show} onOpenChange={onClick}>
      <DialogContent className="px-4 rounded-lg w-11/12">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-lg font-medium">Chat</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="min-h-[20vh] flex items-start justify-start overflow-auto px-2 py-3">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 p-1">
                  <AvatarImage src={Qmenu.src} />
                  <AvatarFallback>QM</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                  <p className="text-sm">Юу идмээр байна?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t px-4 py-3 flex items-center gap-2 w-full">
            <Textarea
              placeholder="Гоё хоолтой газар..."
              className="flex-1 resize-none rounded-lg border border-input p-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button>
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
