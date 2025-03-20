'use client';
import { useMediaQuery } from '@/lib/hooks';
import { Children, cloneElement, isValidElement, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from './carousel';
import { cn } from '@/lib/utils';
import { Button } from '../../general';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselApi, useCarousel } from './provider';

export interface RCarouselProps extends React.ComponentProps<typeof Carousel> {
  className?: string;
  arrows?: boolean;
  dots?: boolean;
  infinite?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  scrollWidth?: number;
  setApi?: (api: CarouselApi) => void;
  onChangeSelect?: (index: number) => void;
}

const RCarousel: React.FC<RCarouselProps> = ({
  children,
  className,
  arrows = true,
  scrollWidth,
  setApi,
  onChangeSelect,
  ...props
}) => {
  const { device } = useMediaQuery();
  const contentRef = useRef<HTMLDivElement>(null);

  const onNext = () => {
    if (!contentRef.current) return;
    contentRef.current.scrollTo({
      left: contentRef.current.scrollLeft + (scrollWidth ?? contentRef.current.offsetWidth),
      behavior: 'smooth',
    });
  };

  const onPrevious = () => {
    if (!contentRef.current) return;
    contentRef.current.scrollTo({
      left: contentRef.current.scrollLeft - (scrollWidth ?? contentRef.current.offsetWidth),
      behavior: 'smooth',
    });
  };

  const render = Children.map(children, (child) => {
    if (!isValidElement(child)) return null;
    return cloneElement(child, { isMobile: device === 'mobile', ref: contentRef } as any);
  });

  if (device === 'mobile') {
    return (
      <Carousel
        {...props}
        onChangeSelect={onChangeSelect}
        className={cn('relative', className)}
        setApi={setApi}
      >
        {render}
        {arrows && <Previous isMobile />}
        {arrows && <Next isMobile />}
      </Carousel>
    );
  }

  return (
    <div {...props} className={cn('relative w-full flex', className)}>
      {arrows && <Previous onClick={onPrevious} />}
      {render}
      {arrows && <Next onClick={onNext} />}
    </div>
  );
};

interface ButtonProps {
  isMobile?: boolean;
  onClick?: () => void;
}

export const Previous: React.FC<ButtonProps> = ({ isMobile, onClick }) => {
  const context = useCarousel();
  let disabled = false;

  if (isMobile) {
    if (!context) {
      throw new Error('useCarousel must be used within a <Carousel />');
    }

    onClick = context.scrollPrev;
    disabled = !context.canScrollPrev;
  }

  if (disabled) return <></>;

  return (
    <div
      className={cn('rounded absolute w-8 sm:w-10 top-0 z-20 h-full flex items-center left-0')}
      onClick={() => onClick?.()}
    >
      <Button
        size="icon"
        className="rounded-full w-7 h-7 sm:w-9 sm:h-9 opacity-60 bg-background text-primary hover:bg-background ml-auto"
        onClick={() => onClick?.()}
        disabled={disabled}
      >
        <ChevronLeft className="cursor-pointer w-4 h-4 sm:w-6 sm:h-6" />
      </Button>
    </div>
  );
};

export const Next: React.FC<ButtonProps> = ({ isMobile, onClick }) => {
  const context = useCarousel();
  let disabled = false;

  if (isMobile) {
    if (!context) {
      throw new Error('useCarousel must be used within a <Carousel />');
    }

    onClick = context.scrollNext;
    disabled = !context.canScrollNext;
  }

  if (disabled) return <></>;

  return (
    <div
      className={cn('rounded absolute top-0 z-20 w-8 sm:w-10 h-full flex items-center right-0')}
      onClick={() => onClick?.()}
    >
      <Button
        size="icon"
        className="rounded-full w-7 h-7 sm:w-9 sm:h-9 opacity-60 bg-background text-primary hover:bg-background mr-auto"
        onClick={() => onClick?.()}
      >
        <ChevronRight className="cursor-pointer w-4 h-4 sm:w-6 sm:h-6" />
      </Button>
    </div>
  );
};

interface ContentProps extends React.PropsWithChildren {
  isMobile: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement> | undefined;
}

const Content: React.FC<ContentProps> = ({ children, isMobile, className, ...props }) => {
  if (isMobile)
    return (
      <CarouselContent {...props} className={cn('px-[16px]', className)}>
        {children}
      </CarouselContent>
    );

  return (
    <div {...props} className={cn('flex w-full no-scrollbar overflow-x-auto', className)}>
      {children}
    </div>
  );
};

interface ItemProps extends React.PropsWithChildren {
  isMobile: boolean;
  className?: string;
}

const Item: React.FC<ItemProps> = ({ children, isMobile, className, ...props }) => {
  if (isMobile)
    return (
      <CarouselItem {...props} className={cn('', className)}>
        {children}
      </CarouselItem>
    );

  return (
    <div {...props} className={cn('', className)}>
      {children}
    </div>
  );
};

const RCarouselItem = Item as React.FC<Omit<ItemProps, 'isMobile'>>;
const RCarouselContent = Content as React.FC<Omit<ContentProps, 'isMobile'>>;

export { RCarousel, RCarouselContent, RCarouselItem }; // ResponsiveCarousel
