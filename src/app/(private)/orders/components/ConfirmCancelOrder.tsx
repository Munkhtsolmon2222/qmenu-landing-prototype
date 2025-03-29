'use client';
import { Button, ButtonProps, Input } from '@/components/general';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Label,
  Separator,
} from '@/components/ui';
import { Order } from '@/lib/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props extends ButtonProps {
  order: Order;
  description?: string;
  onCancel: (e?: string) => void;
  loading: boolean;
}

export const ConfirmCancelOrder: React.FC<Props> = ({
  order,
  description,
  onCancel,
  ...buttonProps
}) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState<string>('');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...buttonProps}>{t('Cancell')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('CancelOrderConfirm')}</AlertDialogTitle>
          <Separator className="mb-2" />
          <Label>{t('Reason')}</Label>
          <Input
            placeholder={t('Reason')}
            className="mt-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('Back')}</AlertDialogCancel>
          <AlertDialogAction onClick={() => onCancel(reason)}>{t('CancelOrder')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
