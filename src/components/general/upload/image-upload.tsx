'use client';
import React, { useState } from 'react';
import { Button } from '../button';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';

interface Props {
  max?: number;
  className?: string;
  wrapperClassName?: string;
  value?: string[] | string;
  onChange?: (images?: string[] | string) => void;
  id?: string | number;
}

export const UploadImages: React.FC<Props> = ({
  max = 1,
  className,
  wrapperClassName,
  value,
  onChange,
  id,
}) => {
  const [images, setImages] = useState<(File | string)[]>(
    value ? (Array.isArray(value) ? value : [value]) : [],
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      const updatedImages = [...images, ...fileArray].slice(0, max);
      setImages(updatedImages);

      const uploadImages = updatedImages.map((file) =>
        typeof file === 'string' ? file : URL.createObjectURL(file),
      );
      onChange?.(uploadImages.length === 1 ? uploadImages[0] : uploadImages);
    }
  };

  const triggerFileInput = () => {
    document.getElementById(`file-upload${id ? '-' + id : ''}`)?.click();
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    const uploadImages = updatedImages.map((file) =>
      typeof file === 'string' ? file : URL.createObjectURL(file),
    );
    if (uploadImages.length === 0) return onChange?.(undefined);

    onChange?.(uploadImages.length === 1 ? uploadImages[0] : uploadImages);
  };

  const getGrid = () => {
    const length = images.length;
    if (length === 0) return 'grid-cols-1';
    if (length === 1) return max === 1 ? 'grid-cols-1' : 'sm:grid-cols-2';
    if (length === 2) return max === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';
    return 'sm:grid-cols-3';
  };

  return (
    <div
      className={cn(
        'p-2 rounded-md border border-border w-full grid gap-2 justify-start transition-all duration-200 grid-cols-1',
        getGrid(),
        wrapperClassName,
      )}
    >
      <input
        id={`file-upload${id ? '-' + id : ''}`}
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />

      {images.slice(0, max).map((image, index) => (
        <div
          key={index}
          className={cn(
            'w-full h-36 p-2 rounded-md border border-border group/upload relative cursor-pointer overflow-hidden',
            className,
          )}
          onClick={() => removeImage(index)}
        >
          <div className="w-full h-full absolute top-0 left-0 group-hover/upload:opacity-35 opacity-0 z-10 duration-200 bg-primary" />
          <Button
            onClick={() => removeImage(index)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/upload:opacity-100 opacity-0 duration-200 z-20 border-destructive bg-transparent hover:bg-transparent"
            type="button"
            variant="outline"
          >
            <Icons.trash className="text-destructive" />
          </Button>
          <img
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            alt={`upload-${index}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {images.length < max && (
        <Button
          variant="outline"
          className={cn('flex-full items-center justify-center w-full h-36 opacity-60', className)}
          type="button"
          onClick={triggerFileInput}
        >
          <Icons.upload />
          <span className="text-sm">Зураг оруулах</span>
        </Button>
      )}
    </div>
  );
};
