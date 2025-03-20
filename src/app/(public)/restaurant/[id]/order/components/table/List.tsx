'use client';
import { Icons } from '@/components/general';
import { TabsContent } from '@/components/ui/tabs';
import { OrderType, SectionInfo, Table } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface ItemProps {
  onClickItem: (e: Table) => void;
  section: SectionInfo;
  tables: { guests: number; tableId: string }[];
  inputGuest: number;
  type: OrderType;
}

export const List: React.FC<ItemProps> = ({ inputGuest, section, tables, onClickItem }) => {
  const sectionTables = useMemo(() => {
    return (section.tables ?? []).filter((e) => {
      const f1 = e.min <= inputGuest;
      // const f2 = e.max >= inputGuest;
      const f3 = e.remained > 0;
      return f1 && f3;
    });
  }, [section]);

  return (
    <TabsContent
      key="1"
      value={section.id}
      className="relative overflow-y-auto w-full m-0 px-2 h-[calc(100vh_-_270px)]"
    >
      <div className="flex flex-col gap-2">
        {sectionTables.map((table, index) => {
          const active = tables.some((e) => e.tableId === table.id);
          const guests = tables.find((e) => e.tableId === table.id)?.guests ?? 0;
          return (
            <div
              onClick={() => onClickItem(table)}
              className={cn(
                'grid grid-cols-3 items-center border px-3 py-2.5 rounded-lg cursor-pointer border-border',
                active
                  ? 'border-[#51B370] bg-primary-foreground'
                  : table.guests > 0
                  ? `border-[#E24701] opacity-50`
                  : `border-gray-200`,
              )}
              key={index}
            >
              <div>{table.name}</div>
              <div className="text-nowrap whitespace-nowrap text-center font-medium text-[#51B370]">
                {guests > 0 && guests}
              </div>
              <div className="flex items-center gap-1 text-sm ml-auto">
                <div className="w-10 text-nowrap whitespace-nowrap text-center">
                  {table.min} - {table.max}
                </div>
                <Icons.user className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </TabsContent>
  );
};
