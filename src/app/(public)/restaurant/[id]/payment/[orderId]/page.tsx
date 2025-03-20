import { withSuspense } from '@/lib/helpers';
import { Loader } from '@/components/shared';
import { PaymentDialog } from '../components';
import { CustomApolloProvider, UpointProvider } from '@/lib/providers';
import { getPayload } from '@/actions';

interface Props {}

const Page: React.FC<Props> = async ({}) => {
  const payload = await getPayload();

  return (
    <CustomApolloProvider>
      <UpointProvider>
        <PaymentDialog payload={payload} />
      </UpointProvider>
    </CustomApolloProvider>
  );
};

export default withSuspense(Page, <Loader className="h-full" />);
