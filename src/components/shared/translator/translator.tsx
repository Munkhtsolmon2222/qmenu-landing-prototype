'use client';
import React, { createContext, useCallback } from 'react';
import TranslatorFactory from './helpers/translator-factory';
import { TranslationHandler, CacheProvider } from './types';

const defaultHandler: TranslationHandler = () => {};

export const TranslateContext: React.Context<TranslationHandler> = createContext(defaultHandler);
export const LanguageContext: React.Context<string> = createContext('en');

interface Props extends React.PropsWithChildren {
  to: string;
  from: string;
  cacheProvider?: CacheProvider;
  googleApiKey: string;
}

export default function Translator({ to, from, cacheProvider, children, googleApiKey }: Props) {
  const handleTranslationAsync: TranslationHandler = useCallback(
    async (value, setTranslation) => {
      const options = {
        to,
        from,
        apiKey: googleApiKey,
      };
      const translator = TranslatorFactory.create(options, cacheProvider);
      const translation = await translator.translate(value);

      if (translation) {
        setTranslation(translation);
      }
    },
    [to, from, googleApiKey, cacheProvider],
  );

  return (
    <TranslateContext.Provider value={handleTranslationAsync}>
      <LanguageContext.Provider value={to}>{children}</LanguageContext.Provider>
    </TranslateContext.Provider>
  );
}
