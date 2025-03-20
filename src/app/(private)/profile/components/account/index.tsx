import { Customer } from '@/lib/types';
import { Info } from './info';
import { Info2 } from './info2';

interface Props {
  customer: Customer;
}

export const Account: React.FC<Props> = ({ customer }) => {
  return (
    <div className="px-4">
      <Info customer={customer} />
      <Info2 customer={customer} />
    </div>
  );
};
