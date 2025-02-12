import { Branch, Menu, Table } from "./branch";
import { OrderType } from "./order";
import { Payment } from "./transaction";

export interface ISection {
  id: string;
  branch: Branch;
  menu?: Menu;
  menuId: string;
  tables: Table[];
  payments: Payment[];
  services?: OrderType[];
  changed: boolean;
}
