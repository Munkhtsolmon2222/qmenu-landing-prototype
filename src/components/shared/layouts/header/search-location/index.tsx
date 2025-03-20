'use client';
import { LocationWrapper } from './LocationWrapper';
import { LocationContent } from './LocationContent';
import { POSITION } from '@/lib/constant';
import { PositionStorage } from '@/lib/providers';
import { useEffect, useState } from 'react';

interface Props {
  hideMobile?: boolean;
  redirecPath?: string;
}

export const SearchLocation: React.FC<Props> = ({ hideMobile, redirecPath }) => {
  const [defaultValue, setDefaultValue] = useState<string>();

  useEffect(() => {
    const cookieStore = document.cookie.split('; ').reduce((acc, curr) => {
      const [name, value] = curr.split('=');
      acc[name] = value ? decodeURIComponent(value) : '';
      return acc;
    }, {} as Record<string, string>);

    let storedPosition: PositionStorage | undefined;

    try {
      storedPosition = JSON.parse(cookieStore[POSITION] || '{}');
    } catch (error) {}

    const defaultValue = storedPosition?.name;

    setDefaultValue(defaultValue);
  }, []);

  return (
    <LocationWrapper value={defaultValue} hideMobile={hideMobile}>
      <LocationContent onChange={setDefaultValue} redirecPath={redirecPath} />
    </LocationWrapper>
  );
};
