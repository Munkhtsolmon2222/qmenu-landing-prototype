import type React from 'react';

interface FeatureIconProps {
  title: string;
  imgSrc: string;
  position?: 'left' | 'right' | 'center';
}

export default function SolutionIcon({ title, imgSrc, position = 'center' }: FeatureIconProps) {
  if (position === 'left') {
    return (
      <div className="flex items-center gap-4 justify-end">
        <div className="text-right">
          <h3 className="font-medium uppercase text-[14px]">{title}</h3>
        </div>
        {imgSrc && (
          <div className="flex h-fit w-fit shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
            <img src={imgSrc} className="size-[50px] p-2" />
          </div>
        )}
      </div>
    );
  }

  if (position === 'right') {
    return (
      <div className="flex items-center gap-4">
        {imgSrc && (
          <div className="flex h-fit w-fit shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
            <img src={imgSrc} className="size-[50px] p-2" />
          </div>
        )}
        <div>
          <h3 className="font-medium uppercase text-[14px]">{title}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border bg-background shadow-sm mb-3">
        {imgSrc && <img src={imgSrc} className="size-[50px] p-2" />}
      </div>
      <h3 className="font-medium uppercase text-[14px]">{title}</h3>
    </div>
  );
}
