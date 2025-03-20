import { Button, FormButton } from '@/components/general';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'form'> {
  containerClassName?: string;
  buttonProps?: React.ComponentProps<typeof Button>;
}

const Footer: React.FC<Props> = ({
  children,
  containerClassName,
  className,
  buttonProps,
  ...formProps
}) => {
  return (
    <div
      className={cn(
        'bg-background p-3 m-0 mt-auto rounded-t-2xl border border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]',
        containerClassName,
      )}
    >
      <FormButton
        {...formProps}
        className={cn(className)}
        buttonProps={{
          ...(buttonProps ?? {}),
          className: cn(
            'w-full flex py-6 justify-between items-center gap-2 text-white bg-current-2 rounded-3xl px-5 hover:bg-current-3',
            buttonProps?.className,
          ),
        }}
      >
        {children}
      </FormButton>
    </div>
  );
};

export default Footer;
