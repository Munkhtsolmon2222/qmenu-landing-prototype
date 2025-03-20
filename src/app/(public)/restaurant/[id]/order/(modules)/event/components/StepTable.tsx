import { StepProps } from '../page';
import { cn } from '@/lib/utils';
import { Info, ItemWrapper, List, Plan } from '../../../components';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderType, SectionInfo, Table } from '@/lib/types';
import { useState } from 'react';
import { OrderDialog } from '@/components/shared';
import { Icons } from '@/components/general';

interface Props extends StepProps {
  table: Table | undefined;
  setTable: React.Dispatch<React.SetStateAction<Table | undefined>>;
  sectionId: string | undefined;
  setSectionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  sections: SectionInfo[];
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDeliveryDate: React.Dispatch<React.SetStateAction<string>>;
}

export const StepTable: React.FC<Props> = ({
  setTable,
  table,
  setStep,
  sections,
  sectionId,
  setSectionId,
}) => {
  const [isList, setIsList] = useState<boolean>(true);

  const onClickItem = (e: Table) => setTable(e);

  return (
    <>
      <OrderDialog.Header children="Ширээ сонгох" onClick={() => setStep('date')} />
      <OrderDialog.Container className="p-0">
        <Tabs value={sectionId} className="h-full -mt-6 w-full">
          <div className="border-b w-full overflow-x-auto no-scrollbar bg-background px-3">
            <TabsList
              className="w-full bg-transparent justify-center h-16 rounded-none p-0"
              style={{ minWidth: 140 * sections.length }}
            >
              {sections.map((e, index) => {
                const active = sectionId === e.id;
                return (
                  <TabsTrigger
                    key={index}
                    onClick={() => setSectionId(e.id)}
                    value={e.id}
                    className="relative rounded-none border-b border-b-transparent text-base sm:text-lg bg-transparent w-full font-semibold text-muted-foreground transition-none focus-visible:ring-0 !shadow-none"
                  >
                    <p className={`${active ? 'text-current-2' : ''} font-medium`}>{e.name}</p>
                    {active && (
                      <div className="bg-current-2 rounded-t-md h-1.5 w-full absolute -bottom-[16px] sm:-bottom-[14px]" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <ItemWrapper
            className={cn(
              'flex py-3 rounded-none justify-end gap-2 px-2',
              !isList && 'border-b border-border',
            )}
          >
            <div
              className={cn(
                'flex items-center justify-between gap-2 bg-primary-foreground px-3 py-1 rounded-lg cursor-pointer border-border border',
                // isList ? "border-current-2" : ""
              )}
              onClick={() => setIsList(!isList)}
            >
              <Icons.list className={cn('w-5 h-5', isList ? 'text-current-2' : 'opacity-90')} />
            </div>
            <div
              className={cn(
                'flex items-center justify-between gap-2 bg-primary-foreground px-3 py-1 rounded-lg cursor-pointer border-border border',
              )}
              onClick={() => setIsList(!isList)}
            >
              <Icons.layoutPanelTop
                className={cn(
                  'w-5 h-5 fill-primary',
                  !isList ? 'fill-current-2 text-current-2' : 'opacity-70',
                )}
              />
            </div>
          </ItemWrapper>
          {!isList && (
            <ItemWrapper className="flex justify-between flex-nowrap p-3">
              {Object.entries(Info).map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-2">
                  <div className={cn('relative w-[24px] h-[24px] rounded-full', item[1].className)}>
                    <div
                      className={cn(
                        'z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[14px] w-[14px] rounded-full',
                        item[1].childClassName,
                      )}
                    />
                  </div>
                  <div>{item[1].name}</div>
                </div>
              ))}
            </ItemWrapper>
          )}
          {sections.map((section, index) =>
            isList ? (
              <List
                key={index}
                type={OrderType.Event}
                inputGuest={1}
                section={section}
                tables={table ? [{ tableId: table.id, guests: 1 }] : []}
                onClickItem={onClickItem}
              />
            ) : (
              <Plan
                key={index}
                type={OrderType.Event}
                inputGuest={1}
                section={section}
                tables={table ? [{ tableId: table.id, guests: 1 }] : []}
                onClickItem={onClickItem}
                hideGuests
              />
            ),
          )}
        </Tabs>
      </OrderDialog.Container>
    </>
  );
};
