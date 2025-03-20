'use client';
import { useEffect, useRef, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export const useItemMediaQuery = (): [React.RefObject<HTMLDivElement | null>, Dimensions] => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        const { offsetWidth: width, offsetHeight: height } = ref.current;
        setDimensions({ width, height });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return [ref, dimensions];
};
