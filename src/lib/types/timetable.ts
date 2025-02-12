export interface ITimetable {
  id?: number;
  name?: string;
  mon: boolean;
  monOpen: string;
  monClose: string;
  tue: boolean;
  tueOpen: string;
  tueClose: string;
  wed: boolean;
  wedOpen: string;
  wedClose: string;
  thu: boolean;
  thuOpen: string;
  thuClose: string;
  fri: boolean;
  friOpen: string;
  friClose: string;
  sat: boolean;
  satOpen: string;
  satClose: string;
  sun: boolean;
  sunOpen: string;
  sunClose: string;
}
