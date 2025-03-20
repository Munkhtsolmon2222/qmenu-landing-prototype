'use client';
import { ActionButton } from './action-button';
import { Button } from './button';

interface Props extends React.ComponentProps<'form'> {
  buttonProps?: React.ComponentProps<typeof Button>;
}

export const FormButton: React.FC<Props> = ({
  children,
  buttonProps: { type, ...buttonProps } = {},
  ...props
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} {...props}>
      <ActionButton type={type ?? 'submit'} {...buttonProps} children={children} />
    </form>
  );
};
