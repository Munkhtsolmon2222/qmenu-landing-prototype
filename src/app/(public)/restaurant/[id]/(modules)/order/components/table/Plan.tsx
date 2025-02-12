import { TabsContent } from "@/components/ui/tabs";
import { Table, SectionInfo, OrderType } from "@/lib/types";
import TableShape from "./TableShape";

interface ItemProps {
  onClickItem: (e: Table) => void;
  section: SectionInfo;
  // tables: { guests: number; tableId: string }[];
  tables;
  inputGuest: number;
  type: OrderType;
  hideGuests?: boolean;
}

export const Plan: React.FC<ItemProps> = ({
  inputGuest,
  section,
  tables,
  onClickItem,
}) => {
  return (
    <TabsContent
      key="2"
      value={section.id}
      className="relative overflow-y-auto w-full bg-primary-foreground m-0 h-[calc(100vh_-_307px)]"
    >
      {(section.tables ?? []).map((table, index) => (
        <TableShape
          hideGuests
          key={index}
          inputGuest={inputGuest}
          selected={tables.some((e) => e.tableId === table.id)}
          guests={tables.find((e) => e.tableId === table.id)?.guests ?? 0}
          item={{
            ...table,
            guests:
              (tables.find((e) => e.tableId === table.id)?.guests ?? 0) +
              (table.guests ?? 0),
          }}
          onClick={() => onClickItem(table)}
        />
      ))}
    </TabsContent>
  );
};
