'use client';
import { useTranslation } from 'react-i18next';

interface Props extends React.PropsWithChildren {
  text?: string;
}

const I18Translate: React.FC<Props> = ({ text, children }) => {
  if (children && typeof children !== 'string')
    throw new Error('I18Translate only accepts string as children');

  const { t } = useTranslation();
  return t((children as string) ?? text ?? '');
};

export default I18Translate;
