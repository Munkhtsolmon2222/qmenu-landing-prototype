'use client';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from './button';

interface Props extends ButtonProps {}

export const ActionButton: React.FC<Props> = ({ type, loading, disabled, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type={type ?? 'submit'}
      loading={loading || pending}
      disabled={disabled || pending}
      {...props}
    />
  );
};
