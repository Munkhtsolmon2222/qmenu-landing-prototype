'use client';
import { useRestaurantStore } from '@/lib/providers/restaurant';
import { IEvent, OrderInput, OrderType, SectionInfoTimes, Table } from '@/lib/types';
import { useState } from 'react';
import { StepInfo, StepDate, StepTable } from './components';
import { useParams, useSearchParams } from 'next/navigation';
import { PAGE_PAYMENT, PAGE_RESTAURANT } from '@/lib/constant';
import { Loader, OrderDialog } from '@/components/shared';
import { Button, Modal } from '@/components/general';
import { redirectWithNProgress } from '@/lib/utils';
import { showToast } from '@/lib/helpers';
import { useAction } from '@/lib/hooks';
import { CREATE_ORDER, GET_EVENT, GET_OPEN_TIMES, GET_SECTION_INFO } from '@/actions';

type Step = 'info' | 'table' | 'date';

export interface StepProps {
  step: Step;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  event?: IEvent;
}

const Event = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [visibleFinish, setVisibleFinish] = useState<boolean>(false);
  const { input } = useRestaurantStore();
  const [step, setStep] = useState<Step>('info');
  const [table, setTable] = useState<Table>();
  const [date, setDate] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [sectionId, setSectionId] = useState<string>();
  const [advance, setAdvance] = useState<boolean>(false);

  const { action: createOrder, loading: creating } = useAction(CREATE_ORDER, {
    lazy: true,
    onSuccess(data) {
      redirectWithNProgress(`${PAGE_RESTAURANT}/${id}/${PAGE_PAYMENT}/${data?.id}`);
    },
  });

  const { data: event, loading } = useAction(
    GET_EVENT,
    searchParams.get('eventId') ?? input?.event!,
  );

  const {
    action: getOpenTimes,
    data: { times = [] } = {},
    loading: loadOpenTimes,
  } = useAction(GET_OPEN_TIMES, {
    lazy: true,
  });

  const {
    action: getInfo,
    data: sections = [],
    loading: loadingInfo,
  } = useAction(GET_SECTION_INFO, {
    lazy: true,
    onSuccess: (getSectionInfo) => {
      if (!getSectionInfo) return;

      if (getSectionInfo.length > 0) {
        setSectionId(getSectionInfo[0].id);
        setStep('table');
        setTable(undefined);
      } else {
        showToast('Тухайн цагт захиалгатай байна');
      }
    },
  });

  const onFinish = () => {
    switch (step) {
      case 'info':
        setStep('date');
        break;
      case 'date':
        if ((event?.tables ?? []).length > 0)
          getInfo({
            deliveryDate,
            type: OrderType.Event,
            event: event?.id ?? '',
            guests: 1,
          });
        else if ((event?.advancePrice ?? 0) > 0) setVisibleFinish(true);
        else onSubmit();
        break;
      case 'table':
        if ((event?.advancePrice ?? 0) > 0) setVisibleFinish(true);
        else onSubmit();
    }
  };

  const onSubmit = (advance: boolean = false) => {
    const input: OrderInput = {
      type: OrderType.Event,
      deliveryDate: deliveryDate,
      items: [],
      event: event?.id,
      tableId: table?.id,
      sectionId,
      advance,
    };

    setAdvance(advance);
    // createOrder({ variables: { input, participant: id } });
  };

  const Steps: Record<Step, React.ReactElement> = {
    info: <StepInfo step={step} setStep={setStep} event={event} />,
    table: (
      <StepTable
        sectionId={sectionId}
        setSectionId={setSectionId}
        sections={sections}
        table={table}
        setTable={setTable}
        step={step}
        setStep={setStep}
        event={event}
        setDate={setDate}
        setDeliveryDate={setDeliveryDate}
      />
    ),
    date: (
      <StepDate
        times={times as SectionInfoTimes['times']}
        getOpenTimes={getOpenTimes}
        loading={loadOpenTimes}
        deliveryDate={deliveryDate}
        setDeliveryDate={setDeliveryDate}
        date={date}
        setDate={setDate}
        step={step}
        setStep={setStep}
        event={event}
      />
    ),
  };

  const Footers: Record<Step, React.ReactElement> = {
    info: (
      <OrderDialog.Footer onClick={onFinish}>
        <div className="text-center w-full">Захиалах</div>
      </OrderDialog.Footer>
    ),
    date: (
      <OrderDialog.Footer
        onClick={onFinish}
        buttonProps={{
          disabled: !deliveryDate,
          loading: loadingInfo || creating,
        }}
      >
        <div className="text-center w-full">
          {(event?.tables ?? []).length > 0 ? 'Үргэлжлүүлэх' : 'Захиалах'}
        </div>
      </OrderDialog.Footer>
    ),
    table: (
      <OrderDialog.Footer onClick={onFinish} buttonProps={{ disabled: !table, loading: creating }}>
        <div className="text-center w-full">Захиалах</div>
      </OrderDialog.Footer>
    ),
  };

  if (loading) return <Loader />;

  return (
    <>
      {Steps[step]}
      {Footers[step]}

      <Modal
        open={visibleFinish}
        onClose={() => setVisibleFinish(false)}
        className="w-[calc(100%_-_20px)]"
      >
        <Modal.Header className="p-5">Төлбөрийн төрөл сонгох</Modal.Header>
        <Modal.Content className="p-5 pt-0">
          <Button variant="outline" loading={advance && creating} onClick={() => onSubmit(true)}>
            Урьдчилгаа төлөх - {(event?.advancePrice ?? 0).toLocaleString()} ₮
          </Button>
          <Button
            className="bg-current-2 hover:bg-current-3"
            loading={!advance && creating}
            onClick={() => onSubmit()}
          >
            Бүтэн төлөх - {event?.price.toLocaleString()} ₮
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Event;
