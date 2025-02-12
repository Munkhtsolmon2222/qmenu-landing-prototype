import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";

interface ImgProps {
  src: string | StaticImageData;
  className?: string;
  alt: string;
}

export const Img1 = ({ src, className, alt, ...props }: ImgProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("relative", className)}>
      {loading && (
        <div className="absolute top-0 left-0">
          <LoaderIcon className="animate-spin text-current" />
        </div>
      )}
      <Image
        className="w-full h-auto object-cover"
        onLoad={() => setLoading(false)}
        src={src}
        alt={alt}
        loading="lazy"
        {...props}
      />
    </div>
  );
};
