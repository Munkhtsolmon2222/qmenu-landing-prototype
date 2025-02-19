import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
interface Props {
  images: string[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const Photos: React.FC<Props> = ({
  images = [],
  visible,
  setVisible,
  index,
  setIndex,
}) => {
  const Images = images.map((img, index) => (
    <Image
      width={100}
      height={100}
      key={index}
      src={img}
      alt="images"
      className="mx-auto "
    />
  ));

  return (
    <>
      <Dialog onOpenChange={setVisible} open={visible}>
        <DialogContent className="w-full h-full !rounded-none p-0">
          <div className="w-full h-full flex items-center justify-center relative select-none">
            <div
              className="absolute top-1 right-1 p-2 bg-gray-50 rounded-full shadow-md z-50 cursor-pointer opacity-60"
              onClick={() => setVisible(false)}
            >
              <Icons.x />
            </div>
            {index > 0 && (
              <div
                className="h-[calc(100%_-_200px)] mt-[100px] mb-[100px] flex items-center absolute top-0 left-1"
                onClick={() => setIndex(index - 1)}
              >
                <Button
                  size="icon"
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full opacity-60 bg-background text-primary hover:bg-background"
                  variant="outline"
                >
                  <ChevronLeft className="cursor-pointer" />
                </Button>
              </div>
            )}
            <div className="w-full mx-auto">{Images[index]}</div>
            {index < images.length - 1 && (
              <div
                className="h-[calc(100%_-_200px)] mt-[100px] mb-[100px] flex items-center absolute top-0 right-1"
                onClick={() => setIndex(index + 1)}
              >
                <Button
                  size="icon"
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full opacity-60 bg-background text-primary hover:bg-background"
                  variant="outline"
                >
                  <ChevronRight className="cursor-pointer" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
