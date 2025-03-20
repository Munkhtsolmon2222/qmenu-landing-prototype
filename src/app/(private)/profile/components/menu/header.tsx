import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Customer } from '@/lib/types';

type Props = {
  customer?: Customer;
};

export const MenuHeader: React.FC<Props> = ({ customer }) => {
  return (
    <div className="flex flex-col items-center gap-2 md:hidden">
      <Avatar className="h-20 w-20 text-white">
        <AvatarImage alt="AI Assistant" src="/placeholder-user.jpg" />
        <AvatarFallback className="text-3xl bg-current-3">
          {(customer?.firstName ?? 'Gu').slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium text-xl mt-1">{customer?.firstName}</span>
      <span className="opacity-50 text-lg">{customer?.phone}</span>
    </div>
  );
};
