'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CENTER, POSITION } from '../constant';
import { useRouter } from 'next/navigation';
import { Welcome } from '@/components/shared';
import { getDistance as getUtilsDistance, calculateDistance } from '../utils';

export interface Position {
  lat: number;
  lon: number;
}

export interface PositionStorage extends Position {
  timestamp: number;
  name?: string;
}

export interface LocationContextType {
  handleSuccess: (
    item: { coords: { latitude: number; longitude: number } },
    name?: string,
    cb?: () => void,
  ) => void;
  handleError: () => void;
  getLocation: () => PositionStorage;
  getDistance: (distance?: number, lat?: number, lon?: number) => string;
}

export const LocationContext = createContext({} as LocationContextType);

export const LocationProvider = ({ children }: React.PropsWithChildren) => {
  const [position, setPosition] = useState(false);
  const router = useRouter();

  const refresh = () => {
    router.refresh();
    setPosition(true);
  };

  const getCookieStore = () => {
    return document.cookie.split('; ').reduce((acc, curr) => {
      const [name, value] = curr.split('=');
      acc[name] = value ? decodeURIComponent(value) : '';
      return acc;
    }, {} as Record<string, string>);
  };

  const setCookie = (value: string) => {
    document.cookie = `${POSITION}=${encodeURIComponent(value)}; path=/; max-age=${
      30 * 60
    }; secure; sameSite=strict`;
  };

  const handleGeolocationSuccess = (
    position: {
      coords: { latitude: number; longitude: number };
    },
    name?: string,
    cb?: () => void,
  ) => {
    const { latitude, longitude } = position.coords;
    const timestamp = new Date().getTime();

    const storedPosition: PositionStorage = {
      lat: latitude,
      lon: longitude,
      timestamp,
    };

    if (name) storedPosition.name = name;

    setCookie(JSON.stringify(storedPosition));
    cb?.();
    refresh();
  };

  const handleGeolocationError = () => {
    const storedPosition = JSON.stringify({
      lat: CENTER.lat,
      lon: CENTER.long,
      timestamp: new Date().getTime(),
    });

    setCookie(storedPosition);
    refresh();
  };

  const getLocation = () => {
    const cookieStore = getCookieStore();
    let storedPosition: PositionStorage | undefined;

    try {
      storedPosition = JSON.parse(cookieStore[POSITION] || '{}');
    } catch (error) {}

    if (!storedPosition)
      storedPosition = {
        lat: CENTER.lat,
        lon: CENTER.long,
        timestamp: new Date().getTime(),
      };

    return storedPosition;
  };

  const getDistance = (distance?: number, lat?: number, lon?: number) => {
    if (!distance) {
      const location = getLocation();
      if (location) distance = getUtilsDistance(location.lat, location.lon, lat, lon);
    }

    return calculateDistance(distance || 0);
  };

  const processLocation = () => {
    const cookieStore = getCookieStore();
    let storedPosition: PositionStorage | undefined;

    try {
      storedPosition = JSON.parse(cookieStore[POSITION] || '{}');
    } catch (error) {}

    const now = new Date().getTime();
    const timestamp = storedPosition?.timestamp;
    const thirtyMinutes = 30 * 60 * 1000;

    if (timestamp && now - timestamp < thirtyMinutes) {
      setCookie(JSON.stringify(storedPosition));
      setPosition(true);
    } else {
      try {
        navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError);
      } catch (error) {}
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const cookieStore = getCookieStore();
      let storedPosition: PositionStorage | undefined;

      try {
        storedPosition = JSON.parse(cookieStore[POSITION] || '{}');
      } catch (error) {}

      if (!storedPosition || !storedPosition.lat || !storedPosition.lon) {
        handleGeolocationError();
      }
    }, 4000);

    processLocation();
  }, []);

  const context = useMemo(
    () => ({
      handleSuccess: handleGeolocationSuccess,
      handleError: handleGeolocationError,
      getLocation,
      getDistance,
    }),
    [handleGeolocationSuccess, handleGeolocationError, getLocation, getDistance],
  );

  if (!position) return <Welcome className="w-full h-screen flex items-center justify-center" />;

  return <LocationContext value={context}>{children}</LocationContext>;
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }

  return context;
};

export default LocationProvider;
