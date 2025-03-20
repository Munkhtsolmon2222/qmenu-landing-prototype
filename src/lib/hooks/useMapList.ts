'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from './use-media-query';
import { CENTER } from '../constant';

export const useMapList = (branches: any) => {
  const { device } = useMediaQuery();
  const searchParams = useSearchParams();
  const params = searchParams.get('type');
  const branch = searchParams.get('branch');
  const [position, setPosition] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({ lat: null, lng: null });
  const local = typeof window !== 'undefined' ? localStorage?.getItem('position') : null;
  const resRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const index = target?.dataset?.index;
            if (index) {
              const branch = branches.find((e: any) => e?.id === index);

              if (local) {
                const position = JSON.parse(local);
                setCenter({
                  lat: position.latitude,
                  lng: position.longitude,
                });
                setPosition({
                  lat: position.latitude,
                  lng: position.longitude,
                });
              } else {
                setCenter({
                  lat: branch.latitude,
                  lng: branch.longitude,
                });
              }
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      },
    );
    resRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });
    const currentRefs = resRefs.current;
    currentRefs.forEach((img) => {
      if (img) observer.observe(img);
    });
  }, [branches, local]);

  useEffect(() => {
    const location = localStorage?.getItem('position');

    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setPosition({
            lat: CENTER.lat,
            lng: CENTER.long,
          });
          setLoading(false);
        },
      );
    } else {
      setPosition({
        lat: JSON.parse(location).latitude,
        lng: JSON.parse(location).longitude,
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const found = branches.find((e: any) => e?.id === branch);
    if (found) {
      setCenter({
        lat: found?.latitude,
        lng: found?.longitude,
      });
    }
  }, [branch, branches]);

  return {
    params,
    position,
    device,
    resRefs,
    center,
    loading,
  };
};
