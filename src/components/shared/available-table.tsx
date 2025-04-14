'use client';
import { EsChannel } from '@/lib/types';
import { useTranslation } from 'react-i18next';

interface Props {
  channel: EsChannel;
  services: boolean;
}

export const AvailableTable = (props: Props) => {
  const { channel } = props;
  const { t } = useTranslation();

  const getAvailable = () => {
    if (!channel?.tableInfo) return;
    const seated = channel.tableInfo.seated || 0;
    const available = channel.tableInfo.available || 0;

    if (seated === 0 && available === 0) return;
    return available;
  };

  return (
    <div className="rounded-sm text-xs text-white font-semibold  backdrop-brightness-50 px-1">
      {getAvailable() ? t('Available table') + ':' + getAvailable() : t('BranchOpen')}
    </div>
  );
};
