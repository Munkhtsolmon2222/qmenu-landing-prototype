import { cn } from '@/lib/utils';
import { Icons } from './icons';

interface Props extends Omit<React.ComponentProps<'input'>, 'suffix' | 'prefix'> {
  suffix?: React.ReactElement | keyof typeof Icons;
  prefix?: React.ReactElement | keyof typeof Icons;
  inputClassName?: string;
}

const Input: React.FC<Props> = ({ className, ref, prefix, suffix, inputClassName, ...props }) => {
  const prefixName = typeof prefix === 'string' ? (prefix as keyof typeof Icons) : undefined;
  const PrefixIcon = prefixName ? Icons[prefixName] : undefined;
  const suffixName = typeof suffix === 'string' ? (suffix as keyof typeof Icons) : undefined;
  const SuffixIcon = suffixName ? Icons[suffixName] : undefined;

  return (
    <div
      className={cn(
        'flex h-9 items-center rounded-md border border-input pl-3 text-sm ring-offset-background overflow-hidden',
        className,
      )}
    >
      {PrefixIcon ? <PrefixIcon className="h-5 w-5" /> : prefix}
      <input
        ref={ref}
        className={cn(
          'w-full p-2 placeholder:text-muted-foreground bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          inputClassName,
        )}
        {...props}
      />
      {SuffixIcon ? <SuffixIcon className="h-5 w-5" /> : suffix}
    </div>
  );
};

Input.displayName = 'Input';
export { Input };
