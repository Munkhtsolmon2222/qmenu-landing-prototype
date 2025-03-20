import { StepProps } from '../page';
import { ButtonItem, ItemWrapper } from '../../../components';
import { OrderType, SectionInfoTime, Table } from '@/lib/types';
import { getDates } from '../../../utils';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderDialog } from '@/components/shared';

interface Props extends StepProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  deliveryDate: string;
  setDeliveryDate: React.Dispatch<React.SetStateAction<string>>;
  table?: Table;
  loading: boolean;
  times: SectionInfoTime['times'];
  getOpenTimes: (options: any) => void;
}

export const StepDate: React.FC<Props> = ({
  date,
  event,
  setStep,
  setDate,
  deliveryDate,
  setDeliveryDate,
  getOpenTimes,
  loading,
  times,
}) => {
  const onChangeDate = (deliveryDate: string) => {
    setDate(deliveryDate);
    getOpenTimes({
      variables: {
        input: {
          event: event?.id,
          type: OrderType.Event,
          deliveryDate,
        },
      },
    });
  };

  const dates = getDates(event?.timetable);

  return (
    <>
      <OrderDialog.Header children="Өдөр сонгох" onClick={() => setStep('info')} />

      <OrderDialog.Container className="flex flex-col gap-2.5">
        <ItemWrapper title="Өдөр" titleClassName="mb-2">
          <div className="flex gap-2 overflow-x-scroll no-scrollbar">
            {dates.map((item, index) => (
              <ButtonItem
                className="min-w-24 text-sm rounded-full "
                active={item.date === date}
                key={index}
                desc={item.title}
                title={item.day}
                onClick={() => onChangeDate(item.date)}
              />
            ))}
          </div>
        </ItemWrapper>

        {date && (
          <ItemWrapper title="Эхлэх цаг" titleClassName="mb-1">
            {loading ? (
              <TimesSkeleton />
            ) : (
              <div className="grid gap-2 grid-cols-4">
                {times.map((e, index) => {
                  const eDate = +new Date(e.date);
                  const eDate2 = deliveryDate ? +new Date(deliveryDate) : 0;

                  let active = eDate === eDate2;

                  return (
                    <ButtonItem
                      key={index}
                      className="min-w-16 h-9 text-sm rounded-full"
                      active={active}
                      title={e.time}
                      onClick={() => setDeliveryDate(e.date)}
                    />
                  );
                })}
              </div>
            )}
          </ItemWrapper>
        )}
      </OrderDialog.Container>
    </>
  );
};

export const TimesSkeleton = () => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-1 no-scrollbar">
      {new Array(5).fill(null).map((_, i) => (
        <Skeleton key={i} className="h-9 min-w-20 w-20 rounded-full" />
      ))}
    </div>
  );
};
